var numberOne = Math.ceil(Math.random() * 9);
var numberTwo = Math.ceil(Math.random() * 9);
var result = numberOne * numberTwo;
var word = document.createElement('div');
var form = document.createElement('form');
var input = document.createElement('input');
var button = document.createElement('button');
var resultDiv = document.createElement('div');
word.textContent = "".concat(numberOne, " \uACF1\uD558\uAE30 ").concat(numberTwo);
input.type = 'number';
button.textContent = '입력';
button.type = 'submit';
form.append(input);
form.append(button);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (result === Number(input.value)) {
        resultDiv.textContent = '딩동댕';
        input.value = '';
        numberOne = Math.ceil(Math.random() * 9);
        numberTwo = Math.ceil(Math.random() * 9);
        result = numberOne * numberTwo;
        word.textContent = "".concat(numberOne, " \uACF1\uD558\uAE30 ").concat(numberTwo);
    }
    else {
        resultDiv.textContent = '땡';
        input.focus();
    }
});
document.body.append(word);
document.body.append(form);
document.body.append(resultDiv);
