//game constants
let inputDir = { x: 0, y: 0 };
let scoreBox = document.getElementById('scoreBox');
let highScoreBox = document.getElementById('highScoreBox') 
const foodSound = new Audio("assets/mixkit-hungry-man-eating-2252.wav");
const gameOverSound = new Audio("assets/mixkit-player-losing-or-failing-2042.wav");
const moveSound = new Audio("assets/Swoosh 1-SoundBible.com-231145780.wav");
const musicSound = new Audio("assets/mixkit-game-level-music-689.wav");
let board = document.getElementById("board");
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 1, y: 8 };
let speed = 12;
let score = 0;

//Game functions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
  musicSound.play();
}

function isCollide(snake) {
  // if you bump into your self
  for (let index = 1; index < snakeArr.length; index++) {
    if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
      return true;
    }
  }
  // if you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  //part 1 updating tne snake array
  if (isCollide(snakeArr)) {
    musicSound.pause();
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game over. Press enter to play again.");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    scoreBox.innerHTML = "Score: "+score;
  }
  // if you have eaten food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score++;
    if(score>highScoreval){
      highScoreval = score;
      localStorage.setItem('highScore',JSON.stringify(highScoreval))
      highScoreBox.innerHTML="High Score: " + highScoreval; 
    }
    scoreBox.innerHTML = "Score: "+score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.x,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //moving.snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //part 2 render the snake and food
  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
  });
  //display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}








// main logic
musicSound.play();

let highScore = localStorage.getItem('highScore');
if(highScore===null){
  highScoreval = 0;
  localStorage.setItem('highScore',JSON.stringify(highScoreval));
}
else{
  highScoreval = JSON.parse(highScore);
  highScoreBox.innerHTML = 'High Score: '+highScore
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
