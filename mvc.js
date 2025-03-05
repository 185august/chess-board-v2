// model
const model = {
    data: {
        pieces: {
            white: {
                icons: ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜', '♟'],
            }
            ,
            black: {
                icons: ['♜', '♞', '♝', '♚', '♛', '♝', '♞', '♜', '♟'],
            }
        }
    },
    input: {
        middlePart: []
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
    for (let row = 0; row < 8; row++) {
        let rowHtml = '';
        for (let col = 0; col < 8; col++) {
            const colHtml = (row + col) % 2 ? 'lightSquare' : 'darkSquare'
            rowHtml += `<div class="${colHtml}">${placePices(row, col)}</div>`

        }
        boardHtml += rowHtml

    }
    return boardHtml
}

function placePices(row, col) {
    const whitePiecesRow = 0;
    const whitePawnRow = 1;

    const blackPiecesRow = 7;
    const blackPawnRow = 6

    if (row == whitePawnRow) return model.data.pieces.white.icons[8]
    if (row == blackPawnRow) return model.data.pieces.black.icons[8]

    if (row == whitePiecesRow) return model.data.pieces.white.icons[col]
    if (row == blackPiecesRow) return model.data.pieces.black.icons[col]
    else {
        return ''
    }
}