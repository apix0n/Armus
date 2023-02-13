#/bin/sh

# Made by Apix
# https://github.com/Apix0n/Armus

# Only runs on systems with Sh. `printf` must be installed.
# Running `dos2unix` on this file may be useful if it doesn't run.
# Can be ran with ./makecode.sh or ./makecode.sh [characterName] 0/1 [artistId]
# ./makecode.sh abigus 0 or ./makecode.sh wizardus 1 AN-XNinja

echo "-- Armus Character Code Maker --"
echo ""

if [ -n "$1" ]; then
    charactername="$1"
else
    read -p "What is the name of the character? " charactername
fi

if [ -n "$2" ]; then
    isref="$2"
else
    read -p "Does its name have to be golden? [0/1] " isref
fi

if [ "$isref" == "1" ]; then
if [ -n "$3" ]; then
        an="$3"
    else
        read -p "What is the ID of the artist in the acknowledgements? [AN-...] " an
    fi
fi

if [ "$isref" == "1" ]; then
    codename="<a class=\"ref\" href=\"#$an\">$charactername</a>"
    refname="\n\n<code>$charactername</code>"
else
    codename="$charactername"
fi

mkdir -p temp

printf "<tr>\n<td>$codename</td>\n<td><p><img src=\"../pics/$charactername.jpeg\"></p></td>\n<td><a href=\"../pics/$charactername.jpeg\"><span class=\"material-icons-round\">link</span></a></td>\n</tr>" > "temp/$charactername-$isref.txt"
printf "$refname" >> temp/$charactername-$isref.txt

echo "Exported to temp/$charactername-$isref.txt"
echo "There are actually $(ls pics | wc -l) characters in the /pics folder."
