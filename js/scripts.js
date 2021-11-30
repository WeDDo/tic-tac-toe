const maxTurns = 9;
let turn = 0;

let turnDiv = document.querySelector('#turn-container');

class Player{
  #isWinner = false;
  #symbol = '';

  constructor(playerSymbol){
    this._symbol = playerSymbol;
  }

  get isWinner(){
    return this._isWinner;
  }
   
  set isWinner(value){
    this._isWinner = value;
  }

  get symbol(){
    return this._symbol;
  }
}

//gameArea[y][x]
var gameArea = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];

const player1 = new Player('X');
const player2 = new Player('O');

window.onload = init;

function init(){
  var allButtons = document.getElementsByClassName('cell');
  for(var i = 0; i < allButtons.length; i++){
    var button = allButtons[i];
    button.onclick = onButtonClick;
  }

  displayTurn(player1, player2);
}

function onButtonClick(){
  var classNameSplit = this.className.split('');
  var buttonNumber = classNameSplit[classNameSplit.length - 1];

  if(turn % 2 == 0){ //Player1 turn
    if(placeOnPressedButton(this, buttonNumber, player1.symbol)){
      player1.isWinner = checkIfPlayerWon(player1.symbol);
    }
  }
  else{              //Player2 turn
    if(placeOnPressedButton(this, buttonNumber, player2.symbol)){
      player2.isWinner = checkIfPlayerWon(player2.symbol);
    }
  }
  turn++;
  displayTurn(player1, player2);
  
  if(turn == maxTurns && !player1.isWinner && !player2.isWinner){
    document.getElementById("win-field").innerHTML = "DRAW";
  }
  else{
    if(player1.isWinner){
      afterRoundEnd(player1.symbol);
    }
    else if(player2.isWinner){
      afterRoundEnd(player2.symbol);
    }
    else{
      //Continue
    }
  }
}

function afterRoundEnd(playerSymbol){
  document.getElementById("win-field").innerHTML = playerSymbol + " WON!";
  var allButtons = document.getElementsByClassName("cell");
  for(var i = 0; i < allButtons.length; i++){
    var button = allButtons[i];
    button.disabled = true;
  }
}

function placeOnPressedButton(button, buttonNumber, playerSymbol){
  for(var i = 0; i < gameArea.length; i++){
    var row = gameArea[i];
    for(var j = 0; j < row.length; j++){
      var cellNumber = row[j];
      if(cellNumber == buttonNumber){
        gameArea[i][j] = playerSymbol;
        button.innerHTML = playerSymbol;
        return true;
      }
    }
  }
  return false;
}

function checkIfPlayerWon(playerSymbol){
  return checkFrontSlashWin(playerSymbol) || checkBackSlashWin(playerSymbol) || checkVerticalWin(playerSymbol) || checkHorizontalWin(playerSymbol);
}

function checkVerticalWin(playerSymbol){
  for(var i = 0; i < gameArea.length; i++){
    var count = 0;
    for(var j = 0; j < gameArea.length; j++){
      var cell = gameArea[j][i];
      if(cell == playerSymbol){
        count++;
      }
    }
    if(count == 3){
      return true;
    }
  }
  return false;
}

function checkHorizontalWin(playerSymbol){
  for(var i = 0; i < gameArea.length; i++){
    var row = gameArea[i];
    var count = 0;
    for(var j = 0; j < row.length; j++){
      var cell = row[j];
      if(cell == playerSymbol){
        count++;
      }
    }
    if(count == 3){
      return true;
    }
  }
  return false;
}

function checkBackSlashWin(playerSymbol){
  if(gameArea[0][0] == playerSymbol &&  gameArea[1][1] == playerSymbol && gameArea[2][2] == playerSymbol){
    return true;
  }
  return false;
}

function checkFrontSlashWin(playerSymbol){
  if(gameArea[2][0] == playerSymbol &&  gameArea[1][1] == playerSymbol && gameArea[0][2] == playerSymbol){
    return true;
  }
  return false;
}

function resetGame(){
  window.location.reload();
}

function displayTurn(player1, player2){
  if(turn == maxTurns || player1.isWinner || player2.isWinner){
    turnDiv.innerHTML = 'Game has ended!';
    return ;
  }

  if(turn % 2 == 0){
    turnDiv.innerHTML = `${player1.symbol}'s turn`;
  }
  else{
    turnDiv.innerHTML = `${player2.symbol}'s turn`;
  }
}