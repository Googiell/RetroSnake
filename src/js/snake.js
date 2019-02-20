import _ from 'lodash';

import {
   stopGame
} from './game';

let snakeBody = [];
let snakeLength = 10;
let direction = 0;

const createSnake = () => {
   for (let i = 0; i < snakeLength; i++) {
      snakeBody.push({
         x: snakeLength - i - 1,
         y: 0
      });
   }
}

const moveSnake = () => {
   let headX = snakeBody[0].x;
   let headY = snakeBody[0].y;
   if (direction === 0) headX++;
   else if (direction === 2) headX--;
   else if (direction === 3) headY--;
   else headY++;
   if (headX >= 25) headX = 0;
   else if (headX < 0) headX = 24;
   if (headY >= 25) headY = 0;
   else if (headY < 0) headY = 24;
   let tail = {
      x: headX,
      y: headY
   }
   snakeBody.unshift(tail);
   snakeBody.pop();
   checkColision();
}

const changeDirection = (dir) => {
   if ((direction - dir) % 2) {
      direction = dir;
   }
}

const checkColision = () => {
   let snakeTail = snakeBody.slice();
   snakeTail.shift();
   if (snakeTail.some(el => _.isEqual(el, snakeBody[0]))) {
      stopGame();
   }
};

const clearSnake = () => {
   snakeBody = [];
   snakeLength = 10;
   direction = 0;
}

export {
   createSnake,
   snakeBody,
   moveSnake,
   changeDirection,
   clearSnake
};