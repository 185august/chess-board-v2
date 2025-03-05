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
        piecesOnTheBoard: {
            position: {
                currentValue: [],
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
             ${placePieces(row, col, position) ?? ''}
             ${model.input.piecesOnTheBoard.position[position].currentValue.join('')}
                        </div>`
        }
        boardHtml += rowHtml

    }

    return boardHtml
}
function placePieces(row, col, position) {
    const whitePiecesRow = 1;
    const whitePawnRow = 2;

    const blackPiecesRow = 8;
    const blackPawnRow = 7;

    if (row == whitePawnRow) {
        console.log('whitepawn ' + row)
        model.input.piecesOnTheBoard.position[`${position}`] = {
            currentValue: [`<img onclick="movePiece('${position}')" class="${model.data.pieces.white[8].name}" src="${model.data.pieces.white[8].src}">`],
            pieceType: model.data.pieces.white[8].name
        }
    }
    else if (row == blackPawnRow) {
        console.log('blackpawn ' + row)
        model.input.piecesOnTheBoard.position[`${position}`] = {
            currentValue: [`<img onclick="movePiece('${position}')" class="${model.data.pieces.black[8].name}" src="${model.data.pieces.black[8].src}">`],
            pieceType: model.data.pieces.black[8].name
        }
    }

    else if (row == whitePiecesRow) {
        console.log('whitePieces ' + row)
        model.input.piecesOnTheBoard.position[`${position}`] = {
            currentValue: [`<img onclick="movePiece('${position}')" class="${model.data.pieces.black[col = (col - 1)].name}" src="${model.data.pieces.white[col].src}">`],
            pieceType: model.data.pieces.white[col = (col - 1)].name
        }
    }
    else if (row == blackPiecesRow) {
        console.log('blackPieces ' + row)
        model.input.piecesOnTheBoard.position[`${position}`] = {
            currentValue: [`<img onclick="movePiece('${position}')" class="${model.data.pieces.black[col = (col - 1)].name}" src="${model.data.pieces.black[col].src}">`],
            pieceType: model.data.pieces.black[col = (col - 1)].name
        }
    }
    else {
        model.input.piecesOnTheBoard.position[`${position}`] = {
            currentValue: []
        }
    }

}

function movePiece(element) {
    const currentPiece = model.input.piecesOnTheBoard.position[element]

}