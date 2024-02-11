const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");

const width = 8;

let playerGo = 'black';
playerDisplay.textContent = 'black';

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook

]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startPiece;
        square.firstChild && square.firstChild.setAttribute('draggable', true);
        square.setAttribute('square-id', i);
       // square.classList.add('beige')
       const row = Math.floor(i / width);
       const col = i % width;
       square.classList.add((row + col) % 2 === 0 ? "beige" : "brown");

        if(i <= 15){
            square.firstChild.classList.add('black')
            
        }
        if(i >= 48){
            square.firstChild.classList.add('white');
        }
        gameBoard.append(square)
    });
}

createBoard()

let startPositionId;
let draggedElement;

const allSquares = document.querySelectorAll(".square");
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);

});

function dragStart(e){
    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
}

function dragOver (e) {
    e.preventDefault();
}

function dragDrop(e){
    e.stopPropagation();
    const correctGo = draggedElement.classList.contains(playerGo);
    const taken = e.target.classList.contains('piece');
    const valid = checkIfValid(e.target);
    const opponentGo = playerGo === 'black' ? 'white' : 'black';
    const takenByOpponent = e.target?.classList.contains(opponentGo);

    if(correctGo){
        console.log(takenByOpponent);
        console.log(valid);
        console.log('target' , e.target);
        console.log(e.target?.classList.contains(opponentGo));
        console.log(e.target.firstChild?.classList);
        console.log(takenByOpponent);
        if(takenByOpponent && valid){
            console.log('works');
            e.target.append(draggedElement);
            e.target.firstChild.remove();
            console.log(e.target);
            changePlayer();
            return;
        }
        if(taken && !takenByOpponent){
            infoDisplay.textContent = "You cannot go here!";
            setTimeout(() => infoDisplay.textContent = "", 2000 )
            return
        }
        if(valid){
            e.target.append(draggedElement)
            changePlayer();
            return;

        }
    }

    
}

   
function checkIfValid(target){
    console.log(target);
    const targetId = Number(target.getAttribute('square-id'))
                    || Number(target.parentNode.getAttribute('square-id'));

    const starterId = Number(startPositionId);
    const piece = draggedElement.id;
    // console.log('targertid',targetId);
    // console.log('startid', starterId);
    // console.log('piece', piece);

    switch(piece){
        case 'pawn' :
            const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
            if(starterRow.includes(starterId) && starterId + width * 2 === targetId ||
                starterId + width === targetId ||
                starterId + width - 1 === targetId && document.querySelector(`[square-id="${starterId + width - 1}"]`).firstChild ||
                starterId + width + 1 === targetId && document.querySelector(`[square-id="${starterId + width + 1}"]`).firstChild
                ){
                return true;
            }
            break;
        case 'knight' :
            if(
                starterId + width * 2 + 1 === targetId ||
                starterId + width * 2 - 1 === targetId ||
                starterId + width - 2 === targetId ||
                starterId + width + 2 === targetId ||
                starterId - width * 2 + 1 === targetId ||
                starterId - width * 2 - 1 === targetId ||
                starterId - width - 2 === targetId ||
                starterId - width + 2 === targetId 

            ){
                return true;
            }
            break;

    }
    
}




function changePlayer() {

    if(playerGo === "black"){
        reverseId();
        playerGo = "white";
        playerDisplay.textContent = 'white';
    }else {
        revertIds();
        playerGo = "black";
        playerDisplay.textContent = 'black';
    }
    
   
}

function reverseId() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => square.setAttribute('square-id', (width * width - 1) - i)
)}

function revertIds() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => square.setAttribute('square-id', i));
}






