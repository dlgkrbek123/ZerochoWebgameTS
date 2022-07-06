"use strict";
var rsp = {
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px'
};
var score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
};
var imgCoords = '0';
var interval;
var point = 0;
function computerChoice(imgCoords) {
    var keys = Object.keys(rsp);
    return keys.find(function (k) { return rsp[k] === imgCoords; });
}
function intervalMaker() {
    interval = setInterval(function () {
        if (imgCoords === rsp.ROCK) {
            imgCoords = rsp.SCISSORS;
        }
        else if (imgCoords === rsp.SCISSORS) {
            imgCoords = rsp.PAPER;
        }
        else {
            imgCoords = rsp.ROCK;
        }
        var computerDOM = document.querySelector('#computer');
        if (computerDOM) {
            computerDOM.style.background = "url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ".concat(imgCoords, " 0");
        }
    }, 100);
}
intervalMaker();
document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        clearInterval(interval);
        setTimeout(intervalMaker, 2000);
        var myChoice = this.textContent;
        var myScore = score[myChoice];
        var computerScore = score[computerChoice(imgCoords)];
        var diff = myScore - computerScore;
        var pointDOM = document.querySelector('#point');
        if (diff === 0) {
            console.log('비겼습니다.');
        }
        else if ([-1, 2].includes(diff)) {
            console.log('이겼습니다.');
            point++;
        }
        else {
            console.log('졌습니다.');
            point--;
        }
        pointDOM.textContent = String(point);
    });
});
