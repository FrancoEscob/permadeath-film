# Sums API usage from the Claude Code transcripts of this project (main session + every subagent).
import json, glob, os, datetime as dt
BASE = '/home/franescob/.claude/projects/-home-franescob-Gaming'
SID = 'f91af8b3-a220-4198-a64b-8763c3a08311'
P = dict(inp=4.0, w5=5.0, w1=8.0, rd=0.20, out=20.0)  # Opus 5.5, USD per MTok (standard speed)
PF = dict(inp=8.0, out=40.0)                           # fast mode, for flagging only
files = [('main', f'{BASE}/{SID}.jsonl')] + [(os.path.basename(f)[6:23], f) for f in sorted(glob.glob(f'{BASE}/{SID}/subagents/*.jsonl'))]
def ts(s): return dt.datetime.fromisoformat(s.replace('Z', '+00:00'))
rows, allts, tools = [], [], {}
for name, f in files:
    msgs, stamps, first, speeds, models = {}, [], None, set(), set()
    for line in open(f, encoding='utf-8', errors='ignore'):
        try: o = json.loads(line)
        except Exception: continue
        if o.get('timestamp'): stamps.append(ts(o['timestamp']))
        m = o.get('message') or {}
        if o.get('type') == 'user' and first is None and not o.get('isMeta'):
            c = m.get('content'); first = (c if isinstance(c, str) else json.dumps(c, ensure_ascii=False))[:80]
        if o.get('type') != 'assistant' or not m.get('usage'): continue
        if m.get('model') == '<synthetic>': continue
        for c in m.get('content') or []:
            if isinstance(c, dict) and c.get('type') == 'tool_use': tools[c['name']] = tools.get(c['name'], 0) + 1
        u = m['usage']; key = m.get('id') or o.get('requestId') or o.get('uuid')
        cc = u.get('cache_creation') or {}
        rec = dict(inp=u.get('input_tokens', 0) or 0, out=u.get('output_tokens', 0) or 0, rd=u.get('cache_read_input_tokens', 0) or 0,
                   cw=u.get('cache_creation_input_tokens', 0) or 0, w5=cc.get('ephemeral_5m_input_tokens'), w1=cc.get('ephemeral_1h_input_tokens'),
                   speed=u.get('speed') or 'standard', model=m.get('model'))
        if rec['w5'] is None and rec['w1'] is None: rec['w5'], rec['w1'] = rec['cw'], 0  # unknown split -> price as 5m (lower bound)
        prev = msgs.get(key)
        if prev is None or rec['out'] >= prev['out']: msgs[key] = rec  # same response logged once per content block
        speeds.add(rec['speed']); models.add(rec['model'])
    t = {k: sum((r[k] or 0) for r in msgs.values()) for k in ('inp', 'out', 'rd', 'cw', 'w5', 'w1')}
    fast = [r for r in msgs.values() if r['speed'] == 'fast']
    usd = (t['inp'] * P['inp'] + t['w5'] * P['w5'] + t['w1'] * P['w1'] + t['rd'] * P['rd'] + t['out'] * P['out']) / 1e6
    rows.append(dict(name=name, calls=len(msgs), **t, usd=usd, start=min(stamps), end=max(stamps), first=first, speeds=speeds, models=models, fast=len(fast)))
    allts += stamps
tot = {k: sum(r[k] for r in rows) for k in ('calls', 'inp', 'out', 'rd', 'cw', 'w5', 'w1', 'usd')}
# activity: merge every event from every transcript; gaps > 10 min count as idle
allts.sort(); active = dt.timedelta(); gaps = []
for a, b in zip(allts, allts[1:]):
    d = b - a
    if d <= dt.timedelta(minutes=10): active += d
    else: gaps.append((a, b, d))
json.dump(dict(rows=[{**r, 'start': r['start'].isoformat(), 'end': r['end'].isoformat(), 'speeds': sorted(r['speeds']), 'models': sorted(map(str, r['models']))} for r in rows],
               total=tot, span=[allts[0].isoformat(), allts[-1].isoformat()], active_s=active.total_seconds(),
               gaps=[(a.isoformat(), b.isoformat(), d.total_seconds()) for a, b, d in gaps], tools=tools, price=P),
          open('/home/franescob/Gaming/costs/usage.json', 'w'), indent=1, ensure_ascii=False)
f = lambda n: f'{n:,.0f}'.replace(',', '.')
print(f"{'agente':18} {'calls':>5} {'input':>9} {'cache_w5m':>11} {'cache_w1h':>11} {'cache_read':>13} {'output':>9} {'USD':>9}  speed")
for r in rows: print(f"{r['name']:18} {r['calls']:5} {f(r['inp']):>9} {f(r['w5']):>11} {f(r['w1']):>11} {f(r['rd']):>13} {f(r['out']):>9} {r['usd']:9.2f}  {sorted(r['speeds'])} fast={r['fast']}")
print('TOTAL', tot['calls'], {k: f(v) for k, v in tot.items() if k not in ('usd', 'calls')}, 'USD %.2f' % tot['usd'])
print('span', allts[0], '->', allts[-1], '=', allts[-1] - allts[0]); print('active (gaps<=10min)', active)
for a, b, d in gaps: print('  idle gap', a, '->', b, d)
print('tools', tools)
