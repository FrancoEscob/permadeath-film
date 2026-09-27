import re,sys
# Convert YouTube auto-sub VTT into deduplicated "[mm:ss] text" lines
src=open(sys.argv[1],encoding='utf-8').read()
blocks=src.split('\n\n')
out=[];last=''
for b in blocks:
    m=re.search(r'(\d\d):(\d\d):(\d\d)\.\d+ -->',b)
    if not m: continue
    t=int(m.group(1))*3600+int(m.group(2))*60+int(m.group(3))
    lines=[re.sub(r'<[^>]+>','',l).strip() for l in b.split('\n')[1:]]
    lines=[l for l in lines if l and '-->' not in l]
    if not lines: continue
    txt=lines[-1]
    if txt==last: continue
    last=txt
    out.append(f"[{t//60:02d}:{t%60:02d}] {txt}")
print('\n'.join(out))
