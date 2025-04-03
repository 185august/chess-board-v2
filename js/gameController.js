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
    const opponentColor = model.input.currentRound % 2 === 1 ? 'white' : 'black'

    switch (whatPiece[1]) {
        case 'bishop':
            hasMoves = canMoveDiagonally(row, column, 7, whatPiece, whatSquare, opponentColor);
            break;
        case 'pawn':
            if (model.input.currentRound <= 1) {
                hasMoves = canMovePawn(row, column, 2, whatPiece, whatSquare, opponentColor);
                break;
            } else {
                hasMoves = canMovePawn(row, column, 1, whatPiece, whatSquare, opponentColor)
                break;
            }
        case 'queen':
            const queenOrthogonallyMoves = canMoveOrthogonally(row, column, 7, whatPiece, whatSquare, opponentColor);
            const queenDiagonallyMoves = canMoveDiagonally(row, column, 7, whatPiece, whatSquare, opponentColor);
            hasMoves = queenOrthogonallyMoves || queenDiagonallyMoves;
            break;
        case 'king':
            const kingOrthogonallyMoves = canMoveOrthogonally(row, column, 1, whatPiece, whatSquare, opponentColor);
            const kingDiagonallyMoves = canMoveDiagonally(row, column, 1, whatPiece, whatSquare, opponentColor);
            hasMoves = kingOrthogonallyMoves || kingDiagonallyMoves;
            break;
        case 'rook':
            hasMoves = canMoveOrthogonally(row, column, 7, whatPiece, whatSquare, opponentColor);
            break;
        case 'knight':
            hasMoves = canMoveKnight(row, column, 1, whatPiece, whatSquare, opponentColor);
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
        newMove.pawnMoves.includes(newSquare)) {

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
        };
        if (isTheKingInDanger()) {
            model.input.gameText = 'The ' + (model.input.currentRound % 2 === 0 ? 'white' : 'black') + ' king is in danger'
            updateView();
        } else {
            model.input.gameText = null
            updateView();
        }
        findKings();

    }
}
function findKingByColor(color) {
    for (const position in model.data.squarePositions) {
        if (model.data.squarePositions[position].piece === `${color} king`) {
            return position;
        }
    }
    return null;
}

function findKings() {
    const whiteKingPosition = findKingByColor('white');
    const blackKingPosition = findKingByColor('black');

    if (!whiteKingPosition || !blackKingPosition) {
        model.input.gameText = (!whiteKingPosition ? 'black has won' : 'white has won')
        updateView();
    }

    return {
        white: whiteKingPosition,
        black: blackKingPosition
    };
}

function isTheKingInDanger() {
    model.input.checkingIfKingIsInDanger = true;
    const currentPlayerColor = model.input.currentRound % 2 === 0 ? 'white' : 'black'
    const opponentColor = currentPlayerColor === 'white' ? 'black' : 'white';

    const kingPosition = findKingByColor(currentPlayerColor)

    if (!kingPosition) {
        model.input.checkingIfKingIsInDanger = false;
        return false
    }
    const kingRow = parseInt(kingPosition.charAt(0))
    const kingColumn = kingPosition.charAt(1)

    const currentMoves = { ...model.input.currentlyAvailableMoves }
    const savedPiece = { ...model.input.currentMovingPiece }

    model.input.currentlyAvailableMoves = {
        anyMoves: false,
        diagonally: [],
        orthogonally: [],
        pawnMoves: [],
        knightMoves: []
    };
    const isInDanger = checkIfAnyPieceCanCapture(kingRow, kingColumn, kingPosition, opponentColor, currentPlayerColor)

    if (isInDanger) {
        console.log('the king is in danger')

    } else {
        console.log('the king is not in danger')
    }
    model.input.currentlyAvailableMoves = currentMoves;
    model.input.currentMovingPiece = savedPiece;
    model.input.checkingIfKingIsInDanger = false;
    return isInDanger
}

function checkIfAnyPieceCanCapture(kingRow, kingColumn, kingPosition, opponentColor, currentPlayerColor) {
    for (const position in model.data.squarePositions) {
        const sqaure = model.data.squarePositions[position]
        if (!sqaure.piece || sqaure.piece.split(' ')[0] === currentPlayerColor) continue;

        const pieceType = sqaure.piece.split(' ')[1];
        const pieceRow = sqaure.currentRow;
        const pieceColumn = sqaure.currentColumn;
        let anyCaptureMoves = false;
        switch (pieceType) {
            case 'bishop':
                anyCaptureMoves = canMoveDiagonally(pieceRow, pieceColumn, 7, sqaure.piece.split(' '), position, currentPlayerColor);
                break;
            case 'pawn':
                if (model.input.currentRound <= 1) {
                    anyCaptureMoves = canMovePawn(pieceRow, pieceColumn, 2, sqaure.piece.split(' '), position, currentPlayerColor);
                    break;
                } else {
                    anyCaptureMoves = canMovePawn(pieceRow, pieceColumn, 1, sqaure.piece.split(' '), position, currentPlayerColor)
                    break;
                }
            case 'queen':
                const queenOrthogonallyMoves = canMoveOrthogonally(pieceRow, pieceColumn, 7, sqaure.piece.split(' '), position, currentPlayerColor);
                const queenDiagonallyMoves = canMoveDiagonally(pieceRow, pieceColumn, 7, sqaure.piece.split(' '), position, currentPlayerColor);
                anyCaptureMoves = queenOrthogonallyMoves || queenDiagonallyMoves;
                break;
            case 'king':
                const kingOrthogonallyMoves = canMoveOrthogonally(pieceRow, pieceColumn, 1, sqaure.piece.split(' '), position, currentPlayerColor);
                const kingDiagonallyMoves = canMoveDiagonally(pieceRow, pieceColumn, 1, sqaure.piece.split(' '), position, currentPlayerColor);
                anyCaptureMoves = kingOrthogonallyMoves || kingDiagonallyMoves;
                break;
            case 'rook':
                anyCaptureMoves = canMoveOrthogonally(pieceRow, pieceColumn, 7, sqaure.piece.split(' '), position, currentPlayerColor);
                break;
            case 'knight':
                anyCaptureMoves = canMoveKnight(pieceRow, pieceColumn, 1, sqaure.piece.split(' '), position, currentPlayerColor);
                break;
        }
        if (anyCaptureMoves) {
            const moves = model.input.currentlyAvailableMoves
            if (
                moves.diagonally.includes(kingPosition) ||
                moves.orthogonally.includes(kingPosition) ||
                moves.knightMoves.includes(kingPosition) ||
                moves.pawnMoves.includes(kingPosition)) {
                updateView();
                return true;
            }
        }
    }
    updateView();
    return false;

}

function clearAvailableMoveClasses() {
    const availableMoves = document.querySelectorAll('.available-move');
    availableMoves.forEach(move => {
        move.classList.remove('available-move');
        move.classList.remove('available-move-attack')
    });
    updatePositionsOfPieces();
}