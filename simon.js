var computerButtonsArray, playerButtonsArray, 
		buttonIntv, 
		playerTurn, computerTurn, 
		timer, turn, gameOver;

function newGame() {
	stopAnimation();
	computerButtonsArray = [];
	playerButtonsArray = [];
	timer = 500;
	turn = 0;
	computerTurn = true;
	playerTurn = false;
	gameOver = false;
	getRandomButton();
	pressComputerButtons();
	document.getElementById('msg').innerHTML = turn;
}

function continueGame() {
	playerButtonsArray = [];
	timer -= 10;
	getRandomButton();
	pressComputerButtons();
}

function playerPressButton(btn) {
	if (!playerTurn) return;
	var elements = document.getElementsByClassName('gamepiece');
	for (var i = 0; i < elements.length; i ++) 
		elements[i].style.backgroundColor = 'black';
	var el = getElement(btn), count = 0;
	playSound(btn);
	el.style.backgroundColor = el.style.color;
	setTimeout(function() {
		el.style.backgroundColor = 'black';
	}, 500)
	playerButtonsArray.push(btn);
	console.log(playerButtonsArray);
	checkButtons();
}

function checkButtons() {
	for (var i = 0; i < playerButtonsArray.length; i++) {
		if (playerButtonsArray[i] != computerButtonsArray[i] && playerButtonsArray.length <= computerButtonsArray.length){
			gameOver = true;
		}
		else if (playerButtonsArray[i] == computerButtonsArray[i] && playerButtonsArray.length <= computerButtonsArray.length) {
			console.log('correct');
		}	
	}
	if (!gameOver && playerButtonsArray.length == computerButtonsArray.length) {
		playerTurn = false;
		computerTurn = true;
		turn++;
		document.getElementById('msg').innerHTML = turn;
		setTimeout(function(){
			continueGame();
		}, 1000);
	}
	else if (gameOver){
		document.getElementById('msg').innerHTML = "Game Over!";
		playerTurn = false;
		computerTurn = true;
		animate();
	}
}

function getRandomButton() {
	if (!computerTurn) return;
	computerButtonsArray.push(random());
}

function pressComputerButtons() {
	if (!computerTurn) return;
	var tmpArray = computerButtonsArray.slice(0);
	buttonIntv = setInterval(function() {
		var elements = document.getElementsByClassName('gamepiece');
		for (var i = 0; i < elements.length; i ++) 
			elements[i].style.backgroundColor = 'black';
		if (tmpArray.length > 0) {
			var el = getElement(tmpArray.shift());
			switch(el.id){
			case "piece-1":
				playSound('sound1');
				break;
			case "piece-2":
				playSound('sound2');
				break;
			case "piece-3":
				playSound('sound3');
				break;
			case "piece-4":
				playSound('sound4');
				break;
			}
			el.style.backgroundColor = el.style.color;
			setTimeout(function(){
				for (var i = 0; i < elements.length; i ++) 
					elements[i].style.backgroundColor = 'black';
			}, (timer - 50));
		}
		else {
			clearInterval(buttonIntv);
			var elements = document.getElementsByClassName('gamepiece');
			for (var i = 0; i < elements.length; i ++) 
				elements[i].style.backgroundColor = 'black';
			computerTurn = false;
			playerTurn = true;
		}
	}, timer);
}

function getElement(n) {
	var element;
	if (n == 1)
		element = document.getElementById('piece-1');
	else if (n == 2)
		element = document.getElementById('piece-2');
	else if (n == 3)
		element = document.getElementById('piece-3');
	else if (n == 4)			
		element = document.getElementById('piece-4');
	return element; 
}

function random() {
	return Math.floor((Math.random() * 4) + 1);
}