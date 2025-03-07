// model
const model = {
    data: {
        pieces: {
            white: [
                { name: 'white rook', src: 'pictures/whiteRook.png' },
                { name: 'white bishop', src: 'pictures/whiteBishop.png' },
                { name: 'white knight', src: 'pictures/whiteKnight.png' },
                { name: 'white queen', src: 'pictures/whiteQueen.png' },
                { name: 'white king', src: 'pictures/whiteKing.png' },
                { name: 'white knight', src: 'pictures/whiteKnight.png' },
                { name: 'white bishop', src: 'pictures/whiteBishop.png' },
                { name: 'white rook', src: 'pictures/whiteRook.png' },
                { name: 'white pawn', src: 'pictures/whitePawn.png' }

            ],
            black: [
                { name: 'black rook', src: 'pictures/blackRook.png' },
                { name: 'black bishop', src: 'pictures/blackBishop.png' },
                { name: 'black knight', src: 'pictures/blackKnight.png' },
                { name: 'black queen', src: 'pictures/blackQueen.png' },
                { name: 'black king', src: 'pictures/blackKing.png' },
                { name: 'black knight', src: 'pictures/blackKnight.png' },
                { name: 'black bishop', src: 'pictures/blackBishop.png' },
                { name: 'black rook', src: 'pictures/blackRook.png' },
                { name: 'black pawn', src: 'pictures/blackPawn.png' }
            ]

        }
        ,
    },
    input: {
        squaresOnTheBoard: {
            position: {
                currentValue: [],
                letterValue: '',
                numberValue: '',
                pieceType: []
            },
        },
    },
    ui: {
        isPieceSpot: false,
    }
}
//view 
function updateView() {
    let html = `
    ${renderChessBoard()}
    `
    document.getElementById('app').innerHTML = html;
}

function renderChessBoard() {
    let boardHtml = '';
    for (let row = 8; row > 0; row--) {
        let rowHtml = '';
        for (let col = 1; col < 9; col++) {
            const char = String.fromCharCode(64 + col)
            const position = row + char
            const colHtml = (row + col) % 2 ? 'lightSquare' : 'darkSquare'
            rowHtml += `<div class="${colHtml}">
            ${position}
             ${placePieces(row, col, position, char) ?? ''}
             ${model.input.squaresOnTheBoard.position[position].currentValue.join('')}
                        </div>`
        }
        boardHtml += rowHtml

    }

    return boardHtml
}
function placePieces(row, col, position, char) {
    const whitePiecesRow = 1;
    const whitePawnRow = 2;

    const blackPiecesRow = 8;
    const blackPawnRow = 7;

    if (row == whitePawnRow) {
        console.log('whitepawn ' + row)
        model.input.squaresOnTheBoard.position[`${position}`] = {
            currentValue: [`<img onclick="movePiece(this)" class="${model.data.pieces.white[8].name}" src="${model.data.pieces.white[8].src}">`],
            letterValue: char,
            numberValue: row,
            pieceType: [model.data.pieces.white[8].name]
        }
    }
    else if (row == blackPawnRow) {
        console.log('blackpawn ' + row)
        model.input.squaresOnTheBoard.position[`${position}`] = {
            currentValue: [`<img onclick="movePiece(this)" class="${model.data.pieces.black[8].name}" src="${model.data.pieces.black[8].src}">`],
            letterValue: char,
            numberValue: row,
            pieceType: [model.data.pieces.black[8].name]
        }
    }

    else if (row == whitePiecesRow) {
        console.log('whitePieces ' + row)
        model.input.squaresOnTheBoard.position[`${position}`] = {
            currentValue: [`<img onclick="movePiece(this)" class="${model.data.pieces.black[col = (col - 1)].name}" src="${model.data.pieces.white[col].src}">`],
            letterValue: char,
            numberValue: row,
            pieceType: [model.data.pieces.white[col].name]
        }
    }
    else if (row == blackPiecesRow) {
        console.log('blackPieces ' + row)
        model.input.squaresOnTheBoard.position[`${position}`] = {
            currentValue: [`<img onclick="movePiece(this)" class="${model.data.pieces.black[col = (col - 1)].name}" src="${model.data.pieces.black[col].src}">`],
            letterValue: char,
            numberValue: row,
            pieceType: [model.data.pieces.black[col].name]
        }
    }
    else {
        model.input.squaresOnTheBoard.position[`${position}`] = {
            letterValue: char,
            numberValue: row,
            currentValue: [],
            pieceType: ''
        }
    }

}

function movePiece(currentPosition) {
    const currentPiece = model.input.squaresOnTheBoard.position[currentPosition].pieceType
    currentPiece[0].includes('pawn') ? movePawn(currentPosition) : '';

}

function movePawn(currentPosition) {
    let pawnNumberPosition = model.input.squaresOnTheBoard.position[currentPosition].numberValue
    let pawnLetterPosition = model.input.squaresOnTheBoard.position[currentPosition].letterValueValue
    const pieceDetalis = model.input.squaresOnTheBoard.position[currentPosition]
    console.log(pieceDetalis)
    model.input.squaresOnTheBoard.position[currentPosition].currentValue = []
    model.input.squaresOnTheBoard.position['4A'] = pieceDetalis
    console.log(pawnNumberPosition)

}