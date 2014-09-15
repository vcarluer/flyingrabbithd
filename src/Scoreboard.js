'use strict';
var Scoreboard = function(game) {
	var gameover;

	Phaser.Group.call(this, game);

	gameover = this.create(this.game.width / 2, 61, 'gameover');
	gameover.anchor.setTo(0.5, 0);

	this.scoreboard = this.create(this.game.width / 2, 170, 'scoreboard');
	this.scoreboard.anchor.setTo(0.5, 0);

	this.scoreText = this.game.add.bitmapText(this.scoreboard.width + 50, 280, 'gameFont', '', 34);
	this.add(this.scoreText);

	this.bestScoreText = this.game.add.bitmapText(this.scoreboard.width + 50, 365, 'gameFont', '', 34);
	this.add(this.bestScoreText);

	// add our start button with a callback
	this.startButton = this.game.add.button(this.game.width/2, 441, 'play', this.startClick, this);
	this.startButton.anchor.setTo(0.5,0);

	this.add(this.startButton);



	this.y = this.game.height;
	this.x = 0;
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.update = function() {

	// write your prefab's specific update code here

};

Scoreboard.prototype.show = function(score) {
	var medal, bestScore;

	// Step 1
	this.scoreText.setText(score.toString());

	if(!!localStorage) {
		// Step 2
		bestScore = localStorage.getItem('bestScore');

		// Step 3
		if(!bestScore || bestScore < score) {
			bestScore = score;
			localStorage.setItem('bestScore', bestScore);
		}
	} else {
		// Fallback. LocalStorage isn't available
		bestScore = 'N/A';
	}

	// Step 4
	this.bestScoreText.setText(bestScore.toString());

	// Step 5 & 6
	// original flappy bird 10 copper 25 silver 50 gold
	if(score >= 10 && score < 25) {
		medal = this.game.add.sprite(-80 , 192, 'medals', 0);
		medal.anchor.setTo(0.5, 0.5);
		this.scoreboard.addChild(medal);
	} else if(score >= 25 && score < 50) {
		medal = this.game.add.sprite(-92 , 190, 'medals', 1);
		medal.anchor.setTo(0.5, 0.5);
		this.scoreboard.addChild(medal);
	} else if(score >= 50) {
        medal = this.game.add.sprite(-92 , 190, 'medals', 2);
        medal.anchor.setTo(0.5, 0.5);
        this.scoreboard.addChild(medal);
    }

	// Step 7
	if (medal) {

		var emitter = this.game.add.emitter(medal.x, medal.y, 400);
		this.scoreboard.addChild(emitter);
		emitter.width = medal.width;
		emitter.height = medal.height;

		emitter.makeParticles('particle');

		emitter.setRotation(-100, 100);
		emitter.setXSpeed(0,0);
		emitter.setYSpeed(0,0);
		emitter.minParticleScale = 0.25;
		emitter.maxParticleScale = 0.5;
		emitter.setAll('body.allowGravity', false);

        medal.scale.setTo(20, 20);
        medal.visible = false;

        this.emitter = emitter;
        this.medal = medal;
        this.event = this.game.time.events.loop(Phaser.Timer.SECOND * 1, this.toto, this);
        this.event.timer.start();

	}
	this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
};

Scoreboard.prototype.toto = function() {
    this.event.timer.stop();
    this.emitter.start(false, 1000, 750);
    this.medal.visible = true;
    this.game.add.tween(this.medal.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false);
};

Scoreboard.prototype.startClick = function() {
	this.game.state.start('Game');
};

// shutdown?