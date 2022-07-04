"use strict";
var body = document.body;
var answer = [];
function chooseNumber() {
    var candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    answer = [];
    for (var i = 0; i < 4; i++) {
        var chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        answer.push(chosen);
    }
    console.log(answer);
}
function refreshGame() {
    input.value = '';
    input.focus();
    chooseNumber();
    wrongCount = 0;
}
chooseNumber();
var form = document.createElement('form');
var input = document.createElement('input');
var button = document.createElement('button');
var result = document.createElement('h1');
input.type = 'text';
input.maxLength = 4;
button.textContent = '입력!';
form.append(input);
form.append(button);
body.append(form);
body.append(result);
var wrongCount = 0;
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var inputValue = input.value;
    if (inputValue === answer.join('')) {
        result.textContent = '홈런';
        refreshGame();
    }
    else {
        var inputArray = inputValue.split('');
        var strike = 0;
        var ball = 0;
        wrongCount += 1;
        if (wrongCount > 10) {
            result.textContent = "10\uBC88 \uB118\uAC8C \uD2C0\uB824\uC11C \uC2E4\uD328! \uB2F5\uC740 ".concat(answer.join(','), " \uC600\uC2B5\uB2C8\uB2E4!");
            refreshGame();
        }
        else {
            for (var i = 0; i <= 3; i++) {
                if (Number(inputArray[i]) === answer[i]) {
                    strike += 1;
                }
                else if (answer.indexOf(Number(inputArray[i])) > -1) {
                    ball += 1;
                }
            }
            result.textContent = "".concat(strike, "\uC2A4\uD2B8\uB77C\uC774\uD06C ").concat(ball, "\uBCFC\uC785\uB2C8\uB2E4.");
            input.value = '';
            input.focus();
        }
    }
});
