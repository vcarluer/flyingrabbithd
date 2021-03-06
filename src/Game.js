
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function () {
        var self = this;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1200;
        // add the background sprite
        this.background = this.add.sprite(0, 0, 'backgroundMoutain');
        this.backgroundForest = this.game.add.tileSprite(0, 0, 640, 960, 'backgroundForest');
        this.backgroundForest.autoScroll(-27, 0);

        this.backgroundHill = this.game.add.tileSprite(0, 0, 640, 960, 'backgroundHill');
        this.backgroundHill.autoScroll(-111, 0);

        // Create a new bird object
        this.bird = new Rabbit(this.game, 222, this.game.height/2);
        // and add it to the game
        this.game.add.existing(this.bird);

        // create and add a group to hold our pipeGroup prefabs
        this.pipes = this.game.add.group();

        // create and add a new Ground object
        this.ground = new Ground(this.game, 0, 756, 640, 213);
        this.game.add.existing(this.ground);

        this.top = new Ground(this.game, 0, -10, this.game.width, 10);
        this.game.add.existing(this.top);

        this.instructionGroup = this.game.add.group();
		this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 250,'instructions'));
		this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100,'getReady'));
        this.instructionGroup.setAll('anchor.x', 0.5);
        this.instructionGroup.setAll('anchor.y', 0.5);

        // keep the spacebar from propogating up to the browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        // add keyboard controls
        this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.flapKey.onDown.addOnce(this.startGame, this);
        this.flapKey.onDown.add(this.pressSpace, this);


        // add mouse/touch controls
        this.game.input.onDown.addOnce(this.startGame, this);
        this.game.input.onDown.add(this.bird.flap, this.bird);

        this.score = 0;

        this.scoreGroup = this.game.add.group()
        this.scoreStar = this.game.add.sprite(this.game.width/2 - 25, 12, 'star');
		this.scoreText = this.game.add.bitmapText(this.game.width/2 + 25, 0, 'gameFont',this.score.toString(), 46);

        this.scoreGroup.add(this.scoreStar);
        this.scoreGroup.add(this.scoreText);
        this.scoreGroup.setAll('visible', false);

		this.scoreSound = this.game.add.audio('score');
		this.pipeHitSound = this.game.add.audio('pipeHit');
		this.groundHitSound = this.game.add.audio('groundHit');

        var soundX = 25, soundY = 25;
        this.soundButonOn = this.game.add.button(soundX, soundY, 'soundOn', function() { self.switchSound(); });
        this.soundButonOff = this.game.add.button(soundX, soundY, 'soundOff', function() { self.switchSound(); });
        this.soundButonOn.visible = false;
        this.soundButonOff.visible = false;
	},
    pressSpace: function () {
      if (this.bird.alive) {
          this.bird.flap();
      }   else {
          this.scoreboard.startClick();
      }
    },
    switchSound: function () {
        this.game.soundMute = !this.game.soundMute;
        if (this.music) {
            if (!this.game.soundMute) {
                this.music.resume();
            } else {
                this.music.pause();
            }
        }

        this.soundButonOn.visible = !this.game.soundMute;
        this.soundButonOff.visible = this.game.soundMute;
    },
    startGame: function() {
        this.bird.body.allowGravity = true;
        this.bird.alive = true;

        // add a timer
        this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
        this.pipeGenerator.timer.start();

        this.instructionGroup.destroy();
        this.scoreGroup.setAll('visible', true);
    },
    generatePipes: function() {
        var pipeY = this.game.rnd.integerInRange(-100, 100);
        var pipeGroup = this.pipes.getFirstExists(false);
        if(!pipeGroup) {
            pipeGroup = new PipeGroup(this.game, this.pipes);
        }
        pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
    },
    hitPipe: function() {
        this.pipeHitSound.play();
        this.deathHandler();
    },
    hitGround: function() {
        this.groundHitSound.play();
        this.deathHandler();
    },
    deathHandler: function() {
        this.soundButonOn.visible = !this.game.soundMute;
        this.soundButonOff.visible = this.game.soundMute;
        this.scoreGroup.setAll('visible', false);
        this.bird.alive = false;
        this.bird.faint();
        this.pipes.forEach(function (pipeGroup) {
            pipeGroup.setAll('body.velocity.x', 0);
        }, this);

        this.pipes.callAll('stop');
        this.pipeGenerator.timer.stop();
        this.ground.stopScroll();
        this.backgroundForest.stopScroll();
        this.backgroundHill.stopScroll();

        var xRabbit = - 837;
        this.rabbit = this.game.add.sprite(xRabbit, 300,'bigrabbit');
        this.game.add.tween(this.rabbit).to({x:xRabbit + 500}, 1500, Phaser.Easing.Elastic.Out, true, 1000, 0, false);

        this.scoreboard = new Scoreboard(this.game);
        this.game.add.existing(this.scoreboard);
        this.scoreboard.show(this.score);
    },
    checkScore: function(pipeGroup) {
        if(pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
            pipeGroup.hasScored = true;
            this.score++;
            this.scoreText.setText(this.score.toString());
            this.scoreSound.play();
        }
    },
    shutdown: function() {
        this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        this.bird.destroy();
        this.pipes.destroy();
        this.scoreboard.destroy();
	    // MORE?

    },
    update: function() {
        if (this.bird.alive) {
            // enable collisions between the bird and the ground
            this.game.physics.arcade.collide(this.bird, this.ground, this.hitGround, null, this);
            this.game.physics.arcade.collide(this.bird, this.top, null, null, this);
            // enable collisions between the bird and each group in the pipes group
            this.pipes.forEach(function (pipeGroup) {
                this.checkScore(pipeGroup);
                this.game.physics.arcade.collide(this.bird, pipeGroup, this.hitPipe, null, this);
            }, this);
        }
    }
};
