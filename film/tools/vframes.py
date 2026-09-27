#!/usr/bin/env python3
# vframes.py out.jpg video label:t label:t ...  -> labelled 3-column contact sheet of source frames
import sys, subprocess, os
out, video, items = sys.argv[1], sys.argv[2], sys.argv[3:]
files = []
for i, it in enumerate(items):
    label, t = it.rsplit(':', 1)
    f = f'/tmp/verify/_vf_{i}.jpg'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', t, '-i', video, '-frames:v', '1', '-vf',
                    f"scale=480:270,drawtext=text='{label} {t}':x=5:y=5:fontcolor=yellow:fontsize=16:box=1:boxcolor=black", f], check=True)
    files.append(f)
args, ins, lay = [], '', []
for i, f in enumerate(files):
    args += ['-i', f]; ins += f'[{i}]'; lay.append(f'{(i % 3) * 480}_{(i // 3) * 270}')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *args, '-filter_complex', f'{ins}xstack=inputs={len(files)}:layout={"|".join(lay)}:fill=black', out], check=True)
print(out)
