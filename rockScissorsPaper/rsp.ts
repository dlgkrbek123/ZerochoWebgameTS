interface RSP {
  readonly ROCK: '0';
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}

const rsp: RSP = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
};
const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

let imgCoords: RSP[keyof RSP] = '0';
let interval: number;
let point: number = 0;

function computerChoice(imgCoords: RSP[keyof RSP]): keyof RSP {
  const keys = Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER'];
  return keys.find((k) => rsp[k] === imgCoords)!;
}

function intervalMaker() {
  interval = setInterval(function () {
    if (imgCoords === rsp.ROCK) {
      imgCoords = rsp.SCISSORS;
    } else if (imgCoords === rsp.SCISSORS) {
      imgCoords = rsp.PAPER;
    } else {
      imgCoords = rsp.ROCK;
    }

    const computerDOM = document.querySelector<HTMLElement>('#computer');

    if (computerDOM) {
      computerDOM.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;
    }
  }, 100);
}

intervalMaker();

document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function (this: HTMLButtonElement, e: Event) {
    clearInterval(interval);
    setTimeout(intervalMaker, 2000);

    const myChoice = this.textContent as keyof RSP;
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    const diff = myScore - computerScore;
    const pointDOM = document.querySelector('#point') as HTMLElement;

    if (diff === 0) {
      console.log('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      console.log('이겼습니다.');
      point++;
    } else {
      console.log('졌습니다.');
      point--;
    }

    pointDOM.textContent = String(point);
  });
});
