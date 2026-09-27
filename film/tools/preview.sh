#!/bin/bash
# preview.sh <scene-id-prefix> <t1,t2,...> [out.jpg]
#   renders that scene alone at those LOCAL times (seconds) and builds a labelled contact sheet.
#   Safe to run concurrently (each call uses its own temp dir).
ID=$1; TS=$2; OUT=${3:-/tmp/verify/prev_$1.jpg}
mkdir -p /tmp/verify
D=$(mktemp -d /tmp/prev_XXXXXX)
cd /home/franescob/Gaming/film
FR=$(python3 -c "print(','.join(str(round(float(t)*30)) for t in '$TS'.split(',')))")
node render.mjs --only "$ID" --stills "$FR" --dir "$D" 2>&1 | grep -iE "pageerror|TypeError|ReferenceError|SyntaxError" | head -5
python3 - "$D" "$OUT" "$TS" <<'PY'
import sys, subprocess, glob, os
d, out, ts = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
files = sorted(glob.glob(d + '/f_*.png'))
if not files: print('NO FRAMES RENDERED'); sys.exit(1)
cols = 3 if len(files) > 4 else 2
args, filt, ins, lay = [], '', '', []
for i, f in enumerate(files):
    args += ['-i', f]
    filt += f"[{i}]scale=640:360,drawtext=text='t={ts[i] if i < len(ts) else ''}':x=8:y=338:fontcolor=yellow:fontsize=18:box=1:boxcolor=black[s{i}];"
    ins += f'[s{i}]'; lay.append(f'{(i % cols) * 640}_{(i // cols) * 360}')
filt += f'{ins}xstack=inputs={len(files)}:layout={"|".join(lay)}:fill=black'
subprocess.run(['ffmpeg', '-v', 'error', '-y', *args, '-filter_complex', filt, out], check=True)
PY
rm -rf "$D"
echo "$OUT"
