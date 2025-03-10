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
            const column = String.fromCharCode(64 + col)
            const position = row + column;
            const colHtml = (row + col) % 2 ? 'light-square' : 'dark-square';

            model.data.squarePositions[position] =
            {
                currentRow: row,
                currentColumn: column,
                piece: '',
                element: `<div onclick="selectSquare(${row}, '${column}')" class="${colHtml}"><img src""></div>`,
            }
        }
    }
}
function renderChessBoard() {

    let html = '';
    for (let row = 8; row > 0; row--) {

        for (let col = 1; col < 9; col++) {
            const column = String.fromCharCode(64 + col)
            const position = row + column
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

    updatePositionsOfPieces();
}

function updatePositionsOfPieces() {
    for (let position in model.data.squarePositions) {
        const square = model.data.squarePositions[position];
        let imgSrc = '';
        if (square.piece) {
            const color = square.piece.split(' ')[0]
            const pieceName = square.piece
            const whatPiece = model.data.pieces[color].find(p => p.name === pieceName)

            if (whatPiece) {
                imgSrc = whatPiece.src;
            }
        }
        square.element = `<div onclick="${square.piece ? `selectPiece(${square.currentRow}, '${square.currentColumn}')` :
            `selectSquare(${square.currentRow}, '${square.currentColumn}')`}"
            class="${(square.currentRow + square.currentColumn.charCodeAt(0) - 64) % 2 ? 'light-square' : 'dark-square'} " >
            <div id="square_${(square.currentRow + square.currentColumn)}"></div>
            <img src="${imgSrc}">
            </div>`
    }
    updateView()
}