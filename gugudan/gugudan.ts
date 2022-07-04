let numberOne = Math.ceil(Math.random() * 9);
let numberTwo = Math.ceil(Math.random() * 9);
let result = numberOne * numberTwo;

const word = document.createElement('div');
const form = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');
const resultDiv = document.createElement('div');

word.textContent = `${numberOne} 곱하기 ${numberTwo}`;
input.type = 'number';
button.textContent = '입력';
button.type = 'submit';

form.append(input);
form.append(button);
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (result === Number(input.value)) {
    resultDiv.textContent = '딩동댕';
    input.value = '';

    numberOne = Math.ceil(Math.random() * 9);
    numberTwo = Math.ceil(Math.random() * 9);
    result = numberOne * numberTwo;
    word.textContent = `${numberOne} 곱하기 ${numberTwo}`;
  } else {
    resultDiv.textContent = '땡';
    input.focus();
  }
});

document.body.append(word);
document.body.append(form);
document.body.append(resultDiv);
