// ******************** state ********************
let state;
const boardElem = document.getElementById('board');
const playerTurnElem = document.querySelector("#player-turn");
console.log(playerTurnElem);



function buildInitialState() {
  state = {
    players: ['x', 'o'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }
  
  state.currentPlayer = ["Jack","Jill"]
  state.currentPlayerIdx = 0;
  
}



//******************** render ********************
function renderState() {
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
}

//********************listeners********************

function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState() // show the user the new state
}

// boardElem.addEventListener('click', onBoardClick); // etc

buildInitialState()
renderState()
changeTurn()
console.log(state.currentPlayer[state.currentPlayerIdx]);