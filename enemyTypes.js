var EnemyTypes = {
	"ENEMY_RAT": {
		"models": {
			"idleLeft": [
				"assets/Rat/idleLeft/idleleft0.png",
				"assets/Rat/idleLeft/idleleft1.png",
				"assets/Rat/idleLeft/idleleft2.png",
				"assets/Rat/idleLeft/idleleft3.png",
				"assets/Rat/idleLeft/idleleft4.png"
			],
			"runningLeft": [
				"assets/Rat/runningLeft/runningLeft0.gif",
				"assets/Rat/runningLeft/runningLeft1.gif"
			],
			"attackingLeft": [
				"assets/Rat/attackingLeft/attackingLeft0.png",
				"assets/Rat/attackingLeft/attackingLeft1.png",
				"assets/Rat/attackingLeft/attackingLeft2.png",
				"assets/Rat/attackingLeft/attackingLeft3.png",
				"assets/Rat/attackingLeft/attackingLeft4.png"
			],

			"attackingRight": [
				"assets/Rat/attackingRight/attackingRight0.png",
				"assets/Rat/attackingRight/attackingRight1.png",
				"assets/Rat/attackingRight/attackingRight2.png",
				"assets/Rat/attackingRight/attackingRight3.png",
				"assets/Rat/attackingRight/attackingRight4.png"
			],
			"idleRight": [
				"assets/Rat/idleRight/idleRight0.png",
				"assets/Rat/idleRight/idleRight1.png",
				"assets/Rat/idleRight/idleRight2.png",
				"assets/Rat/idleRight/idleRight3.png",
				"assets/Rat/idleRight/idleRight4.png"
			],
			"runningRight": [
				"assets/Rat/runningRight/runningRight0.gif",
				"assets/Rat/runningRight/runningRight1.gif"
			]
		}
	},

	"ENEMY_ROACH": {
		"models": {
			"idleLeft": [
				"assets/Roach/idleLeft/idleLeft0.png",
				"assets/Roach/idleLeft/idleLeft1.png",
				"assets/Roach/idleLeft/idleLeft2.png",
				"assets/Roach/idleLeft/idleLeft3.png",
				"assets/Roach/idleLeft/idleLeft4.png",
			],
			"runningLeft": [
				"assets/Roach/runningLeft/runningLeft0.png",
				"assets/Roach/runningLeft/runningLeft1.png",
				"assets/Roach/runningLeft/runningLeft2.png",
				"assets/Roach/runningLeft/runningLeft3.png"
			],
			"attackingLeft": [
				"assets/Roach/attackingLeft/attackingLeft0.png",
				"assets/Roach/attackingLeft/attackingLeft1.png",
				"assets/Roach/attackingLeft/attackingLeft2.png",
				"assets/Roach/attackingLeft/attackingLeft3.png",
				"assets/Roach/attackingLeft/attackingLeft4.png",
			],
			"idleRight": [
				"assets/Roach/idleRight/idleRight0.png",
				"assets/Roach/idleRight/idleRight1.png",
				"assets/Roach/idleRight/idleRight2.png",
				"assets/Roach/idleRight/idleRight3.png",
				"assets/Roach/idleRight/idleRight4.png",
			],
			"runningRight": [
				"assets/Roach/runningRight/runningRight0.png",
				"assets/Roach/runningRight/runningRight1.png",
				"assets/Roach/runningRight/runningRight2.png",
				"assets/Roach/runningRight/runningRight3.png",
			],
			"attackingRight": [
				"assets/Roach/attackingRight/attackingRight0.png",
				"assets/Roach/attackingRight/attackingRight1.png",
				"assets/Roach/attackingRight/attackingRight2.png",
				"assets/Roach/attackingRight/attackingRight3.png",
				"assets/Roach/attackingRight/attackingRight4.png",
			]
		}
		
	},
	"PLAYER": {
		"models": {
			"idleLeft": [
				"assets/Player/idleLeft/idleLeft0.png",
				"assets/Player/idleLeft/idleLeft1.png",
				"assets/Player/idleLeft/idleLeft2.png",
				"assets/Player/idleLeft/idleLeft3.png",
				"assets/Player/idleLeft/idleLeft4.png"
			],
			"idleRight": [
				"assets/Player/idleRight/idleRight0.png",
				"assets/Player/idleRight/idleRight1.png",
				"assets/Player/idleRight/idleRight2.png",
				"assets/Player/idleRight/idleRight3.png",
				"assets/Player/idleRight/idleRight4.png"
			],
			"runningLeft": [
				"assets/Player/runningLeft/runningLeft0.png",
				"assets/Player/runningLeft/runningLeft1.png"
			],
			"runningRight": [
				"assets/Player/runningRight/runningRight0.png",
				"assets/Player/runningRight/runningRight1.png"
			]
		}
	}
}

var EnemyTypeProperties = {
	"ENEMY_RAT": {
		"health": 50,
		"armor": 0,
		"canFly": false,
		"isPlayer": false
	},
	"ENEMY_ROACH": {
		"health": 25,
		"armor": 50,
		"canFly": false,
		"isPlayer": false
	},
	"PLAYER": {
		"health": 100,
		"armor": 0,
		"canFly": false,
		"isPlayer": false
	}
}