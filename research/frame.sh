#!/bin/bash
# usage: frame.sh <video> <time_s(float ok)> <outname>  -> saves research/frames/<outname>.jpg at native res
ffmpeg -hide_banner -loglevel error -y -ss $2 -i "$1" -frames:v 1 -q:v 2 /home/franescob/Gaming/research/frames/$3.jpg && echo saved frames/$3.jpg
