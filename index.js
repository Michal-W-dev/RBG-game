var scoreP1 = document.querySelector('#displayScoreP1');
var scoreP2 = document.querySelector('#displayScoreP2');
var displayP1 = document.querySelector('#displayP1');
var displayP2 = document.querySelector('#displayP2');
var player1 = document.querySelector('#player1');
var player2 = document.querySelector('#player2');
var playAgain = document.querySelector('#playAgain')
var nameB1 = document.querySelector('#nameB1')
var nameB2 = document.querySelector('#nameB2')

var score1 = 0
var score2 = 0

var squares = document.querySelectorAll('.square');       // build array (of RGB colors)
var message = document.querySelector('#message');     //Correct, Play Again
var h1 = document.querySelector('h1');
var bigRGB = document.querySelector('#BigRGB');
var nextRound = document.querySelector('#nextRound');      //Button (Try again?, New Colors)

var modeButtons = document.querySelectorAll('.modeB');
var colorIndex;
var colors = [];
var turnP1 = true
var endTurn = false
var endGame = false
var maxScore = 2

setOfColors(12)

function gameOver(){
  if (score1 == maxScore || score2 == maxScore){
    endGame = true;
    console.log(turnP1);
    message.textContent = 'Victory!!'
    if (!turnP1) {player1.classList.add('disappeared')}
    else {player2.classList.add('disappeared')}
  }
}

function whichTurn(){
  if (endTurn == false) {turnP1 = !turnP1};
  // console.log(turnP1);
  if (turnP1 == false && endTurn == false) {player1.classList.add('dimmed'); player2.classList.remove('dimmed')}
  else if (turnP1 == true && endTurn == false) {player2.classList.add('dimmed'); player1.classList.remove('dimmed');} }

function score(){
  if (turnP1 == true && endTurn == false){score1++; scoreP1.textContent = score1;}
  else if (turnP1 == false && endTurn == false) {score2++; scoreP2.textContent = score2}   }


for (i = 0; i < squares.length; i++) {          // Loop squares, add color, attached listening event
  squares[i].style.backgroundColor = colors[i]
  squares[i].addEventListener('click',function(){
    if (this.style.backgroundColor === pickedColor){
      h1.style.backgroundColor = pickedColor;
      nextRound.textContent = "Next round"
      nextRound.classList.remove('disappeared')
      message.textContent = 'Correct!!';
      changeColors(); score(); endTurn = true; gameOver()}//victory();
    else  {this.style.backgroundColor = 'rgb(20,20,20)';    }
    whichTurn()
  }) }


for(i = 0; i < modeButtons.length; i++){       //Button (Easy) & (Hard)
  modeButtons[i].addEventListener('click',function(){
    modeButtons[0].classList.remove('selected');
    modeButtons[1].classList.remove('selected');
    this.classList.add('selected')
    if(this.textContent === 'Easy'){setOfColors(8); reset();
      squares[8].style.display = 'none';
      squares[9].style.display = 'none';
      squares[10].style.display = 'none';
      squares[11].style.display = 'none';     }
    else {setOfColors(12); reset();
      squares[8].style.display = 'block';
      squares[9].style.display = 'block';
      squares[10].style.display = 'block';
      squares[11].style.display = 'block';    }
    for (i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = colors[i]};   }) }



playAgain.addEventListener('click',function(){
  if (squares[11].style.display === 'none') {setOfColors(8)}
  else {setOfColors(12)}
  reset();
  endGame = false;
  player1.classList.remove('disappeared')
  player2.classList.remove('disappeared')
  nextRound.textContent = 'New colors'
  nextRound.classList.remove('disappeared')
  endTurn = false;
  score1 = 0;   score2 = 0;
  scoreP1.textContent = score1;
  scoreP2.textContent = score2;
  for (i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i]}  })

nextRound.addEventListener('click',function(){
  console.log(endGame);
  if ((endGame === false) && (endTurn === true || nextRound.textContent == 'New colors')){
    if (squares[10].style.display === 'none') {setOfColors(8)}
    else {setOfColors(12)}
    reset()
    for (i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = colors[i]}
    endTurn = false;   whichTurn();
    if (this.textContent == 'Next round') {nextRound.classList.add('disappeared')}   }     })

nameB1.addEventListener('click',function(){       //Change of names (player1)
  displayP1.textContent = prompt('Player1, please insert your name:')
  if (displayP1.textContent == ''){displayP1.textContent = 'P2'} })

nameB2.addEventListener('click',function(){      //Change of names (player1)
  displayP2.textContent = prompt('Player2, please insert your name:')
  if (displayP2.textContent == ''){displayP2.textContent = 'P2'}  })


//Reset display
function reset(){
  h1.style.background = 'steelblue';
  // nextRound.textContent = 'New colors'
  message.textContent = ''}

//Change (all colors) when Correct
function changeColors(){
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = pickedColor  } }

function setOfColors(hardEasy){
  colors = generateRandomColors(hardEasy);        //Create (RGB array)
  pickedColor = pickColor();                      //Pick random color from (RGB array)
  bigRGB.textContent = pickedColor}               //h1 display

//Random index from (RGB array)
function pickColor(){
  colorIndex = Math.floor(Math.random()*colors.length);
  return colors[colorIndex];   }
//Array with RGB
function generateRandomColors(num){
  var arr=[]
  for(i = 0; i < num; i++)
  arr.push(randomRGB())
  return arr; }
//RGB
function randomRGB(){
  var r = Math.floor(Math.random()*256);    //(0-255)
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);
  return 'rgb(' + r + ', '+ g +', ' + b +')'; }
