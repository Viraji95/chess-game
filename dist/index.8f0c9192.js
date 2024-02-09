const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;
const startPieces = [
    rook,
    knight,
    bishop,
    queen,
    king,
    bishop,
    knight,
    rook,
    pawn,
    pawn,
    pawn,
    pawn,
    pawn,
    pawn,
    pawn,
    pawn,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    pawn,
    pawn,
    pawn,
    pawn,
    pawn,
    pawn,
    pawn,
    pawn,
    rook,
    knight,
    bishop,
    queen,
    king,
    bishop,
    knight,
    rook
];
function createBoard() {
    startPieces.forEach((startPiece, i)=>{
        const square = document.createElement("div");
        square.classList.add("square");
        square.innerHTML = startPiece;
        square.setAttribute("square-id", i);
        // square.classList.add('beige')
        const row = Math.floor(i / width);
        const col = i % width;
        square.classList.add((row + col) % 2 === 0 ? "beige" : "brown");
        if (i <= 15) square.firstChild.classList.add("black");
        if (i >= 48) square.firstChild.classList.add("white");
        gameBoard.append(square);
    });
}
createBoard();

//# sourceMappingURL=index.8f0c9192.js.map
