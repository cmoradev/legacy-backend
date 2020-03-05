#!/bin/bash
folder="dist"
outputFolder="../external-projects"
outputs="colegio-api-core rancho refaccionaria-chan"
for val in $outputs; do

if [ -d "$outputFolder" ]; then
  ### Take action if $DIR exists ###
  echo "folder exist ${outputFolder} continue..."
else
  ###  Control will jump here if $DIR does NOT exists ###
  echo "folder ${outputFolder} not found"
  echo "creating ${outputFolder}"
  mkdir ${outputFolder}
fi

if [ -d "${outputFolder}/${val}" ]; then
  ### Take action if $DIR exists ###
  echo "exist folder for deploy ${outputFolder}/${val}..."
else
  ###  Control will jump here if $DIR does NOT exists ###
  echo "folder ${outputFolder}/${val}"
  echo "creating ${outputFolder}/${val}"
  mkdir "${outputFolder}/${val}"
fi    
   echo "cp -r ${folder}  ${outputFolder}/${val}"
   cp -r ${folder} "${outputFolder}/${val}"
done


