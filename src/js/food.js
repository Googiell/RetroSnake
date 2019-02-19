const createFood = (max) => {
   return {
      x: Math.floor(Math.random() * max),
      y: Math.floor(Math.random() * max)
   }
}

export {
   createFood
};