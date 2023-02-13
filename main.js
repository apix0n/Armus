console.log('%cArmus', 'color: #ff0000; font-size: 55px')
console.log("Typing here may be dangerous: be careful and NEVER paste scripts from strangers.")

// https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

// Hides .lp-selector-mp when launched as a PWA.
var launchParameter = getQueryVariable('launch');
if (launchParameter == "pwa") {
    var lpSelector = document.getElementsByClassName("lp-selector-mp")[0];
    lpSelector.style.display = "none";
    console.log("Website was launched as a PWA.")
}

// Sets href in Create a character if user came from Turkish
var langParameter = getQueryVariable('lang');
if (langParameter == "tr") {
    var newLangUrl = "../tr/#character"
    document.getElementById("backbutton").href = newLangUrl;
    console.log("User came from Turkish webpage.")
}

// Rickroll functions
function rick() {
    var border = document.getElementsByClassName("rick")[0];
    border.style.display = "block";
    var video = document.getElementById("rickroll");
    video.currentTime = 0;
    video.play()
}

function closerick() {
    var border = document.getElementsByClassName("rick")[0];
    border.style.display = "none";
    var video = document.getElementById("rickroll");
    video.pause()
}