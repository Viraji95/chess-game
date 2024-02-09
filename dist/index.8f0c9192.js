const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;
let playerGo = "black";
playerDisplay.textContent = "black";
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
        square.firstChild && square.firstChild.setAttribute("draggable", true);
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
let startPositionId;
let draggedElement;
const allSquares = document.querySelectorAll(".square");
allSquares.forEach((square)=>{
    square.addEventListener("dragstart", dragStart);
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", dragDrop);
});
function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute("squre-id");
    draggedElement = e.target;
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop(e) {
    e.stopPropagation();
    const taken = e.target.classList.contains("piece");
    // e.target.parentNode.append(draggedElement);
    // e.target.remove();
    //e.target.append(draggedElement);
    changePlayer();
}
function changePlayer() {
    if (playerGo === "black") {
        reverseId();
        playerGo = "white";
        playerGo.textContent = "white";
    } else {
        revertIds();
        playerGo = "black";
        playerDisplay.textContent = "black";
    }
}
function reverseId() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i)=>square.setAttribute("square-id", width * width - 1 - i));
}
function revertIds() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i)=>square.setAttribute("square-id", i));
}

//# sourceMappingURL=index.8f0c9192.js.map
