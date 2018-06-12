$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var width = canvas.width;
	var height = canvas.height;

	var Enemies = [];


	//movement
	window.addEventListener("keydown", function(event) {
		//Enemies[0] is the LocalPlayer
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
	var LocalPlayer = new Enemy("PLAYER");
	Enemies.push(LocalPlayer);
	Enemies[1] = new Enemy("ENEMY_RAT");
	Enemies[1].pos.x += 200;
	ctx.imageSmoothingEnabled = false;

	function checkEnemyDist(ply, enemy) {
		return Math.hypot(enemy.pos.x - ply.pos.x, enemy.pos.y - ply.pos.y);
	}

	function updateAnims() {
		ctx.clearRect(0, 0, width, height);
		for (var k in Enemies) {

			Enemies[k].animateArray();
		}
	}

	function update() {
		//checking player keyEvents
		if (Enemies[0].directionMoving == "right") {
			Enemies[0].pos.x += Enemies[0].properties.movementSpeed;
		}
		if (Enemies[0].directionMoving == "left") {
			Enemies[0].pos.x -= Enemies[0].properties.movementSpeed;
		}
		if (Enemies[0].directionMoving == "up") {
			Enemies[0].pos.y -= Enemies[0].properties.movementSpeed;
		}
		if (Enemies[0].directionMoving == "down") {
			Enemies[0].pos.y += Enemies[0].properties.movementSpeed;
		}

		for (var g in Enemies) {
			Enemies[g].attackWithinRange();
		}
	}

	setInterval(updateAnims, 20);
	setInterval(update, 10);

	//Enemy constructor.
	function Enemy(t) {
		this.properties = EnemyTypeProperties[t];
		this.enemyType = t;

		this.pos = {x: 0, y:0};
		this.directionFacing = "Right";
		this.directionMoving = '';

		this.currentState = AnimFrames[t].models["idle"+this.directionFacing];
		this.currentFrame = AnimFrames[t].models["idle"+this.directionFacing][0];

		this.inventory = [];

		//for non-player enemies.
		this.xdif;
		this.ydif;
		this.totaldif;

		this.targetLocation = this.pos;

		this.moveToPlayer = function() {
			if (!this.properties.isPlayer) {
				// console.log(this.pos);
				if (this.pos.x > Enemies[0].pos.x) {
					this.targetLocation = {x: Enemies[0].pos.x + 100, y: Enemies[0].pos.y};
				} else {
					this.targetLocation = {x: Enemies[0].pos.x - 100, y: Enemies[0].pos.y};
				}

				this.xdif = this.targetLocation.x - this.pos.x;
				this.ydif = this.targetLocation.y - this.pos.y;
				this.totaldif = Math.hypot(this.xdif, this.ydif);
				if (this.totaldif < 2) {
					if (this.pos.x > Enemies[0].pos.x) {
						this.currentState = AnimFrames[t].models.attackingLeft;
					} else {
						this.currentState = AnimFrames[t].models.attackingRight;
					}
					Enemies[0].properties.health--;
					return;
				}

				if ((this.xdif / this.totaldif) * this.properties.movementSpeed > 0) {
					this.currentState = AnimFrames[t].models.runningRight;
				} else {
					this.currentState = AnimFrames[t].models.runningLeft;
				}

				this.pos.x += (this.xdif / this.totaldif) * this.properties.movementSpeed;
				this.pos.y += (this.ydif / this.totaldif) * this.properties.movementSpeed;
			} else {
				return;
			}
		}

		this.attackWithinRange = function() {
			if (!this.properties.isPlayer) {
				this.moveToPlayer();
			} else {
				return;
			}
		}

		this.count = 0;
		this.currentFrameCounter = 0;
		this.animateArray = function() {
			if (this.count > this.currentState.length - 1) {
				if (this.currentFrameCounter > this.currentState.length - 1) {
					this.currentFrameCounter = 0;
				}
				this.currentFrame = this.currentState[this.currentFrameCounter];
				this.count = 0;
				this.currentFrameCounter++;
			}

			ctx.drawImage(this.currentFrame, this.pos.x, this.pos.y);
			this.count++;
		}
	}

	//Item constructor
	function Item(t) {
		this.itemType = ItemTypes[t];
	}
})