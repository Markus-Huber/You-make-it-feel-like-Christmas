let lead, backing, instrumental;

function init() {
    setTimeout(() => {
        video = document.getElementById("videoPlayer");
        let width = video.getBoundingClientRect().width;
        document.getElementById("controls").style.width = width + "px";

        lead = document.getElementById("lead").getElementsByTagName("audio")[0];
        backing = document.getElementById("backing").getElementsByTagName("audio")[0];
        instrumental = document.getElementById("instrumental").getElementsByTagName("audio")[0];

        resetAudio();

        addListenerMulti(video, 'abort canplay canplaythrough durationchange emptied encrypted ended error interruptbegin interruptend loadeddata loadedmetadata loadstart mozaudioavailable pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting', function (e) {
            switch (e.type) {
                case "play":
                    lead.play();
                    backing.play();
                    instrumental.play();
                    break;
                case "pause":
                    lead.pause();
                    backing.pause();
                    instrumental.pause();
                    break;
                case "seeked":
                    let restart = false;
                    if (!video.paused && !video.ended) {
                        video.pause();
                        restart = true;
                    }
                    let currentTime = video.currentTime;
                    lead.currentTime = currentTime;
                    backing.currentTime = currentTime;
                    instrumental.currentTime = currentTime;
                    if (restart) {
                        video.play();
                        lead.play();
                        backing.play();
                        instrumental.play();
                    }
                    break;
                default:
                    //do nothing
            }
        });
    }, 100);
}

function addListenerMulti(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
}

function updateLead(newValue) {
    lead.volume = (newValue / 100);
}

function updateBacking(newValue) {
    backing.volume = (newValue / 100);
}

function updateInstrumental(newValue) {
    instrumental.volume = (newValue / 100);
}

function openFullscreen(caller) {
    elem = document.getElementsByTagName("body")[0];
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
    }
    caller.onclick = () => closeFullscreen(caller);
}

function closeFullscreen(caller) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
    }
    caller.onclick = () => openFullscreen(caller);
}

function resetAudio() {
    lead.volume = 0;
    backing.volume = 0.4;
    instrumental.volume = .8;

    document.getElementById("lead").getElementsByTagName("input")[0].value = (lead.volume * 100);
    document.getElementById("backing").getElementsByTagName("input")[0].value = (backing.volume * 100);
    document.getElementById("instrumental").getElementsByTagName("input")[0].value = (instrumental.volume * 100);

    document.getElementById("lead").getElementsByTagName("output")[0].value = (lead.volume * 100);
    document.getElementById("backing").getElementsByTagName("output")[0].value = (backing.volume * 100);
    document.getElementById("instrumental").getElementsByTagName("output")[0].value = (instrumental.volume * 100);

    let newValue = 1;
    video.playbackRate = newValue
    lead.playbackRate = newValue;
    backing.playbackRate = newValue;
    instrumental.playbackRate = newValue;
    document.getElementById("geschwindigkeit").getElementsByTagName("input")[0].value = 100;
    document.getElementById("geschwindigkeit").getElementsByTagName("output")[0].value = 1;
}

function updateGeschwindigkeit(newValue) {
    newValue = (newValue / 100);
    video.playbackRate = newValue
    lead.playbackRate = newValue;
    backing.playbackRate = newValue;
    instrumental.playbackRate = newValue;
}

function goTo(whichOne){
    if(document.location.href.includes("/"+whichOne+"/"))
        return

    switch(whichOne){
        case 1:
            document.location.href = "../1/index.html";
            break;
        case 2:
            document.location.href = "../2/index.html";
            break;
        case 3:
            document.location.href = "../3/index.html";
            break;
        case 4:
            document.location.href = "../4/index.html";
            break;
    }
}