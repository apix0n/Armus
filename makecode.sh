#/bin/sh

echo "-- Armus Character HTML Code Maker --"
echo
echo "0 = Non | 1 = Oui"
read -p "Nom du personnage? " charactername
read -p "Remerciement? " isref

if [ "$isref" == "1" ]; then
    codename="<a class=ref href=#remerciements>$charactername</a>"
else
    codename="$charactername"
fi

printf "<tr>\n<td>$codename</td>\n<td><p><img src=\"https://raw.githubusercontent.com/Apix0n/Armus/susbranch/files/$charactername.jpeg\"></p></td>\n<td><a href=\"https://raw.githubusercontent.com/Apix0n/Armus/susbranch/files/$charactername.jpeg\"><span class=\"material-icons-round\">link</span></a></td>\n</tr>" > "temp-$charactername-$isref.txt"