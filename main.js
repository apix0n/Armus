console.log('%cArmus', 'color: #ff0000; font-size: 55px')
console.log("Typing here may be dangerous, so be careful and DON'T paste scripts from strangers on the internet.")

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log("Twemoji: Device is a mobile, ignoring loading.");
}
else {
    window.onload = function () {
        console.log("Twemoji: Device is not a mobile, loading emojis.");
        twemoji.parse(document.body,
            { folder: 'svg', ext: '.svg' }
        );
    }
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