#!/bin/sh

# Made by Apix | @apix0n
# https://github.com/apix0n/Armus

# Needs ImageMagick
# ./other/checksize.sh

output=$(for i in pics/*.jpeg ; do identify -ping -format '%h %w' $i; echo " - $i"; done | grep -v "1101 689")
if [ -z "$output" ]; then 
  echo "👍 Every image is the right size!" 
else 
  echo "The following images are not the right size:"
  echo "$output"
fi
