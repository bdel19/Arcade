// ******************** state ********************
let state;
const boardElem = document.getElementById('board');
const playerTurnElem = document.querySelector("#player-turn");




function buildInitialState() {
  state = {
    players: ['x', 'o'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }
  
  state.currentPlayer = ["",""]
  state.currentPlayerIdx = 0;
  state.getCurrentPlayer = function (){
    return state.currentPlayer[state.currentPlayerIdx];
  };
}



//******************** render ********************
function renderState() {
  boardElem.innerHTML = ""
  for(let i=0; i<state.board.length; i++){
    let something = state.board[i];
      for (let j = 0; j < something.length; j++){
        const cell = document.createElement("div");
        board.appendChild(cell);
        cell.innerText="Cell"
      }
    }
}



// maybe a dozen or so helper functions for tiny pieces of the interface


// ******************** logic ********************
function changeTurn(){
  if (state.currentPlayerIdx === 0) {
    state.currentPlayerIdx = 1;
  } else {
    state.currentPlayerIdx = 0;
    }
    console.log(state.getCurrentPlayer());
}

function renderPlayer() {
  let text;
  if (!state.currentPlayer[0] || !state.currentPlayer[1]){
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

//********************listeners********************
boardElem.addEventListener('click', onBoardClick);
function onBoardClick() {
  changeTurn();
  renderPlayer();
  // update state, maybe with another dozen or so helper functions...
renderState();
  // renderState() // show the user the new state
}
playerTurnElem.addEventListener("click", function(event){
  console.log("click");
  if (event.target.className !== "start"){
    return;
  }
  const player1Input = document.querySelector("input[name=player1");
  const player2Input = document.querySelector("input[name=player2");
  console.log("player1Input", player1Input.value);
  console.log("player2Input", player2Input.value);
  state.currentPlayer[0] = player1Input.value;
  state.currentPlayer[1] = player2Input.value;
  renderPlayer();
});
// boardElem.addEventListener('click', onBoardClick); // etc

buildInitialState();
renderState();
renderPlayer();