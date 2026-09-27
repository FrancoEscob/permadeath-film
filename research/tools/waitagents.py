import json,sys,time,os
d='/home/franescob/.claude/projects/-home-franescob-Gaming/f91af8b3-a220-4198-a64b-8763c3a08311/subagents/'
ids=sys.argv[1:]
done=set()
while len(done)<len(ids):
    for i in ids:
        if i in done: continue
        p=d+'agent-'+i+'.jsonl'
        try:
            last=open(p).read().rstrip('\n').split('\n')[-1]
            j=json.loads(last)
            m=j.get('message',{})
            if j.get('type')=='assistant' and m.get('stop_reason')=='end_turn':
                done.add(i); print('DONE',i,flush=True)
        except Exception as e:
            pass
    time.sleep(15)
