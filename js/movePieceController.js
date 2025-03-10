function isCurrentPlayerPiece(piece) {
    const currentPlayer = model.input.currentRound % 2 === 0 ? 'white' : 'black';
    return piece.split(' ')[0] === currentPlayer;
}


function selectSquare(row, column) {
    if (model.input.currentlyAvailableMoves.anyMoves) {
        movePieceToNewPosition(row, column);
    } else {
        if (model.input.currentMovingPiece.piece) {
            const oldSquare = model.input.currentMovingPiece.currentRow + model.input.currentMovingPiece.currentColumn;
            model.data.squarePositions[oldSquare].piece = model.input.currentMovingPiece.piece;

            model.input.currentMovingPiece.piece = {
                piece: '',
                currentColumn: null,
                currentRow: null,
            };
            updatePositionsOfPieces();
        }
    }
}

function selectPiece(row, column) {
    const whatSquare = row + column;
    const whatPiece = model.data.squarePositions[whatSquare].piece.split(' ');
    // Can the user capture
    if (model.input.currentlyAvailableMoves.anyMoves == true && whatPiece[0] != model.input.currentMovingPiece.piece.split(' ')[0]) {

        movePieceToNewPosition(row, column);
    }

    if (!isCurrentPlayerPiece(model.data.squarePositions[whatSquare].piece)) {
        return
    }
    // If there's already a piece selected
    clearAvailableMoveClasses();
    if (model.input.currentMovingPiece.piece.split(' ')[0] === whatPiece[0]) {
        const oldSquare = model.input.currentMovingPiece.currentRow + model.input.currentMovingPiece.currentColumn;

        model.data.squarePositions[oldSquare].piece = model.input.currentMovingPiece.piece;

        if (oldSquare === whatSquare) {
            model.data.squarePositions[oldSquare].piece = model.input.currentMovingPiece.piece;

            model.input.currentMovingPiece = {
                piece: '',
                currentColumn: null,
                currentRow: null,
            };
            model.input.currentlyAvailableMoves = {
                anyMoves: false,
                diagonally: [],
                orthogonally: [],
                pawnMove: [],
                knightMoves: [],
            };
            updatePositionsOfPieces();
            return;
        }
        model.data.squarePositions[oldSquare].piece = model.input.currentMovingPiece.piece
        updatePositionsOfPieces();
    }
    model.input.currentMovingPiece = {
        piece: model.data.squarePositions[whatSquare].piece,
        currentColumn: column,
        currentRow: row
    };
    currentlySelectedPiece(row, column, whatSquare, whatPiece);
}

function currentlySelectedPiece(row, column, whatSquare, whatPiece) {
    model.input.currentlyAvailableMoves = {
        anyMoves: false,
        diagonally: [],
        orthogonally: [],
        pawnMove: [],
        knightMoves: [],
    };
    hasMoves = false;

    switch (whatPiece[1]) {
        case 'bishop':
            hasMoves = canMoveDiagonally(row, column, 7, whatPiece, whatSquare);
            break;
        case 'pawn':
            if (model.input.currentRound <= 1) {
                hasMoves = canMovePawn(row, column, 2, whatPiece, whatSquare);
                break;
            } else {
                hasMoves = canMovePawn(row, column, 1, whatPiece, whatSquare)
                break;
            }
        case 'queen':
            const queenOrthogonallyMoves = canMoveOrthogonally(row, column, 7, whatPiece, whatSquare);
            const queenDiagonallyMoves = canMoveDiagonally(row, column, 7, whatPiece, whatSquare);
            hasMoves = queenOrthogonallyMoves || queenDiagonallyMoves;
            break;
        case 'king':
            const kingOrthogonallyMoves = canMoveOrthogonally(row, column, 1, whatPiece, whatSquare);
            const kingDiagonallyMoves = canMoveDiagonally(row, column, 1, whatPiece, whatSquare);
            hasMoves = kingOrthogonallyMoves || kingDiagonallyMoves;
            break;
        case 'rook':
            hasMoves = canMoveOrthogonally(row, column, 7, whatPiece, whatSquare);
            break;
        case 'knight':
            hasMoves = canMoveKnight(row, column, 1, whatPiece, whatSquare);
            break;
    }
    model.input.currentlyAvailableMoves.anyMoves = hasMoves;
    return hasMoves
}
function movePieceToNewPosition(row, column) {
    const newSquare = (row + column);
    const newMove = model.input.currentlyAvailableMoves
    if (newMove.orthogonally.includes(newSquare) ||
        newMove.diagonally.includes(newSquare) ||
        newMove.knightMoves.includes(newSquare) ||
        newMove.pawnMove.includes(newSquare)) {
        model.input.currentRound++;
        const oldPosition = model.input.currentMovingPiece.currentRow + model.input.currentMovingPiece.currentColumn;
        model.data.squarePositions[oldPosition].piece = '';
        model.data.squarePositions[newSquare].piece = model.input.currentMovingPiece.piece

        clearAvailableMoveClasses();

        updatePositionsOfPieces();
        model.input.currentMovingPiece = {
            piece: '',
            currentColumn: null,
            currentRow: null,
        }
        model.input.currentlyAvailableMoves = {
            anyMoves: false,
            diagonally: [],
            orthogonally: [],
            pawnMove: [],
            knightMoves: [],
        }
    }
}

function clearAvailableMoveClasses() {
    const availableMoves = document.querySelectorAll('.available-move');
    availableMoves.forEach(move => {
        move.classList.remove('available-move');
        move.classList.remove('available-move-attack')
    });
    updatePositionsOfPieces();
}
