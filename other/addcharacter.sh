#!/bin/sh

# Made by Apix | @apix0n
# https://github.com/apix0n/Armus

# Only runs on POSIX-compliant shells [bash, dash, ksh, zsh, csh, ...].
# Running `dos2unix` on this file may be useful if it doesn't run.
# The image of the character must already be in the pics/ for the script to work correctly.
# Can be ran with ./other/addcharacter.sh or ./other/addcharacter.sh [characterName] 0/1 [artistId]
# ./other/addcharacter.sh abigus 0 or ./other/addcharacter.sh wizardus 1 XNinja

echo "-- Armus Character Code Maker --"
echo ""

# Asks for character name
if [ -n "$1" ]; then
    charactername="$1"
else
    read -p "What is the name of the character? " charactername
fi

# Asks for Golden name 
if [ -n "$2" ]; then
    isref="$2"
else
    read -p "Does its name have to be golden? [0/1] " isref
fi

# If the name is Golden, asks for Artist ID
if [ "$isref" -eq 1 ]; then
if [ -n "$3" ]; then
        an="$3"
    else
        read -p "What is the ID of the artist in the acknowledgements? [AN-...] " an
    fi
fi

# Creates character-based html
if [ "$isref" -eq 1 ]; then
    codename="<a class=\"ref\" href=\"#AN-$an\">$charactername</a>"
    refname="\n\n<code>$charactername</code>"
else
    codename="$charactername"
fi

# Creates temp if it doesn't exist already
mkdir -p temp

# Names code
dirname="pics"
filename="$charactername.jpeg"
# Gets the list of files in the directory, sorted
files=$(ls -1 "$dirname" | sort)

# Gets the index of the file we're looking for
index=-1
counter=0
for file in $files; do
    if [ "$file" = "$filename" ]; then
        index=$counter
    fi
    counter=$((counter + 1))
done

# Gets the files before and after the target file
prev=$(echo "$files" | awk "NR == $index")
next=$(echo "$files" | awk "NR == $(($index + 2))")

# Removes the .jpeg at the end
prev=$(echo "$prev" | sed 's/.jpeg//')
filename=$(echo "$filename" | sed 's/.jpeg//')
next=$(echo "$next" | sed 's/.jpeg//')

# Outputs the character-based html and characters names to temp/$charactername-$isref.txt
echo "<tr>" > "temp/$charactername-$isref.txt"
echo "<td>$codename</td>" >> "temp/$charactername-$isref.txt"
echo "<td><p><img src=\"../pics/$charactername.jpeg\"></p></td>" >> "temp/$charactername-$isref.txt"
echo "<td><a href=\"../pics/$charactername.jpeg\"><span class=\"material-icons-round\">link</span></a></td>" >> "temp/$charactername-$isref.txt"
echo "</tr>" >> "temp/$charactername-$isref.txt"
echo "$refname" >> temp/$charactername-$isref.txt
echo "$prev | $filename | $next" >> temp/$charactername-$isref.txt

# EOF
echo ""
echo "HTML code exported to temp/$charactername-$isref.txt"
echo "There are actually $(ls pics | wc -l) characters in the /pics folder."
echo "$prev | \e[31m$filename $(tput sgr 0)| $next"