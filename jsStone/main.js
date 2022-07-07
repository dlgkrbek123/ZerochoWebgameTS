"use strict";
var Hero = /** @class */ (function () {
    function Hero(mine) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.mine = mine;
        this.field = true;
        this.hero = true;
    }
    return Hero;
}());
var Sub = /** @class */ (function () {
    function Sub(mine) {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
        this.mine = mine;
        this.field = false;
    }
    return Sub;
}());
var oppnent = {
    hero: document.querySelector('#rival-hero'),
    deck: document.querySelector('#rival-deck'),
    field: document.querySelector('#rival-cards'),
    cost: document.querySelector('#rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var me = {
    hero: document.querySelector('#my-hero'),
    deck: document.querySelector('#my-deck'),
    field: document.querySelector('#my-cards'),
    cost: document.querySelector('#my-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var turn = true;
function init() {
    [oppnent, me].forEach(function (player) {
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
function createHero(_a) {
    var mine = _a.mine;
    var player = mine ? me : oppnent;
    player.heroData = new Hero(mine);
    connectCardDOM({
        data: player.heroData,
        DOM: player.hero,
        hero: true
    });
}
function createDeck(_a) {
    var mine = _a.mine, count = _a.count;
    var player = mine ? me : oppnent;
    for (var i = 0; i < count; i++) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
}
function isSub(data) {
    return !!data.cost;
}
function connectCardDOM(_a) {
    var _b;
    var data = _a.data, DOM = _a.DOM, _c = _a.hero, hero = _c === void 0 ? false : _c;
    var cardEl = (_b = document
        .querySelector('.card-hidden .card')) === null || _b === void 0 ? void 0 : _b.cloneNode(true);
    var cardCost = cardEl.querySelector('.card-cost');
    cardEl.querySelector('.card-att').textContent = String(data.att);
    cardEl.querySelector('.card-hp').textContent = String(data.hp);
    if (hero) {
        var name_1 = document.createElement('div');
        name_1.textContent = '영웅';
        cardCost.style.display = 'none';
        cardEl.appendChild(name_1);
    }
    else {
        cardCost.innerHTML = String(data.cost);
    }
    cardEl.addEventListener('click', function (e) {
        var isCardSub = isSub(data);
        if (data.mine === turn) {
            if (isCardSub) {
                if (!data.field) {
                    if (!deckToField({ data: data })) {
                        createDeck({ mine: true, count: 1 });
                    }
                    else {
                    }
                }
            }
            else {
            }
        }
    });
    DOM.appendChild(cardEl);
}
function deckToField(_a) {
    var data = _a.data;
    var target = turn ? me : oppnent;
    var currentCost = Number(target.cost.textContent);
    if (currentCost > data.cost) {
        alert('코스트가 부족합니다.');
        return true;
    }
    data.field = true;
    var idx = target.deckData.findIndex(function (deckItem) { return deckItem === data; });
    target.deckData.splice(idx, 1);
    return false;
}
function redrawScreen(_a) {
    var mine = _a.mine;
    var player = mine ? me : oppnent;
    redrawField(player);
    redrawDeck(player);
    redrawHero(player);
}
function redrawHero(target) {
    target.hero.innerHTML = '';
    connectCardDOM({
        data: target.heroData,
        DOM: target.hero,
        hero: true
    });
}
function redrawDeck(target) {
    target.deck.innerHTML = '';
    target.deckData.forEach(function (data) {
        connectCardDOM({
            data: data,
            DOM: target.deck,
            hero: false
        });
    });
}
function redrawField(target) { }
init();
