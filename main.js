console.log('%cArmus', 'color: #ff0000; font-size: 55px')
console.log("Typing here may be dangerous: be careful and NEVER paste scripts from strangers.")

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
}

// Cookie 
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName)) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

// Rickroll functions
function rick() {
    var border = document.getElementsByClassName("rick")[0];
    border.style.display = "block";
    var video = document.getElementById("rickroll");
    video.currentTime = 0;
    video.play();
}

function closerick() {
    var border = document.getElementsByClassName("rick")[0];
    border.style.display = "none";
    var video = document.getElementById("rickroll");
    video.pause();
}

// Function to support invite sharing
async function shareInvite() {
    var inviterNameElement = document.getElementById("invitername-input");
    var inviterName = inviterNameElement.value;
    var inviteLink = document.URL + "invite.html?inviter=" + inviterName
    const shareData = { title: "You got invited to join Armus!", text: "Join Armus!", url: inviteLink, };
    try {
        await navigator.share(shareData);
    } catch (err) {
        console.log("Can't use the Web Share API. Fallback to clipboard.");
        await navigator.clipboard.writeText(inviteLink);
        alert("Copied to clipboard!")
    }
}

// Function to support invite sharing (only english version)
async function shareInviteEnglish() {
    var inviterNameElement = document.getElementById("invitername-input");
    var inviterName = inviterNameElement.value;
    var currentUrl = window.location.href;
    var inviteLink = currentUrl.split('/').slice(0, 3).join('/') + "/en/invite.html?inviter=" + inviterName;
    const shareData = { title: "You got invited to join Armus!", text: "Join Armus!", url: inviteLink };
    try {
        await navigator.share(shareData);
    } catch (err) {
        console.log("Can't use the Web Share API. Fallback to clipboard.");
        await navigator.clipboard.writeText(inviteLink);
        alert("Copied to clipboard!")
    }
}

// Changes inviter name on invite.html
function changeInviterName() {
    var inviterParameter = getQueryVariable('inviter');
    var inviterText = document.getElementsByClassName("inviter-name")[0];
    if (inviterParameter == undefined) {
        console.log("No custom inviter name... skipping");
    }
    else {
        console.log("Changing inviter name...");
        inviterText.innerText = decodeURI(inviterParameter);
    }
}

// json
function addAllCharacters() {
    var cardsContainer = document.getElementById("cardscontainer");
    if (cardsContainer == null) {
        return 0
    }
    var requestURL = "../db.json";
    var request = new XMLHttpRequest();

    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    request.onload = function () {
        var jsonDB = request.response;
        showCharacters(jsonDB);
        changeNumbers(jsonDB);
        createArtistListFromCharacters(jsonDB)
        cardTypeButtons()
    };

    function findArtistName(artistId, artists) {
        for (var i = 0; i < artists.length; i++) {
            if (artists[i].id === artistId) {
                var artist = artists[i];
                var prettyName = artist.prettyname;
                var rankEmoji = '';

                if (artist.id !== "Apix" && artist.rank >= 1) {
                    if (artist.rank === 1) {
                        rankEmoji = '👑';
                    } else if (artist.rank === 2) {
                        rankEmoji = '💎';
                    } else if (artist.rank === 3) {
                        rankEmoji = '🌹';
                    } else if (artist.rank === 4) {
                        rankEmoji = '🍀';
                    }
                }

                if (rankEmoji !== '') {
                    return prettyName + ' ' + rankEmoji;
                } else {
                    return prettyName;
                }
            }
        }
        return "Unknown Artist";
    }

    function findArtistRank(artistId, artists) {
        for (var i = 0; i < artists.length; i++) {
            if (artists[i].id === artistId) {
                return artists[i].rank;
            }
        }
        return 0;
    }

    function showCharacters(jsonObj) {
        var characters = jsonObj["characters"];
        var artists = jsonObj["artists"];

        for (var i = 0; i < characters.length; i++) {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");

            if (characters[i].onclick) {
                cardDiv.setAttribute("onclick", characters[i].onclick);
            }

            const img = document.createElement("img");
            img.src = characters[i].image;
            cardDiv.appendChild(img);

            const textDiv = document.createElement("div");
            textDiv.classList.add("text");

            const nameDiv = document.createElement("div");
            nameDiv.classList.add("cardcharactername");
            nameDiv.textContent = characters[i].name;

            const artistDiv = document.createElement("div");
            const artistRank = findArtistRank(characters[i].artist, artists);
            if (artistRank > 0) {
                artistDiv.classList.add(`rank${artistRank}`);
            }
            artistDiv.classList.add("cardartist");
            const artistName = findArtistName(characters[i].artist, artists);
            artistDiv.innerHTML = artistName;

            textDiv.appendChild(nameDiv);
            textDiv.appendChild(artistDiv);
            cardDiv.appendChild(textDiv);

            const clickHandler = (character) => {
                return function () {
                    if (character.name != "rickus") {
                        updateOverlayContent(character, artists);
                        openOverlay();
                    }
                };
            };
            cardDiv.addEventListener("click", clickHandler(characters[i]));

            cardsContainer.appendChild(cardDiv);
        }
    }

    function updateOverlayContent(character, artists) {
        var overlayImage = document.getElementById("OC-Image");
        overlayImage.src = character.image;

        var overlayOpenLink = document.getElementById("OC-OpenLink");
        overlayOpenLink.href = character.image;

        var overlayName = document.getElementById("OCI-Name");
        overlayName.textContent = character.name;

        var overlayDate = document.getElementById("OCI-Date");
        overlayDate.textContent = character.date || "Unknown Date";

        var overlayArtist = document.getElementById("OCI-Artist");
        overlayArtist.innerHTML = findArtistName(character.artist, artists);

        var overlay = document.getElementById("overlay")
        const artistRank = findArtistRank(character.artist, artists);
        if (artistRank > 0) {
            overlay.className = `rank${artistRank}`;
        } else {
            overlay.className = '';
        }
    }

    function openOverlay() {
        var overlay = document.getElementById("overlay");
        overlay.style.display = "flex";
    }

    function changeNumbers(jsonObj) {
        let goal = jsonObj["goal"];
        let total = Object.keys(jsonObj["characters"]).length;
        let start = jsonObj["start"];
        let percentage = (total - start) * 100 / (goal - start)
        var progressBar = document.getElementsByClassName("progressbar-inside")[0]
        progressBar.style = "width: " + percentage + "%";
        progressBar.innerText = percentage + "%";
        var membersTotal = document.getElementById("memberstotal");
        membersTotal.innerText = total;
        var membersGoal = document.getElementById("membersgoal");
        membersGoal.innerText = goal;
    }

    function createArtistListFromCharacters(jsonObj) {
        var artists = jsonObj["artists"];
        var characters = jsonObj["characters"];
        var remerciementsElement = document.getElementsByClassName("remerciements")[0];
        var numberOfArtists = document.getElementById("numberofartists");

        for (var i = 0; i < artists.length; i++) {
            var artist = artists[i];
            var artistCharacters = characters.filter(character => character.artist === artist.id);
            var artistName = findArtistName(artist.id, artists);
            var artistRankClass = artist.rank > 0 ? ` class="rank${artist.rank}"` : '';
            var artistNameRanked = `<b${artistRankClass}>${artistName}</b>`;

            var liElement = document.createElement("li");

            var characterList = artistCharacters.map(character => {
                var characterText = character.name;
                if (character['ghi-addcharacter']) {
                    characterText += ` <a href="https://github.com/apix0n/Armus/issues/${character['ghi-addcharacter']}" target="_blank">#${character['ghi-addcharacter']}</a>`;
                } else if (character['ghi-idea']) {
                    characterText += ` <a href="https://github.com/apix0n/Armus/issues/${character['ghi-idea']}" target="_blank" class="idea-gh-label">#${character['ghi-idea']}</a>`;
                }
                return `<code>${characterText}</code>`;
            }).join(', ');

            liElement.innerHTML = `${artistNameRanked} : <b>${artistCharacters.length}</b> (${characterList})`;

            remerciementsElement.appendChild(liElement);
        }
        numberOfArtists.innerText = artists.length;
    }
}

function closeOverlay() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
}

function cardTypeButtons() {
    const cardTypeGrid = document.getElementById("cardtypegrid");
    const cardTypeVertical = document.getElementById("cardtypevertical");
    const cardsContainer = document.getElementById("cardscontainer");

    cardTypeGrid.addEventListener("click", () => {
        cardTypeGrid.classList.add("cardtypeactive");
        cardTypeVertical.classList.remove("cardtypeactive");
        cardsContainer.classList.remove("cardslong");
        setCookie("cardType", "grid", 30); // Store the selected card type in a cookie
    });

    cardTypeVertical.addEventListener("click", () => {
        cardTypeVertical.classList.add("cardtypeactive");
        cardTypeGrid.classList.remove("cardtypeactive");
        cardsContainer.classList.add("cardslong");
        setCookie("cardType", "vertical", 30); // Store the selected card type in a cookie
    });

    // Check for a stored preference and apply it when the page loads
    const storedCardType = getCookie("cardType");
    if (storedCardType === "grid") {
        cardTypeGrid.click();
    } else if (storedCardType === "vertical") {
        cardTypeVertical.click();
    }
}