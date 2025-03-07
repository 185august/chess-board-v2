function moveKnightCalculation(row, column, whatSquare) {
    const currentPiece = model.input.currentMovingPiece
    if (row === currentPiece.currentRow + 2 ||
        row === currentPiece.currentRow - 2) {
        if (currentPiece.currentColumn.charCodeAt(0) === column.charCodeAt(0) - 1 ||
            currentPiece.currentColumn.charCodeAt(0) === column.charCodeAt(0) + 1) {
            model.data.squarePositions[whatSquare].piece = currentPiece.piece;
            updatePositionsOfPieces();
            currentPiece.piece = '';
        }
    }

    if (row === currentPiece.currentRow + 1 ||
        row === currentPiece.currentRow - 1) {
        if (currentPiece.currentColumn.charCodeAt(0) === column.charCodeAt(0) - 2 ||
            currentPiece.currentColumn.charCodeAt(0) === column.charCodeAt(0) + 2) {
            model.data.squarePositions[whatSquare].piece = currentPiece.piece;
            updatePositionsOfPieces();
            currentPiece.piece = '';
        }
    }
}
function pawnCalculations(row, column, whatSquare) {
    const currentPiece = model.input.currentMovingPiece
    if (currentPiece.piece === 'white pawn') {
        if (column === currentPiece.currentColumn && row === (currentPiece.currentRow + 1)) {
            console.log('does canYouMovePiece run')
            model.data.squarePositions[whatSquare].piece = currentPiece.piece;
            updatePositionsOfPieces();
            currentPiece.piece = '';
        }
    }
    if (currentPiece.piece === 'black pawn') {
        if (column === currentPiece.currentColumn && row === (currentPiece.currentRow - 1)) {
            console.log('does canYouMovePiece run')
            model.data.squarePositions[whatSquare].piece = currentPiece.piece;
            updatePositionsOfPieces();
            currentPiece.piece = '';
        }
    }

}


