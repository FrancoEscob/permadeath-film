#!/bin/bash
# usage: sheet.sh <video> <start_s> <end_s> <name> [fps] [cols] [rows] [tilew]
# Builds timestamped contact sheets into research/sheets/<name>_NN.jpg
V=$1; S=$2; E=$3; N=$4; FPS=${5:-1}; C=${6:-4}; R=${7:-3}; W=${8:-480}
OUT=/home/franescob/Gaming/research/sheets; mkdir -p $OUT
D=$(python3 -c "print($E-$S)")
ffmpeg -hide_banner -loglevel error -y -ss $S -t $D -i "$V" -vf "fps=$FPS,scale=$W:-2,drawtext=text='%{eif\:t+$S\:d}s':x=4:y=4:fontsize=20:fontcolor=yellow:box=1:boxcolor=black@0.7,tile=${C}x${R}:padding=2" -q:v 3 $OUT/${N}_%02d.jpg
ls $OUT/${N}_*.jpg
