import _ from 'lodash';

import {
   createSnake,
   clearSnake,
   snakeBody,
   moveSnake,
   changeDirection
} from './snake';

import {
   createFood
} from './food';

const startButton = document.querySelector('.menu__start');
const speed = 100;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.scale(20, 20);

const drawGame = () => {
   ctx.fillStyle = '#668041';
   ctx.fillRect(0, 0, 25, 25);
};

const drawFood = ({
   x,
   y
}) => {
   ctx.fillStyle = '#1d1b1b';
   ctx.fillRect(x, y, 1, 1);
   ctx.strokeStyle = '#668051';
   ctx.fillRect(x, y, 1, 1);
};

const drawPart = ({
   x,
   y
}) => {
   ctx.fillStyle = '#000000';
   ctx.fillRect(x, y, 1, 1);
};

let foodPosition = createFood(25);

const runGame = () => {
   drawGame();
   drawFood(foodPosition);
   moveSnake();
   for (let part of snakeBody) {
      drawPart(part);
   }
};

let gameInterval;

startButton.addEventListener('click', () => {
   clearInterval(gameInterval);
   clearSnake();
   createSnake();
   gameInterval = setInterval(runGame, speed);
});

const stopGame = () => {
   console.log('stop game');
   clearInterval(gameInterval);
}

/*
   0 - right
   1 - down
   2 - left
   3 - up
*/
const findNewDirection = (key) => {
   let dir;
   switch (key) {
      case 'ArrowLeft':
         dir = 2;
         break;
      case 'ArrowUp':
         dir = 3;
         break;
      case 'ArrowRight':
         dir = 0;
         break;
      case 'ArrowDown':
         dir = 1;
         break;
      default:
         break;
   }
   return dir;
};

document.addEventListener(
   'keydown',
   _.debounce((e) => {
      changeDirection(findNewDirection(e.key));
   }, speed - (speed / 3))
);

export {
   canvas,
   ctx,
   stopGame
};