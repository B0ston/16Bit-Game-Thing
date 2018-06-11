$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var width = canvas.width;
	var height = canvas.height;

	var Enemies = [];

	canvas.addEventListener('click', function(event) {
		Enemies.push(new Enemy("PLAYER"))
		Enemies[Enemies.length - 1].pos = {x: event.x - 75, y:event.y - 75};
		console.log(Enemies);
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
	ctx.imageSmoothingEnabled = false;

	function updateAnims() {
		ctx.clearRect(0, 0, width, height);
		for (var k in Enemies) {

			Enemies[k].animateArray();
		}
	}

	setInterval(updateAnims, 120);

	//Enemy constructor.
	function Enemy(t) {
		this.properties = EnemyTypeProperties[t];
		this.pos = {x: 0, y:0};
		this.currentState = AnimFrames[t].models.idleRight;
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