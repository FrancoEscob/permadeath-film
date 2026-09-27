import re,sys
def conv(path):
    txt=open(path,encoding='utf-8').read()
    blocks=txt.split('\n\n')
    out=[];last=''
    seen=set()
    for b in blocks:
        m=re.search(r'(\d\d):(\d\d):(\d\d)\.\d+ -->',b)
        if not m: continue
        t=int(m.group(1))*3600+int(m.group(2))*60+int(m.group(3))
        lines=b.split('\n')[1:]
        for l in lines:
            if '-->' in l: continue
            l=re.sub(r'<[^>]+>','',l).strip()
            if not l or l in seen: continue
            seen.add(l)
            out.append((t,l))
    # merge into ~15s chunks
    res=[];cur=None;buf=[]
    for t,l in out:
        if cur is None: cur=t
        if t-cur>=15 and buf:
            res.append('[%d:%02d:%02d] %s'%(cur//3600,(cur%3600)//60,cur%60,' '.join(buf)));buf=[];cur=t
        buf.append(l)
    if buf: res.append('[%d:%02d:%02d] %s'%(cur//3600,(cur%3600)//60,cur%60,' '.join(buf)))
    return '\n'.join(res)
for p in sys.argv[1:]:
    o=p.replace('.es.vtt','.txt').replace('.es-orig.vtt','.orig.txt')
    open(o,'w').write(conv(p))
    print(o)
