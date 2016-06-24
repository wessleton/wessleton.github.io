function playAgain() {
    location.reload()
}

function random(upperBound) {
    return Math.floor(Math.random() * upperBound)
}

function getDisplay(rank, suit) {
    return ranks[rank] + ' ' + suits[suit]
}

function shuffle(array) {
    for (let i = 0; i < array.length * 10; i++) {
        const index1 = random(array.length)
        const index2 = random(array.length)
        const temp = array[index1]
        array[index1] = array[index2]
        array[index2] = temp
    }
    return array
}

function compare() {
    const humanActiveCard = humanDeck[humanDeckIndex]
    const computerActiveCard = computerDeck[computerDeckIndex]

    if (humanActiveCard.rank > computerActiveCard.rank) {
        compareText.textContent = 'You won!'
        computerDeck.splice(computerDeckIndex, 1)
        humanDeck.unshift(computerActiveCard)
        for (let card of warDeck) {
            humanDeck.unshift(card)
        }
        humanDeckIndex += 2 + warDeck.length
         if (warDeck.length > 0) {
            humanWar.classList.add('human-won')
            computerWar.classList.add('human-won')
            setTimeout(function (){
                humanWar.classList.remove('human-won')
            computerWar.classList.remove('human-won')
            }, 250)
        }
        warDeck = []
        human.classList.add('won')
        humanWar.classList.remove('shown')
        computerWar.classList.remove('shown')
    }
    else if (computerActiveCard.rank > humanActiveCard.rank) {
        compareText.textContent = 'You lost.'
        humanDeck.splice(humanDeckIndex, 1)
        computerDeck.unshift(humanActiveCard)
        for (let card of warDeck) {
            computerDeck.unshift(card)
        }
        computerDeckIndex += 2 + warDeck.length
        if (warDeck.length > 0) {
            humanWar.classList.add('computer-won')
            computerWar.classList.add('computer-won')
            setTimeout(function (){
                humanWar.classList.remove('computer-won')
                computerWar.classList.remove('computer-won')
            }, 250)
        }
        warDeck = []
        computer.classList.add('won')
        humanWar.classList.remove('shown')
        computerWar.classList.remove('shown')
    }
    else {
        compareText.textContent = 'War!'
        humanDeck.splice(humanDeckIndex, 1)
        computerDeck.splice(computerDeckIndex, 1)
        warDeck.push(humanActiveCard, computerActiveCard)
        humanWar.innerHTML = getDisplay(humanActiveCard.rank, humanActiveCard.suit)
        computerWar.innerHTML = getDisplay(computerActiveCard.rank, computerActiveCard.suit)
        humanWar.classList.add('shown')
        computerWar.classList.add('shown')
    }
    cardsLeft.textContent = 'Cards left: ' + humanDeck.length

    if (humanDeck.length >= 52) {
        alert('You won the game! Congratulations!')
        playAgain()
    }

    if (humanDeck.length <= 0) {
        alert('You lost the game. How sad.')
        playAgain()
    }
}

function humanToggle() {
    humanActive = !humanActive
    if (humanActive) {
        human.classList.add('active')

        if (humanDeckIndex >= humanDeck.length) {
            humanDeckIndex = 0
            humanDeck = shuffle(humanDeck)
        }

        const card = humanDeck[humanDeckIndex]
        human.innerHTML = getDisplay(card.rank, card.suit)
    }
    else {
        human.classList.remove('active')
        human.innerHTML = ''
        compareText.textContent = ''
        human.classList.remove('won')
    }
    computerToggle()
}

function computerToggle() {
 computerActive = !computerActive
     if (computerActive) {
        computer.classList.add('active')

        if (computerDeckIndex >= computerDeck.length) {
            computerDeckIndex = 0
            shuffle(computerDeck)
        }

        const card = computerDeck[computerDeckIndex]
        computer.innerHTML = getDisplay(card.rank, card.suit)
        setTimeout(compare, 300)
    }
    else {
        computer.classList.remove('active')
        computer.innerHTML = ''
        computer.classList.remove('won')
    }
}

const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
const suits = ['&spades;', '&diams;', '&clubs;', '&hearts;']

let deck = []
for (let i = 0; i < 4; i++) {
    for(let j = 0; j < 13; j++) {
        deck.push({
            suit: i,
            rank: j
        })
    }
}

shuffle(deck)

let humanDeck = deck.splice(0, deck.length / 2)
let computerDeck = deck

let warDeck = []

let humanDeckIndex = 0
let computerDeckIndex = 0

console.log('Human')
for (let card of humanDeck) {
    console.log(getDisplay(card.rank, card.suit))
}

console.log('Computer')
for (let card of computerDeck) {
    console.log(getDisplay(card.rank, card.suit))
}

const human = document.querySelector('div#human')
const computer = document.querySelector('div#computer')
const humanWar = document.querySelector('div.war.human')
const computerWar = document.querySelector('div.war.computer')
const cardsLeft = document.querySelector('span#cards-left')
const compareText = document.querySelector('span#compare')

cardsLeft.textContent = 'Cards left: ' + humanDeck.length

let humanActive = false
let computerActive = false

human.addEventListener('click', humanToggle)
window.addEventListener('keydown', function(event) {
    if (event.key == ' ') {
        humanToggle()
    }
})
