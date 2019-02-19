import {
   createSnake,
   snakeBody,
   moveSnake,
   changeDirection
} from './snake';

import {
   createFood
} from './food';

const startButton = document.querySelector('.menu__start');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.scale(20, 20);

const drawGame = () => {
   ctx.fillStyle = '#668041';
   ctx.fillRect(0, 0, 25, 25);
}

const drawFood = ({
   x,
   y
}) => {
   ctx.fillStyle = '#1d1b1b';
   ctx.fillRect(x, y, 1, 1);
   ctx.strokeStyle = '#668051';
   ctx.fillRect(x, y, 1, 1);
}

const drawPart = ({
   x,
   y
}) => {
   ctx.fillStyle = '#000000';
   ctx.fillRect(x, y, 1, 1);
}

let foodPosition = createFood(25);

const runGame = () => {
   drawGame();
   drawFood(foodPosition);
   moveSnake();
   for (let part of snakeBody) {
      drawPart(part);
   }
}

startButton.addEventListener('click', () => {
   createSnake();
   setInterval(runGame, 200);
});

/*
   0 - right
   1 - dwon
   2 - left
   3 - up
*/
const findNewDirection = key => {
   let dir;
   switch (key) {
      case 37:
         dir = 2;
         break;
      case 38:
         dir = 3;
         break;
      case 39:
         dir = 0;
         break;
      case 40:
         dir = 1;
         break;
      default:
         break;
   }
   console.log(dir);
   return dir;
}

document.addEventListener('keydown', () => {
   changeDirection(findNewDirection(window.event.keyCode));
})


export {
   canvas,
   ctx
};