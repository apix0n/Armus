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