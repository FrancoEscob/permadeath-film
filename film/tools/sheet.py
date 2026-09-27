#!/usr/bin/env python3
# usage: sheet.py out.jpg frame1 frame2 ...   (frames from out/stills/f_XXXXXX.png)
import sys, subprocess
out, frames = sys.argv[1], sys.argv[2:]
cols = 3 if len(frames) > 4 else 2
args, filt, ins, lay = [], '', '', []
for i, f in enumerate(frames):
    args += ['-i', f'/home/franescob/Gaming/out/stills/f_{int(f):06d}.png']
    filt += f'[{i}]scale=640:360[s{i}];'
    ins += f'[s{i}]'
    lay.append(f'{(i % cols) * 640}_{(i // cols) * 360}')
filt += f'{ins}xstack=inputs={len(frames)}:layout={"|".join(lay)}:fill=black'
subprocess.run(['ffmpeg', '-v', 'error', '-y', *args, '-filter_complex', filt, out], check=True)
