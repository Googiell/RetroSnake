import _isEqual from 'lodash/isEqual';

import {
   snakeBody
} from './snake';

let food = {
   x: 0,
   y: 0
}

const checkFailFood = food => {
   for (let part of snakeBody) {
      if (_isEqual(part, food)) {
         return true;
      }
   }
   return false;
}

const createFood = (max) => {
   do {
      food.x = Math.floor(Math.random() * max);
      food.y = Math.floor(Math.random() * max);
   } while (checkFailFood(food));

   return food;
}

const checkIfAte = (a, b) => {
   if (a === food.x && b === food.y) {
      return true;
   }
   return false;
}

export {
   createFood,
   checkIfAte
};