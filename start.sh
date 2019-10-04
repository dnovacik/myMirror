#!/bin/sh
if [ -z "$DISPLAY" ]; then
	export DISPLAY=:0
fi
electron dist/electron/main.js $1