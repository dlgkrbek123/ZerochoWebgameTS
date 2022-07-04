const { body } = document;

let answer: number[] = [];

function chooseNumber(): void {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  answer = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    answer.push(chosen);
  }

  console.log(answer);
}

function refreshGame(): void {
  input.value = '';
  input.focus();
  chooseNumber();
  wrongCount = 0;
}

chooseNumber();

const form = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');
const result = document.createElement('h1');

input.type = 'text';
input.maxLength = 4;
button.textContent = '입력!';

form.append(input);
form.append(button);
body.append(form);
body.append(result);

let wrongCount = 0;

form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const inputValue = input.value;

  if (inputValue === answer.join('')) {
    result.textContent = '홈런';
    refreshGame();
  } else {
    const inputArray = inputValue.split('');
    let strike = 0;
    let ball = 0;
    wrongCount += 1;

    if (wrongCount > 10) {
      result.textContent = `10번 넘게 틀려서 실패! 답은 ${answer.join(
        ','
      )} 였습니다!`;
      refreshGame();
    } else {
      for (let i: number = 0; i <= 3; i++) {
        if (Number(inputArray[i]) === answer[i]) {
          strike += 1;
        } else if (answer.indexOf(Number(inputArray[i])) > -1) {
          ball += 1;
        }
      }

      result.textContent = `${strike}스트라이크 ${ball}볼입니다.`;
      input.value = '';
      input.focus();
    }
  }
});
