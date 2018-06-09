$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var width = canvas.width;
	var height = canvas.height;

	var Enemies = [];

	canvas.addEventListener('click', function(event) {
		Enemies.push(new Enemy("ENEMY_RAT"))
		Enemies[Enemies.length - 1].pos = {x: event.x, y:event.y};
	})

	ctx.imageSmoothingEnabled = false;

	//Animation updater.
	function updateAnims() {
		ctx.clearRect(0, 0, width, height);
		for (k in Enemies) {
			Enemies[k].checkState();
			Enemies[k].animateArray(Enemies[k].currentState);
		}
	}

	//Update function.
	function update() {
	}
	setInterval(update, 10);
	setInterval(updateAnims, 120);

	//Enemy constructor.
	function Enemy(t) {
		this.properties = EnemyTypes[t];
		this.pos = {x: 0, y:0};
		this.currentState = this.properties.models.runningLeft;
		this.previousState = this.currentState;

		this.frames;
		this.Images = [];
		this.count = 0;

		this.checkState = function() {
			// console.log(this.currentState != this.previousState);
			if (this.currentState != this.previousState) {
				for (var i in this.currentState) {
					this.Images[i] = new Image();
					this.Images[i].src = this.currentState[i];
				}

				this.previousState = this.currentState;
			}
		}

		for (var i in this.currentState) {
			this.Images[i] = new Image();
			this.Images[i].src = this.currentState[i];
		}

		this.animateArray = function() {
			var self = this;
			setTimeout(function() {
				if (self.count > self.currentState.length - 1) {
					self.count = 0;
				}
				ctx.drawImage(self.Images[self.count], self.pos.x, self.pos.y);
				self.count++;
			}, 120);
		}
	}

})