import {
   isEqual
} from 'lodash';

import {
   stopGame,
   drawFood
} from './game';

import {
   checkIfAte,
   createFood
} from './food';

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
};

const moveSnake = () => {
   addPart();
   snakeBody.pop();
   checkColision();
   let headX = snakeBody[0].x;
   let headY = snakeBody[0].y;
   if (checkIfAte(headX, headY)) {
      snakeLength++;
      addPart();
      createFood();
      drawFood(createFood(25));
   }
};

const changeDirection = (dir) => {
   if ((direction - dir) % 2) {
      direction = dir;
   }
};

const checkColision = () => {
   let snakeTail = snakeBody.slice();
   snakeTail.shift();
   if (snakeTail.some((el) => isEqual(el, snakeBody[0]))) {
      stopGame();
   }
};

const clearSnake = () => {
   snakeBody = [];
   snakeLength = 10;
   direction = 0;
};

const addPart = () => {
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
   };
   snakeBody.unshift(tail);
}

export {
   createSnake,
   snakeBody,
   moveSnake,
   changeDirection,
   clearSnake,
};