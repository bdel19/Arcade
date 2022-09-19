// ******************** state ********************
let state;
const boardElem = document.getElementById('board');
const playerTurnElem = document.querySelector("#player-turn");
const resetButtonElement = document.querySelector("#restartButton");

function buildInitialState() {
  state = {
    players: "X",
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }
  state.winner=null;
  state.currentPlayer = ["",""]
  state.currentPlayerIdx = 0;
  state.getCurrentPlayer = function (){
    return state.currentPlayer[state.currentPlayerIdx];
  };

  

  
}
let options = ["", "", "", "", "", "", "", "", ""]

function checkWin(){
  const winConditions=[
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
  ];
let winner;

  for(let i = 0; i < winConditions.length; i++){
    let winElem = winConditions[i];
    let winObj = {X:0, O:0};
    for(let j =0; j<winElem.length; j++){      
      let [row, column] = winConditions[i][j];
      let currentValue = state.board[row][column]
      if(currentValue){
        winObj[currentValue]++;
        }
    }
    for(let key in winObj){
      if (winObj[key]===3){
      winner = key
      state.winner=true;
    } 
    }
  } return winner
}


//******************** render ********************
function renderState() {
  boardElem.innerHTML = ""
  for(let i=0; i<state.board.length; i++){
    let something = state.board[i];
      for (let j = 0; j < something.length; j++){
        const cellElem = document.createElement("div");
        const card = state.board[i][j]
        cellElem.innerText=card
        cellElem.classList.add("cell");
        cellElem.dataset.index=`${i},${j}`
        boardElem.appendChild(cellElem);
        // cell.innerText="Cell"
      }
    }
}



// maybe a dozen or so helper functions for tiny pieces of the interface


// ******************** logic ********************
function changeToXandO(){
  if (state.players === "X" ) {
    state.players = "O";
  } else {
    state.players= "X";
    }
}
function changeTurn(){
  state.winner=checkWin();
  if (state.winner !== true){
  if (state.currentPlayerIdx === 0){
    state.currentPlayerIdx = 1;

  }else{
    state.currentPlayerIdx=0;
  }
}
}


function renderPlayer() {
  let text;
  if(state.winner === true){
    text = `<span class="player">${state.currentPlayer}</span> has won!`
  }
  else if(!state.currentPlayer[0] || !state.currentPlayer[1]){
    text = `
    <input name="player1" placeholder="Enter Player 1 Name">
    <input name="player2" placeholder="Enter Player 2 Name">
    <button class="start"> Start Game </button>
    `;
  }else {
    text = `It's currently <span class="player">${state.getCurrentPlayer()}</span>'s turn`
  }
  playerTurnElem.innerHTML = text;
}

function takeTurns(index){
  let [row, column] = index;
  console.log(index);
  state.board[Number(row)][Number(column)] = state.players;
  console.log(state.board[Number(row)][Number(column)]);
  changeToXandO()
  changeTurn();
  renderPlayer();
}

function restart(){
  return buildInitialState();
}

//********************listeners********************

resetButtonElement.addEventListener('click', function (event){ 
  buildInitialState();
  renderPlayer();
  renderState();
});

boardElem.addEventListener('click', function(event){
  console.log(event);
  if(event.target.className!=="cell"){
    return;
  }
  console.log(event.target.dataset.index);
  let [row, column] = event.target.dataset.index.split(",")
  console.log(row, column);
  if(state.board[Number(row)][Number(column)] !== null || state.winner){
    return
  }
  takeTurns([row, column]);
  
  renderState();
  // if()
});



function onBoardClick() {
  changeTurn();
  

  // cellClicked();
  
  // update state, maybe with another dozen or so helper functions...

  renderState();
  
// renderState() // show the user the new state
}


playerTurnElem.addEventListener("click", function(event){
  console.log("click");
  if (event.target.className !== "start"){
    return;
  }
  const player1Input = document.querySelector("input[name=player1]");
  const player2Input = document.querySelector("input[name=player2]");
  console.log("player1Input", player1Input.value);
  console.log("player2Input", player2Input.value);
  state.currentPlayer[0] = player1Input.value;
  state.currentPlayer[1] = player2Input.value;
  renderPlayer();
  renderState();

});


// boardElem.addEventListener('click', onBoardClick); // etc

buildInitialState();
renderState();
renderPlayer();