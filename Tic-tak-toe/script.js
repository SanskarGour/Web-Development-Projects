const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPosition = [
    [ 0, 1, 2],
    [ 3, 4, 5],
    [ 6, 7, 8],
    [ 0, 3, 6],
    [ 1, 4, 7],
    [ 2, 5, 8],
    [ 0, 4, 8],
    [ 2, 4, 6]
];

//initialising game
function initGame(){
    currentPlayer = 'X';
    gameGrid = ['','','','','','','','',''];

    //UI emptying
    boxes.forEach((box,index) => {
        box.textContent = '';
        boxes[index].style.pointerEvents = 'all';
        //initialising box with css properties again
        box.classList = `box box${index+1}`;
        //OR
        // box.classList.remove('win');
    });

    newGameBtn.classList.remove('active');
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

initGame();

//adding event listener for every box of boxes
boxes.forEach((box, index) =>{
    box.addEventListener('click' , () => {
        handleClick(index);
    });
});

function handleClick(index){
    //if box is empty (unclickable condition)
    if(gameGrid[index] === ''){
        //change on UI
        boxes[index].textContent = currentPlayer;
        //change in grid
        gameGrid[index] = currentPlayer;
        //removing pointer
        boxes[index].style.pointerEvents = 'none';
        //swap trun
        swapTurn();
        //check if anyone won;
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === 'X') currentPlayer = 'O';
    else currentPlayer = 'X';

    //updating on UI
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener('click' , () => initGame());

function checkGameOver(){
    let ans = '';

    winningPosition.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        //we used or bcoz is it is non-empty and we are comparing it to the other two that means the other two should also contain a non-empty and equal value;
        if((gameGrid[position[0]] !== '' || gameGrid[position[1]] !== '' ||gameGrid[position[2]] !== '') 
        && ((gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))){

            //check if winner is 'X' or 'O'
            if(gameGrid[position[0]] === 'X') ans = 'X';
            else ans = 'O';

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            });

            //now we know X/O is a winner
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    });
    
    //it means we have a winner
    if(ans != ''){
        gameInfo.textContent = `${ans} - Won the Game!`;
        newGameBtn.classList.add('active');
        //if winner found - no next move posible so we return
        return;
    }

    //check tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== '')
            fillCount++;
    });

    //game tied msg
    if(fillCount === 9){
        gameInfo.textContent = `GAME TIED!`;
        newGameBtn.classList.add('active');
    }
    
}
