interface ICard {
  att: number;
  hp: number;
  cost?: number;
  mine: boolean;
  field: boolean;
  hero?: boolean;
}

interface IPlayer {
  hero: HTMLDivElement;
  deck: HTMLDivElement;
  field: HTMLDivElement;
  cost: HTMLDivElement;
  deckData: Array<ICard>;
  heroData: ICard | null;
  fieldData: ICard[];
  chosenCard: HTMLDivElement | null;
  chosenCardData: ICard | null;
}

class Hero implements ICard {
  public att: number;
  public hp: number;
  public mine: boolean;
  public field: boolean;
  public hero: true;

  constructor(mine: boolean) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;

    this.mine = mine;
    this.field = true;
    this.hero = true;
  }
}

class Sub implements ICard {
  public att: number;
  public hp: number;
  public cost: number;
  public mine: boolean;
  public field: boolean;

  constructor(mine: boolean) {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);

    this.mine = mine;
    this.field = false;
  }
}

const oppnent: IPlayer = {
  hero: document.querySelector('#rival-hero') as HTMLDivElement,
  deck: document.querySelector('#rival-deck') as HTMLDivElement,
  field: document.querySelector('#rival-cards') as HTMLDivElement,
  cost: document.querySelector('#rival-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

const me: IPlayer = {
  hero: document.querySelector('#my-hero') as HTMLDivElement,
  deck: document.querySelector('#my-deck') as HTMLDivElement,
  field: document.querySelector('#my-cards') as HTMLDivElement,
  cost: document.querySelector('#my-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

let turn = true;

function init() {
  [oppnent, me].forEach((player) => {
    player.deckData = [];
    player.heroData = null;
    player.fieldData = [];
    player.chosenCard = null;
    player.chosenCardData = null;
  });

  createHero({ mine: true });
  createHero({ mine: false });
  createDeck({ mine: true, count: 5 });
  createDeck({ mine: false, count: 5 });
  redrawScreen({ mine: true });
  redrawScreen({ mine: false });
}

function createHero({ mine }: { mine: boolean }): void {
  const player = mine ? me : oppnent;

  player.heroData = new Hero(mine);
  connectCardDOM({
    data: player.heroData,
    DOM: player.hero,
    hero: true,
  });
}

function createDeck({ mine, count }: { mine: boolean; count: number }): void {
  const player = mine ? me : oppnent;

  for (let i = 0; i < count; i++) {
    player.deckData.push(new Sub(mine));
  }
  redrawDeck(player);
}

function isSub(data: ICard): data is Sub {
  return !!data.cost;
}

function connectCardDOM({
  data,
  DOM,
  hero = false,
}: {
  data: ICard;
  DOM: HTMLDivElement;
  hero?: boolean;
}) {
  const cardEl = document
    .querySelector('.card-hidden .card')
    ?.cloneNode(true) as HTMLDivElement;
  const cardCost = cardEl.querySelector('.card-cost') as HTMLDivElement;

  cardEl.querySelector('.card-att')!.textContent = String(data.att);
  cardEl.querySelector('.card-hp')!.textContent = String(data.hp);

  if (hero) {
    const name = document.createElement('div');
    name.textContent = '영웅';
    cardCost.style.display = 'none';
    cardEl.appendChild(name);
  } else {
    cardCost.innerHTML = String(data.cost);
  }

  cardEl.addEventListener('click', (e) => {
    const isCardSub = isSub(data);

    if (data.mine === turn) {
      if (isCardSub) {
        if (!data.field) {
          if (!deckToField({ data })) {
            createDeck({ mine: true, count: 1 });
          } else {
          }
        }
      } else {
      }
    }
  });

  DOM.appendChild(cardEl);
}

function deckToField({ data }: { data: Sub }): boolean {
  const target = turn ? me : oppnent;
  const currentCost = Number(target.cost.textContent);

  if (currentCost > data.cost) {
    alert('코스트가 부족합니다.');
    return true;
  }

  data.field = true;
  const idx = target.deckData.findIndex((deckItem: ICard) => deckItem === data);
  target.deckData.splice(idx, 1);

  return false;
}

function redrawScreen({ mine }: { mine: boolean }): void {
  const player = mine ? me : oppnent;

  redrawField(player);
  redrawDeck(player);
  redrawHero(player);
}

function redrawHero(target: IPlayer) {
  target.hero.innerHTML = '';
  connectCardDOM({
    data: target.heroData!,
    DOM: target.hero,
    hero: true,
  });
}

function redrawDeck(target: IPlayer) {
  target.deck.innerHTML = '';
  target.deckData.forEach((data) => {
    connectCardDOM({
      data,
      DOM: target.deck,
      hero: false,
    });
  });
}

function redrawField(target: IPlayer) {}

init();
