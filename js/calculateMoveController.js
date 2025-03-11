function canMoveDiagonally(row, column, maxDistance = 7, whatPiece, whatSquare, opponentColor) {

    const moves = model.input.currentlyAvailableMoves
    moves.diagonally = []
    const OriginalPiece = model.data.squarePositions[whatSquare].piece

    model.data.squarePositions[whatSquare].piece = '';
    const directions = [
        { rowDelta: -1, columnDelta: 1 },// down-right
        { rowDelta: -1, columnDelta: -1 }, //down-left
        { rowDelta: 1, columnDelta: 1 },//up-right
        { rowDelta: 1, columnDelta: -1 }, // up-left
    ]

    for (const dir of directions) {
        let attackPerDirection = 0;
        for (let i = 1; i <= maxDistance; i++) {
            const newRow = row + (dir.rowDelta * i);
            const newColumn = String.fromCharCode(column.charCodeAt(0) + (dir.columnDelta * i));
            //check if the position is on the board
            if (newRow >= 1 && newRow <= 8 && newColumn >= 'A' && newColumn <= 'H') {
                const position = newRow + newColumn;
                if (model.data.squarePositions[position].piece.split(' ')[0] === opponentColor) {
                    if (attackPerDirection >= 1) {
                        break;
                    }
                    moves.diagonally.push(position);
                    attackPerDirection++;
                } else if (!model.data.squarePositions[position].piece) {
                    if (attackPerDirection >= 1) {
                        break;
                    }
                    moves.diagonally.push(position);
                } else {
                    break;
                }
                //square is not on board
            } else {
                break;
            }
        }
    }
    model.data.squarePositions[whatSquare].piece = OriginalPiece

    if (!model.input.checkingIfKingIsInDanger) {
        for (const move of moves.diagonally) {
            const element = document.querySelector(`#square_${move}`);
            if (model.data.squarePositions[move].piece.split(' ')[0] === opponentColor) {
                if (element) {
                    element.classList.add('available-move-attack');
                }
            }
            if (element) {
                element.classList.add('available-move');
            }
        }
    }
    moves.anyMoves = moves.diagonally.length > 0;
    return moves.anyMoves;
}

function canMoveOrthogonally(row, column, maxDistance = 7, whatPiece, whatSquare, opponentColor) {

    const moves = model.input.currentlyAvailableMoves
    moves.orthogonally = []
    const OriginalPiece = model.data.squarePositions[whatSquare].piece
    model.data.squarePositions[whatSquare].piece = '';

    const directions = [
        { rowDelta: -1, columnDelta: 0 },
        { rowDelta: 0, columnDelta: -1 },
        { rowDelta: 1, columnDelta: 0 },
        { rowDelta: 0, columnDelta: 1 },
    ]
    for (const dir of directions) {
        let attackPerDirection = 0;
        for (let i = 1; i <= maxDistance; i++) {
            const newRow = row + (dir.rowDelta * i)
            const newColumn = String.fromCharCode(column.charCodeAt(0) + (dir.columnDelta * i));

            if (newRow >= 1 && newRow <= 8 && newColumn >= "A" && newColumn <= "H") {
                const position = newRow + newColumn;
                if (model.data.squarePositions[position].piece.split(' ')[0] === opponentColor) {
                    if (attackPerDirection >= 1) {
                        break;
                    }
                    moves.orthogonally.push(position);
                    attackPerDirection++
                } else if (!model.data.squarePositions[position].piece) {
                    if (attackPerDirection >= 1) {
                        break;
                    }
                    moves.orthogonally.push(position);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }
    model.data.squarePositions[whatSquare].piece = OriginalPiece

    if (!model.input.checkingIfKingIsInDanger) {
        for (const move of moves.orthogonally) {
            const element = document.querySelector(`#square_${move}`)
            if (model.data.squarePositions[move].piece.split(' ')[0] === opponentColor) {
                if (element) {
                    element.classList.add('available-move-attack');
                }
            }
            if (element) {
                element.classList.add('available-move')
            }
        }
    }
    moves.anyMoves = moves.orthogonally.length > 0;
    return moves.anyMoves
}
function canMovePawn(row, column, maxDistance = 2, whatPiece, whatSquare, opponentColor) {

    const moves = model.input.currentlyAvailableMoves
    moves.pawnMoves = []

    const OriginalPiece = model.data.squarePositions[whatSquare].piece
    model.data.squarePositions[whatSquare].piece = '';
    let directions = []
    let attackDirection = []

    if (whatPiece[0] == 'black') {
        directions = [
            { rowDelta: -1, columnDelta: 0 },
        ]
        attackDirection = [
            { rowDeltaAttack: -1, columnDeltaAttack: -1 },
            { rowDeltaAttack: -1, columnDeltaAttack: 1 },
        ]
    } else {
        directions = [
            { rowDelta: 1, columnDelta: 0 },
        ]
        attackDirection = [
            { rowDeltaAttack: 1, columnDeltaAttack: -1 },
            { rowDeltaAttack: 1, columnDeltaAttack: 1 },
        ]
    }
    for (const dir of directions) {
        for (let i = 1; i <= maxDistance; i++) {
            const newRow = row + (dir.rowDelta * i)
            const newColumn = String.fromCharCode(column.charCodeAt(0) + (dir.columnDelta * i));

            if (newRow >= 1 && newRow <= 8 && newColumn >= "A" && newColumn <= "H") {
                const position = newRow + newColumn;

                if (!model.data.squarePositions[position].piece) {
                    moves.pawnMoves.push(position);

                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }
    for (const dir of attackDirection) {
        for (let i = 0; i <= 2; i++) {
            const newRow = row + (dir.rowDeltaAttack)
            const newColumn = String.fromCharCode(column.charCodeAt(0) + (dir.columnDeltaAttack));
            if (newRow >= 1 && newRow <= 8 && newColumn >= "A" && newColumn <= "H") {
                const position = newRow + newColumn;
                if (model.data.squarePositions[position].piece.split(' ')[0] === opponentColor) {
                    moves.pawnMoves.push(position);
                }
            }
        }
    }
    model.data.squarePositions[whatSquare].piece = OriginalPiece

    if (!model.input.checkingIfKingIsInDanger) {
        for (const move of moves.pawnMoves) {
            const element = document.querySelector(`#square_${move}`)
            if (model.data.squarePositions[move].piece.split(' ')[0] === opponentColor) {
                if (element) {
                    element.classList.add('available-move-attack');
                }
            }
            if (element) {
                element.classList.add('available-move')
            }
        }
    }
    moves.anyMoves = moves.pawnMoves.length > 0
    return moves.anyMoves
}

function canMoveKnight(row, column, maxDistance = 1, whatPiece, whatSquare, opponentColor) {

    const moves = model.input.currentlyAvailableMoves
    moves.knightMoves = [];

    const OriginalPiece = model.data.squarePositions[whatSquare].piece
    model.data.squarePositions[whatSquare].piece = '';

    const directions = [
        { rowDelta: -2, columnDelta: -1 },
        { rowDelta: -2, columnDelta: 1 },
        { rowDelta: 2, columnDelta: -1 },
        { rowDelta: 2, columnDelta: 1 },
        { rowDelta: 1, columnDelta: -2 },
        { rowDelta: 1, columnDelta: 2 },
        { rowDelta: -1, columnDelta: -2 },
        { rowDelta: -1, columnDelta: 2 },
    ]
    for (const dir of directions) {
        const newRow = row + dir.rowDelta
        const newColumn = String.fromCharCode(column.charCodeAt(0) + dir.columnDelta);

        if (newRow >= 1 && newRow <= 8 && newColumn >= "A" && newColumn <= "H") {
            const position = newRow + newColumn;
            if (model.data.squarePositions[position].piece.split(' ')[0] === opponentColor) {
                moves.knightMoves.push(position);
            }
            if (whatPiece[0] != model.data.squarePositions[position].piece.split(' ')[0]) {
                moves.knightMoves.push(position);
            }
        }
    }
    model.data.squarePositions[whatSquare].piece = OriginalPiece;

    if (!model.input.checkingIfKingIsInDanger) {
        for (const move of moves.knightMoves) {
            const element = document.querySelector(`#square_${move}`)
            if (model.data.squarePositions[move].piece.split(' ')[0] === opponentColor) {
                if (element) {
                    element.classList.add('available-move-attack');
                }
            }
            if (element) {
                element.classList.add('available-move')
            }
        }
    }
    moves.anyMoves = moves.knightMoves.length > 0
    return moves.anyMoves
}





