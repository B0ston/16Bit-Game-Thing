$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var width = canvas.width;
	var height = canvas.height;

	var Enemies = [];

	var LocalPlayer = new Enemy("PLAYER");
	Enemies.push(LocalPlayer);
	console.log(Enemies);
	//movement
	window.addEventListener("keydown", function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 40) {
			Enemies[0].directionMoving = "down";
			Enemies[0].currentState = AnimFrames["PLAYER"].models["running"+Enemies[0].directionFacing];
		}
		if (event.keyCode == 38) {
			Enemies[0].directionMoving = "up";
			Enemies[0].currentState = AnimFrames["PLAYER"].models["running"+Enemies[0].directionFacing];
		}
		if (event.keyCode == 39) {
			Enemies[0].directionMoving = "right";
			Enemies[0].directionFacing = "Right";
			Enemies[0].currentState = AnimFrames["PLAYER"].models.runningRight;
		}
		if (event.keyCode == 37) {
			Enemies[0].directionMoving = "left";
			Enemies[0].directionFacing = "Left";
			Enemies[0].currentState = AnimFrames["PLAYER"].models.runningLeft;
		}
	}, false);

	window.addEventListener("keyup", function() {
		Enemies[0].currentState = AnimFrames["PLAYER"].models["idle"+Enemies[0].directionFacing];
		Enemies[0].directionMoving = '';
	})

	// canvas.addEventListener('click', function(event) {
	// 	Enemies.push(new Enemy("ENEMY_ROACH"))
	// 	Enemies[Enemies.length - 1].pos = {x: event.x - 75, y:event.y - 75};
	// 	console.log(Enemies);
	// })

	function preload() {
		for (var i in AnimFrames) {
			for (var j in AnimFrames[i]["models"]) {
				for (var k in EnemyTypes[i]["models"][j]) {
					AnimFrames[i]["models"][j][k] = new Image();
					AnimFrames[i]["models"][j][k].src = EnemyTypes[i]["models"][j][k];
				}
			}
		}
	}
	preload();
	ctx.imageSmoothingEnabled = false;

	function updateAnims() {
		ctx.clearRect(0, 0, width, height);
		for (var k in Enemies) {

			Enemies[k].animateArray();
		}
	}

	function update() {
		//checking player keyEvents
		if (Enemies[0].directionMoving == "right") {
			Enemies[0].pos.x += 5;
		}
		if (Enemies[0].directionMoving == "left") {
			Enemies[0].pos.x -= 5;
		}
		if (Enemies[0].directionMoving == "up") {
			Enemies[0].pos.y -= 5;
		}
		if (Enemies[0].directionMoving == "down") {
			Enemies[0].pos.y += 5;
		}
	}

	setInterval(updateAnims, 120);
	setInterval(update, 10);

	//Enemy constructor.
	function Enemy(t) {
		this.properties = EnemyTypeProperties[t];
		this.enemyType = t;
		this.pos = {x: 0, y:0};
		this.directionFacing = "Right";
		this.directionMoving = '';
		this.currentState = AnimFrames[t].models["idle"+this.directionFacing];
		this.previousState = this.currentState;
		this.isLoaded = false;

		this.count = 0;
		this.animateArray = function() {
			if (this.count > this.currentState.length - 1) {
				this.count = 0;
			}

			ctx.drawImage(this.currentState[this.count], this.pos.x, this.pos.y);
			this.count++;

		}
	}

})