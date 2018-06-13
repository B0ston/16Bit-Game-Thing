$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var width = canvas.width;
	var height = canvas.height;

	var Enemies = [];

	window.onclick = function(event) {
		Enemies.push(new Enemy("ENEMY_ROACH"));
		Enemies[Enemies.length - 1].pos = {x:event.x, y:event.y};
	}
 
	//movement
	window.addEventListener("keydown", function(event) {
		//Enemies[0] is the LocalPlayer
		Enemies[0].directionalMovement[event.keyCode] = true;
	}, false);

	window.addEventListener("keyup", function(event) {
		Enemies[0].currentState = AnimFrames["PLAYER"].models["idle"+Enemies[0].directionFacing];
		Enemies[0].directionalMovement[event.keyCode] = false;
	})

	function preload() {
		ctx.font = "18px Minecraft";
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

	function updateAnims() {
		ctx.clearRect(0, 0, width, height);
		for (var k in Enemies) {
			Enemies[k].animateArray();
			if (Enemies[k].properties.isPlayer) {
				Enemies[k].showInv();
				Enemies[k].showHealthBar();
			} else {
				Enemies[k].showHealthBar();
			}
		}
	}

	function update() {
		//checking player keyEvents

		if (Enemies[0].directionalMovement[38]) {
			Enemies[0].pos.y -= Enemies[0].properties.movementSpeed; //up
			Enemies[0].currentState = AnimFrames["PLAYER"].models["running"+Enemies[0].directionFacing];
		} else if (Enemies[0].directionalMovement[40]) {
			Enemies[0].pos.y += Enemies[0].properties.movementSpeed; //down
			Enemies[0].currentState = AnimFrames["PLAYER"].models["running"+Enemies[0].directionFacing];
		}

		if (Enemies[0].directionalMovement[39]) {
			Enemies[0].pos.x += Enemies[0].properties.movementSpeed; //right
			Enemies[0].directionFacing = "Right";
			Enemies[0].currentState = AnimFrames["PLAYER"].models["running"+Enemies[0].directionFacing];
		} else if (Enemies[0].directionalMovement[37]) {
			Enemies[0].pos.x -= Enemies[0].properties.movementSpeed; //left
			Enemies[0].directionFacing = "Left";
			Enemies[0].currentState = AnimFrames["PLAYER"].models["running"+Enemies[0].directionFacing];
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
		if (this.properties.isPlayer) {
			this.level = 0;
			this.damage = (this.level * 0.5) + 1;
			this.exp = 0;
			this.expNeededForLvlUp = 500;
		} else {
			this.level = Math.floor(Math.random() * 50);
			this.damage = (this.level * 0.5) + 1;
			this.properties.movementSpeed = (this.level * 0.01) + 2;
		}

		this.pos = {x: 0, y:0};
		this.directionFacing = "Right";
		this.directionalMovement = {
			38: false, //up
			39: false, //right
			40: false, //down
			37: false //left
		}

		this.currentState = AnimFrames[t].models["idle"+this.directionFacing];
		this.currentFrame = AnimFrames[t].models["idle"+this.directionFacing][0];

		this.inventoryContent = [];
		this.inventoryTexture = "assets/inventory.png";
		this.inventoryImage = new Image();
		this.inventoryImage.src = this.inventoryTexture;

		//for non-player enemies.
		this.xdif;
		this.ydif;
		this.totaldif;
		this.targetLocation = this.pos;
		this.count = 0;
		this.currentFrameCounter = 0;
	}

	Enemy.prototype.showInv = function() {
		ctx.drawImage(this.inventoryImage, width/2 - 325, height - 90);
	}

	Enemy.prototype.showHealthBar = function() {
		ctx.fillStyle = "Red";

		if (this.properties.health < 0) {
			return;
		} else {
			ctx.fillRect(this.pos.x + 25, this.pos.y + 150, 100 * (this.properties.health / this.properties.maxhealth), 5);
		}
	}

	Enemy.prototype.animateArray = function() {
		if (this.count > this.currentState.length - 1) {
			if (this.currentFrameCounter > this.currentState.length - 1) {
				this.currentFrameCounter = 0;
				if (!this.properties.isPlayer && this.totaldif < 2) {
					Enemies[0].properties.health -= this.damage;
					console.log(Enemies[0].properties.health);
				}
			}
			this.currentFrame = this.currentState[this.currentFrameCounter];
			this.count = 0;
			this.currentFrameCounter++;
		}

		ctx.drawImage(this.currentFrame, this.pos.x, this.pos.y);
		this.count++;
	}

	Enemy.prototype.moveToPlayer = function() {
		if (!this.properties.isPlayer) {
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
					this.currentState = AnimFrames[this.enemyType].models.attackingLeft;
				} else {
					this.currentState = AnimFrames[this.enemyType].models.attackingRight;
				}
				return;
			}

			if ((this.xdif / this.totaldif) * this.properties.movementSpeed > 0) {
				this.currentState = AnimFrames[this.enemyType].models.runningRight;
			} else {
				this.currentState = AnimFrames[this.enemyType].models.runningLeft;
			}

			this.pos.x += (this.xdif / this.totaldif) * this.properties.movementSpeed;
			this.pos.y += (this.ydif / this.totaldif) * this.properties.movementSpeed;
		} else {
			return;
		}
	}

	Enemy.prototype.attackWithinRange = function() {
		if (!this.properties.isPlayer) {
			this.moveToPlayer();
		} else {
			return;
		}
	}

	Enemy.prototype.addToInv = function(item) {

	}

	//Item constructor
	function Item(t) {
		this.itemType = ItemTypes[t];
	}
})