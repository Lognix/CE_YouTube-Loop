var setStart = false;
var setEnd = false;
var startTime = 0;
var endTime = 0;

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

function setLoopTime(message) {
    if (message === "start") {
        setStart = true;
        startTime = Math.round(document.querySelector("video").currentTime);
    } else if (message === "end") {
        endTime = Math.round(document.querySelector("video").currentTime);
        if (startTime < endTime) {
            setEnd = true;
        }
    }
}

function loopVideo(on, startTime, endTime) {
    const video = document.querySelector("video");
    if (video && on) {
        video.currentTime = startTime;
        video.ontimeupdate = () => {
            if (video.currentTime >= endTime) {
                video.currentTime = startTime;
            }
        };
    } else { video.ontimeupdate = null }
}

function addButtons() {
    const container = document.querySelector(".ytp-left-controls");
    if (!container) {
        setTimeout(addButtons, 1000);
        return;
    }

    //=========================================================================================================
    const btn_loop = document.createElement("button");
    btn_loop.className = "hover-text-button-235152";
    btn_loop.textContent = "Set Start";

    btn_loop.addEventListener("click", () => {
        if (!setStart) {
            setLoopTime("start");
            btn_loop.textContent = formatTime(startTime) + " - Set End";
        } else if (!setEnd) {
            setLoopTime("end");
            if (startTime < endTime) {
                btn_loop.textContent = formatTime(startTime) + " - " + formatTime(endTime);
            }
        } else if (setStart && setEnd) {
            loopVideo(true, startTime, endTime);
        }
    });
    container.append(btn_loop); 

    //=========================================================================================================
    const btn_reset = document.createElement("button");
    btn_reset.className = "hover-text-button-235152";
    btn_reset.textContent = "Reset";

    btn_reset.addEventListener("click", () => {
        loopVideo(false, startTime, endTime);
        btn_loop.textContent = "Set Start";
        startTime = 0;
        endTime = 0;
        setStart = false;
        setEnd = false;
    });
    container.append(btn_reset); 
}

addButtons();

//console.log("script loaded");