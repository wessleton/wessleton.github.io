function playAgain() {
    location.reload()
}

function isValid(x, y) {
    return x >= 0 && x <= 2 && y >= 0 && y <= 2
}

function handleClick(index) {
    if (isDone) {
        return
    }

    if (board[index] == 'X' || board[index] == 'O') {
        alert('Tile already played.')
        return
    }

    if (isX) {
        board[index] = 'X'
        tiles[index].textContent = 'X'
    }
    else {
        board[index] = 'O'
        tiles[index].textContent = 'O'
    }

    const x = index % 3
    const y = Math.floor(index / 3)

    let character
    if (isX) {
        character = 'X'
    }
    else {
        character = 'O'
    }
    
    const directions = [
        [-1, 0],
        [-1, -1],
        [0, -1],
        [1, -1],
    ]

    for (let direction of directions) {
        let count = 0
        let siblingX = x
        let siblingY = y
        while (isValid(siblingX, siblingY) && board[siblingY * 3 + siblingX] == character) {
            count++
            siblingX += direction[0]
            siblingY += direction[1]
        }
        siblingX = x - direction[0]
        siblingY = y - direction[1]
        while (isValid(siblingX, siblingY) && board[siblingY * 3 + siblingX] == character) {
            count++
            siblingX -= direction[0]
            siblingY -= direction[1]
        }
        if (count >= 3) {
            isDone = true
            playAgainButton.removeAttribute('disabled')
            playAgainButton.addEventListener('click', playAgain)
            alert('Player ' + character + ' wins!')
            return
        }
    }
    isX = !isX

    moveCount++
    if (moveCount == 9) {
        playAgainButton.removeAttribute('disabled')
        playAgainButton.addEventListener('click', playAgain)
        alert('Tie!')
    }
}

let tiles = document.querySelectorAll('div')
let playAgainButton = document.querySelector('button')

let moveCount = 0
let isDone = false
let isX = true
let board = [1, 2, 3, 4, 5, 6, 7, 8, 9]

for (let i = 0; i < 9; i++) {
        tiles[i].addEventListener('click', handleClick.bind(this, i))
}
