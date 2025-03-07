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

        },
        squarePositions: {}
    },
    input: {
        currentMovingPiece: {
            numberValue: null,
            letterValue: '',
        }
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
function initGame() {
    makeSquarePositionsArray();
    initializeBoard();
    renderChessBoard();
}

function makeSquarePositionsArray() {

    for (let row = 8; row > 0; row--) {
        for (let col = 1; col < 9; col++) {
            const char = String.fromCharCode(64 + col)
            const position = row + char;
            const colHtml = (row + col) % 2 ? 'light-square' : 'dark-square';

            model.data.squarePositions[position] =
            {
                numberValue: row,
                letterValue: char,
                piece: '',
                element: `<div onclick="selectSquare(${row}, '${char}')" class="${colHtml}"><img src""></div>`,
            }
        }
    }
}
function renderChessBoard() {

    let html = '';
    for (let row = 8; row > 0; row--) {

        for (let col = 1; col < 9; col++) {
            const char = String.fromCharCode(64 + col)
            const position = row + char
            html += model.data.squarePositions[position].element;
        }
    }
    return html
}


function initializeBoard() {
    model.data.squarePositions['1A'].piece = 'white rook';
    model.data.squarePositions['1B'].piece = 'white knight';
    model.data.squarePositions['1C'].piece = 'white bishop';
    model.data.squarePositions['1D'].piece = 'white queen';
    model.data.squarePositions['1E'].piece = 'white king';
    model.data.squarePositions['1F'].piece = 'white bishop';
    model.data.squarePositions['1G'].piece = 'white knight';
    model.data.squarePositions['1H'].piece = 'white rook';

    model.data.squarePositions['8A'].piece = 'black rook';
    model.data.squarePositions['8B'].piece = 'black knight';
    model.data.squarePositions['8C'].piece = 'black bishop';
    model.data.squarePositions['8D'].piece = 'black queen';
    model.data.squarePositions['8E'].piece = 'black king';
    model.data.squarePositions['8F'].piece = 'black bishop';
    model.data.squarePositions['8G'].piece = 'black knight';
    model.data.squarePositions['8H'].piece = 'black rook';

    model.data.squarePositions['2A'].piece = 'white pawn';
    model.data.squarePositions['2B'].piece = 'white pawn';
    model.data.squarePositions['2C'].piece = 'white pawn';
    model.data.squarePositions['2D'].piece = 'white pawn';
    model.data.squarePositions['2E'].piece = 'white pawn';
    model.data.squarePositions['2F'].piece = 'white pawn';
    model.data.squarePositions['2G'].piece = 'white pawn';
    model.data.squarePositions['2H'].piece = 'white pawn';

    model.data.squarePositions['7A'].piece = 'black pawn';
    model.data.squarePositions['7B'].piece = 'black pawn';
    model.data.squarePositions['7C'].piece = 'black pawn';
    model.data.squarePositions['7D'].piece = 'black pawn';
    model.data.squarePositions['7E'].piece = 'black pawn';
    model.data.squarePositions['7F'].piece = 'black pawn';
    model.data.squarePositions['7G'].piece = 'black pawn';
    model.data.squarePositions['7H'].piece = 'black pawn';

    updatePieceImages();
}

function updatePieceImages() {
    for (let position in model.data.squarePositions) {
        const square = model.data.squarePositions[position];
        let imgSrc = '';
        if (square.piece) {
            const color = square.piece.split(' ')[0]
            const pieceName = square.piece
            const whatPiece = model.data.pieces[color].find(p => p.name === pieceName)

            if (whatPiece) {
                imgSrc = whatPiece.src
                console.log(imgSrc)
            }

        }
        square.element = `<div onclick="selectSquare(${square.numberValue}, '${square.letterValue}')"
            class="${(square.numberValue + square.letterValue.charCodeAt(0) - 64) % 2 ? 'light-square' : 'dark-square'}">
            <img src="${imgSrc}">
            </div>`
    }
    updateView()
}




function selectSquare(row, char) {
    const whatSquare = row + char;

    if (model.data.squarePositions[whatSquare].piece !== '') {
        const whatPiece = model.data.squarePositions[whatSquare].piece;
        if (whatPiece === 'white pawn') {
            movePawn(whatSquare);
            return
        }
    } else {
        model.data.squarePositions[whatSquare].piece = model.input.currentMovingPiece;
        updatePieceImages();
        model.input.currentMovingPiece = '';
    }
}

function movePawn(whatSquare) {
    model.input.currentMovingPiece = model.data.squarePositions[whatSquare].piece
    model.data.squarePositions[whatSquare].piece = '';
    console.log(model.currentMovingPiece)


}