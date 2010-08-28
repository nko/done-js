#!/bin/sh
git pull origin master &&
vows &&
git add * &&
git commit -am 'autocommit' &&
git push origin master &&
git push joyent master


