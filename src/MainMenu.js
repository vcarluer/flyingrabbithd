
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
        var self = this;

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
        this.game.soundMute = false;
        this.menuSelect = this.add.audio('menuSelect');

		if (this.music) {
			this.music.play();
		}

        this.background = this.add.sprite(0, 0, 'backgroundMoutain');
        this.backgroundForest = this.game.add.tileSprite(0, 0, 640, 960, 'backgroundForest');
        this.backgroundForest.autoScroll(-27, 0);

        this.backgroundHill = this.game.add.tileSprite(0, 0, 640, 960, 'backgroundHill');
        this.backgroundHill.autoScroll(-111, 0);

        this.ground = this.game.add.tileSprite(0, 756, 640, 213, 'ground');
        this.ground.autoScroll(-444, 0);

        /** STEP 1 **/
            // create a group to put the title assets in
            // so they can be manipulated as a whole
        this.titleGroup = this.game.add.group();

        /** STEP 3 **/
            // create the rabbit sprite
            // and add it to the title group
        this.rabbit = this.game.add.sprite(-380,-140,'bigrabbit');
        this.titleGroup.add(this.rabbit);


        /** STEP 2 **/
            // create the title sprite
            // and add it to the group
        this.title = this.game.add.sprite(this.game.width / 2 + 15, 10,'title');
        this.title.anchor.setTo(0.5, 0);
        // this.titleGroup.add(this.title);


        /** STEP 4 **/
            // add an animation to the rabbit
            // and begin the animation
        /*this.rabbit.animations.add('flap', [0,1,2,3,4,5,6,7], true, true);
        this.rabbit.animations.play('flap', 12, true);*/

        /** STEP 5 **/
            // Set the originating location of the group
        this.titleGroup.x = 60;
        this.titleGroup.y = 100;

        /** STEP 6 **/
            // create an oscillating animation tween for the group
        this.game.add.tween(this.titleGroup).to({y:115}, 333, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

        var soundX = 25, soundY = 25;
        this.soundButonOn = this.game.add.button(soundX, soundY, 'soundOn', function() { self.switchSound(); });
        this.soundButonOff = this.game.add.button(soundX, soundY, 'soundOff', function() { self.switchSound(); });
        this.soundButonOff.visible = false;

		var playHeight = 102;
		var playPadding = 160;
		this.playButton = this.add.button(
			this.game.width / 2,
			this.game.height - playHeight / 2 - playPadding - this.game.paddingBot,
			'play',
			this.startGame,
			this);
        this.playButton.anchor.setTo(0.5, 0.5);
	},

	update: function () {
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

	startGame: function (pointer) {
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		if (this.music) {
            this.music.stop();
        }

        if (!this.game.soundMute) {
            this.menuSelect.play();
        }

        this.game.add.tween(this.playButton.scale).
            to( { x: 1.1, y: 1.1 }, 150, Phaser.Easing.Linear.None, true, 0, 0, true)
            .onComplete.add(this.startGameInternal, this);

	},

    startGameInternal: function() {
        this.state.start('Game');
    },

	shutdown: function() {
		if (this.music) {
			this.music.destroy();
		}

		this.menuSelect.destroy();
		this.ground.destroy();
		this.title.destroy();
		this.rabbit.destroy();
		this.titleGroup.destroy();
		this.soundButonOn.destroy();
		this.soundButonOff.destroy();
		this.playButton.destroy();
	}

};
