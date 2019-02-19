var Snake = (function () {
	// canvas variables
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');
	const canvas_size = canvas.width;

	const score = document.querySelector('.menu__score');
	const score_wrap = document.querySelector('.menu__scoreWrap');
	const options_wrap = document.querySelector('.menu');

	// dimensions of the snake
	const snake_size = 20;
	let snake_length;
	let snake_array = [];
	let tail;

	// snake head position
	let pos_x;
	let pos_y;
	let new_direction;
	let direction = 'right';

	// food variables
	let food_x;
	let food_y;

	var draw_snakegame;
	let interval;
	let points;

	// create snake body
	function createSnake() {
		points = 0;
		snake_length = 3;
		direction = 'right';
		new_direction = '';
		snake_array = [];
		for (let i = snake_length - 1; i >= 0; i--) {
			snake_array.push({
				x: i,
				y: 0
			});
		}
	}

	// create position of food
	function createFood() {
		do {
			food_x = Math.floor(Math.random() * (canvas_size + 1) / snake_size) * snake_size;
			food_y = Math.floor(Math.random() * (canvas_size + 1) / snake_size) * snake_size;
			if (food_y === canvas_size) food_y = canvas_size - snake_size;
			if (food_x === canvas_size) food_x = canvas_size - snake_size;
		} while (failFood() === true);
	}

	// if position of food = position of snake
	function failFood() {
		for (let i = 0; i < snake_array.length - 1; i++) {
			if (food_x === snake_array[i].x * snake_size && food_y === snake_array[i].y * snake_size) return true;
		}
		return false;
	}

	// draw part of snake
	function drawPart(x, y) {
		ctx.fillStyle = '#1d1b1b';
		ctx.fillRect(x * snake_size, y * snake_size, snake_size, snake_size);
		ctx.strokeStyle = '#668051';
		ctx.strokeRect(x * snake_size, y * snake_size, snake_size, snake_size);
	}

	// draw food
	function drawFood(x, y) {
		ctx.fillStyle = '#1d1b1b';
		ctx.fillRect(x, y, snake_size, snake_size);
		ctx.strokeStyle = '#668051';
		ctx.fillRect(x, y, snake_size, snake_size);
	}

	// snake can't eat snake body!
	function colision() {
		for (let i = 1; i < snake_array.length; i++) {
			if (snake_array[0].x === snake_array[i].x && snake_array[0].y === snake_array[i].y) return true;
		}
		return false;
	}

	// main function, draw game
	function drawGame() {
		ctx.fillStyle = '#668051';
		ctx.fillRect(0, 0, canvas_size, canvas_size);

		if (points < 10) score.textContent = '00' + points;
		else if (points < 100) score.textContent = '0' + points;
		else {
			score.textContent = points;
		}
		for (let i = 0; i < snake_length; i++) {
			let current = snake_array[i];
			drawPart(current.x, current.y);
		}

		drawFood(food_x, food_y);

		pos_x = snake_array[0].x;
		pos_y = snake_array[0].y;

		if (new_direction) direction = new_direction;
		// moving the snake
		if (direction === 'right') pos_x++;
		else if (direction === 'left') pos_x--;
		else if (direction === 'up') pos_y--;
		else pos_y++;

		// Going through the walls
		if (pos_x * snake_size >= canvas_size) {
			pos_x = 0;
		} else if (pos_x * snake_size < 0) {
			pos_x = 24;
		} else {}
		if (pos_y * snake_size >= canvas_size) {
			pos_y = 0;
		} else if (pos_y * snake_size < 0) {
			pos_y = 24;
		}

		// snake eats food or not :c
		if (pos_x * snake_size === food_x && pos_y * snake_size === food_y) {
			snake_length++;
			points++;
			let tail = {
				x: pos_x,
				y: pos_y
			};
			snake_array.unshift(tail);
			createFood();
		} else {
			let tail = snake_array.pop();
			tail.x = pos_x;
			tail.y = pos_y;
			snake_array.unshift(tail);
		}

		// if snake ate himself
		if (colision()) {
			clearInterval(draw_snakegame);
			draw_snakegame = null;
			options_wrap.style.display = 'flex';
			score_wrap.style.display = 'none';
		}
	}

	function move(direct) {
		switch (direct) {
			case 37:
				if (direction !== 'right') new_direction = 'left';
				break;
			case 38:
				if (direction !== 'down') new_direction = 'up';
				break;
			case 39:
				if (direction !== 'left') new_direction = 'right';
				break;
			case 40:
				if (direction !== 'up') new_direction = 'down';
				break;
			default:
				break;
		}
	}

	createSnake();
	createFood();
	score.textContent = '000';

	document.addEventListener('keydown', function () {
		move(window.event.keyCode);
	});

	drawGame();

	var start_btn = document.querySelector('.menu__start');
	start_btn.addEventListener('click', function () {
		options_wrap.style.display = 'none';
		score_wrap.style.display = 'block';
		const level = document.querySelector('.menu__level').selectedIndex;
		switch (level) {
			case 0:
				interval = 200;
				break;
			case 1:
				interval = 100;
				break;
			case 2:
				interval = 50;
				break;
			default:
				break;
		}
		clearInterval(draw_snakegame);
		draw_snakegame = null;
		createSnake();
		draw_snakegame = setInterval(drawGame, interval);
	});

	var _init = function () {
		drawGame();
	};

	return {
		init: _init
	};
})();