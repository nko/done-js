#!/bin/sh
git pull origin master &&
vows &&
git add * &&
git commit -a &&
git push origin master &&
git push joyent master


