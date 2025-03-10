function canMoveDiagonally(row, column, maxDistance = 7, whatPiece, whatSquare) {

    const moves = model.input.currentlyAvailableMoves
    moves.diagonally = []
    const OriginalPiece = model.data.squarePositions[whatSquare].piece

    const opponentColor = model.input.currentRound % 2 === 1 ? 'white' : 'black'
    console.log(opponentColor)

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
    moves.anyMoves = moves.diagonally.length > 0;
    return moves.anyMoves;
}

function canMoveOrthogonally(row, column, maxDistance = 7, whatPiece, whatSquare) {

    const moves = model.input.currentlyAvailableMoves
    moves.orthogonally = []

    const opponentColor = model.input.currentRound % 2 === 1 ? 'white' : 'black'
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
                console.log(attackPerDirection)
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
    moves.anyMoves = moves.orthogonally.length > 0;
    return moves.anyMoves
}
function canMovePawn(row, column, maxDistance = 2, whatPiece, whatSquare) {

    const moves = model.input.currentlyAvailableMoves
    moves.pawnMove = []

    const opponentColor = model.input.currentRound % 2 === 1 ? 'white' : 'black'
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
                    moves.pawnMove.push(position);
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
                    moves.pawnMove.push(position);
                }
            }
        }
    }
    model.data.squarePositions[whatSquare].piece = OriginalPiece

    for (const move of moves.pawnMove) {
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
    moves.anyMoves = moves.pawnMove.length > 0
    return moves.anyMoves
}

function canMoveKnight(row, column, maxDistance = 1, whatPiece, whatSquare,) {

    const moves = model.input.currentlyAvailableMoves
    moves.knightMoves = [];

    const opponentColor = model.input.currentRound % 2 === 1 ? 'white' : 'black'
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
    moves.anyMoves = moves.knightMoves.length > 0
    return moves.anyMoves
}

function findKings() {
    const whiteKingPosition = findKingByColor('white');
    const blackKingPosition = findKingByColor('black');
    if (!whiteKingPosition || !blackKingPosition) {
        console.log(model.input.currentRound % 2 === 0 ? 'white' : 'white' + ' has won')
    }

    return {
        white: whiteKingPosition,
        black: blackKingPosition
    };
}

function findKingByColor(color) {
    for (const position in model.data.squarePositions) {
        if (model.data.squarePositions[position].piece === `${color} king`) {
            return position;
        }
    }
    return null;
}



