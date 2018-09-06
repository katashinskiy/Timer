let buttons = document.querySelectorAll(".timer_button");
let inputTime = document.forms["customForm"].elements["minutes"];
let addTimer = document.forms["customForm"].elements["SubmitButton"];
let stop = document.querySelector("#Stop");

let timer = (function () {
    let display_time_left;
    let display_end_time;
    let audio;
    let newTimer;

    function init(seting) {

        display_time_left = document.querySelector(seting.displayTime);
        display_end_time = document.querySelector(seting.displayEnd);

        if (seting.audioAlarm) {
            audio = new Audio(seting.audioAlarm);
        }

    }

    function start(second) {

        let currentTime = Date.now();
        let finishTime = (currentTime + second * 1000);

        clearInterval(newTimer);
        audio.pause();
        audio.currencyDisplay = 0;

        displayTimer(second--);
        displayEnder(finishTime);

        newTimer = setInterval(() => {
            displayTimer(--second);
            if (second === 0) {
                clearInterval(newTimer);
                audio.play();
            }
        }, 1000);

    }

    function displayTimer(second) {
        let hour = Math.floor(second / 3600);
        let minutes = Math.floor((second - hour * 3600) / 60);
        let seconds = second % 60;

        display_time_left.textContent = `Timer: ${hour >= 10 ? hour : "0" + hour}
         : ${minutes >= 10 ? minutes : "0" + minutes} 
         : ${seconds >= 10 ? seconds : "0" + seconds}`;
    }

    function displayEnder(dataEnd) {

        let end = new Date(dataEnd);
        let hour = end.getHours();
        let minutes = end.getMinutes();
        let seconds = end.getSeconds();

        display_end_time.textContent = `Finish time : ${hour >= 10 ? hour : "0" + hour}
         : ${minutes >= 10 ? minutes : "0" + minutes} 
         : ${seconds >= 10 ? seconds : "0" + seconds}`;

    }

    function stop() {
        clearInterval(newTimer);
        audio.pause();
        audio.currencyDisplay = 0;
        displayTimer(0);
    }

    return {
        init,
        start,
        stop,
    }
}());

timer.init({
    displayTime: ".display_time_left",
    displayEnd: ".display_end_time",
    audioAlarm: "audio/music.mp3"
});

function startTimer() {
    timer.start(this.dataset.time);
}


buttons.forEach(elem => elem.addEventListener("click", startTimer));
addTimer.addEventListener("click", function (e) {
    e.preventDefault();
    timer.start(parseInt(inputTime.value) * 60);
});

stop.addEventListener("click",function () {
    timer.stop();
});