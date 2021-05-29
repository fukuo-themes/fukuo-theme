const play = document.querySelectorAll(".btn-play");
const posts = document.querySelectorAll(".posts .posts__audio");
let durs = document.querySelectorAll(".posts__audio--duration span");
let music = document.querySelectorAll("audio");
let seek = document.querySelectorAll("#progress");

posts.forEach(function (post, idx) {
    const getAudio = post.querySelector("iframe.tumblr_audio_player").getAttribute("src");
    // https://loonatheme.tumblr.com/post/182706474891/audio_player_iframe/loonatheme/tumblr_p9k2dmRyN01rgvwoc?audio_file=https%3A%2F%2Fa.tumblr.com%2Ftumblr_p9k2dmRyN01rgvwoco1.mp3&color=white&simple=1

    // split: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split

    const src = getAudio.split("audio_file=")[1].split("&")[0];
    /* 0: "https://loonatheme.tumblr.com/post/182706474891/audio_player_iframe/loonatheme/tumblr_p9k2dmRyN01rgvwoc?"
          1: "https%3A%2F%2Fa.tumblr.com%2Ftumblr_p9k2dmRyN01rgvwoco1.mp3&color=white&simple=1" */

    /* >> 0: "https%3A%2F%2Fa.tumblr.com%2Ftumblr_p9k2dmRyN01rgvwoco1.mp3"
             1: "color=white"
             2: "simple=1" */

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
    const getSource = decodeURIComponent(src);
    // console.log(getSource);

    // create element for <audio> and <source>
    // based on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#Usage_notes
    let audio = document.createElement("audio");
    let source = document.createElement("source");
    source.src = getSource;
    source.type = "audio/mp3";
    audio.appendChild(source);

    post.prepend(audio);
    // console.log(audio);

    // remove the iframe from Tumblr
    post.querySelector(".audio_player").remove();

});


durs.forEach(function (dur, idx) {
    let d = document.querySelectorAll("audio")[idx];

    // console.log(d);
    // console.log(d.childNodes[0].src);
    dur.nextElementSibling.href = d.childNodes[0].src;

    d.onloadedmetadata = function () {
        // console.log("Loaded metadata for duration=%s",
        //     durations(d.duration));
        dur.innerHTML = durations(d.duration);
    };
});

seek.forEach(function (seeks, idx) {
    let s = document.querySelectorAll("audio")[idx];
    let p = document.querySelectorAll(".btn-play")[idx];

    s.ontimeupdate = function () {
        seeks.value = (s.currentTime / s.duration) * 100;
    }

    seeks.onchange = function () {
        // console.log(this.value);
        // console.log(s.duration);
        //     CHANGED
        s.currentTime = this.value / 100 * s.duration;
    }

    s.onended = function () {
        p.innerHTML = `<i class="las la-play"></i>`;
        seeks.value = 0;
    }

});

play.forEach(function (btn, index) {
    btn.addEventListener("click", function (e) {
        // console.log(this.parentElement);
        const a = this.parentElement.parentElement.querySelectorAll("audio")[0];
        // console.log(a);


        if (a.paused) {
            this.innerHTML = `<i class="las la-pause"></i>`
            a.play();
        }
        else {
            this.innerHTML = `<i class="las la-play"></i>`;
            a.pause();
        }
    });
});

// https://stackoverflow.com/questions/19790506/multiple-audio-html-auto-stop-other-when-current-is-playing-with-javascript
document.addEventListener(
    "play",
    function (e) {
        let a = document.getElementsByTagName("audio");
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] != e.target) {
                a[i].pause();
                play[i].innerHTML = `<i class="las la-play"></i>`;
            }
        }
    },
    true
);

function durations(currentTime) {
    var d = currentTime;
    var sec,
        min = Number();
    sec = Math.floor(d);
    min = Math.floor(sec / 60);
    min = min >= 10 ? min : "0" + min;
    sec = Math.floor(sec % 60);
    sec = sec >= 10 ? sec : "0" + sec;

    return min + ":" + sec;
}


