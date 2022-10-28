#/bin/sh

# This script was made by Apix.
# You can only run this script on systems with Sh.
# You can run it in the terminal with ./makecode.sh or ./makecode.sh [charactername] 0/1
# Examples: ./makecode.sh abigus 0 or ./makecode.sh wizardus 1

echo "-- Armus Character HTML Code Maker --"
echo

if [ -n "$1" ]; then
    charactername="$1"
else
    read -p "What is the name of the character? " charactername
fi

if [ -n "$2" ]; then
    isref="$2"
else
    echo "0 = No | 1 = Yes"
    read -p "Does its name have to be golden? " isref
fi

if [ "$isref" == "1" ]; then
    codename="<a class=ref href=#remerciements>$charactername</a>"
    refname="\n\n<code>$charactername</code>"
else
    codename="$charactername"
fi

mkdir -p temp

printf "<tr>\n<td>$codename</td>\n<td><p><img src=\"../files/$charactername.jpeg\"></p></td>\n<td><a href=\"../files/$charactername.jpeg\"><span class=\"material-icons-round\">link</span></a></td>\n</tr>" > "temp/$charactername-$isref.txt"
printf "$refname" >> temp/$charactername-$isref.txt

echo Exported to temp/$charactername-$isref.txt