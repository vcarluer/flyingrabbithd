
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {


		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.add.sprite(0, 0, 'preloaderBackground');

		this.game.paddingBot = 64;

		var barWidth = 600;
		var barHeight = 106;
		var barPaddingBot = 10
        var barX = (this.game.width - barWidth) / 2;
        var barY = this.game.height - barHeight - barPaddingBot - this.game.paddingBot;
        this.add.sprite(barX, barY, 'preloaderBarGray');
		this.preloadBar = this.add.sprite(barX, barY, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, the lines below won't work as the files themselves will 404, they are just an example of use.
		// this.load.atlas('playButton', 'images/button_sprite_sheet.png', 'images/button_sprite_sheet.json');
        this.load.image('ga', 'images/ga.png');
        this.load.audio('gaHeartbeat', ['audio/heartbeat.mp3', 'audio/heartbeat.ogg']);

        // GAME
		this.load.image('soundOn', 'images/control-sound-on.png');
		this.load.image('soundOff', 'images/control-sound-off.png');

        this.load.image('background', 'images/background.png');
        this.load.image('ground', 'images/ground.png');
        this.load.image('title', 'images/title.png');
		this.load.image('play', 'images/control-play.png');
		this.load.image('instructions', 'images/instructions.png');
		this.load.image('getReady', 'images/get-ready.png');

		this.load.spritesheet('pipe', 'images/pipes.png', 121,608,2);
        this.load.spritesheet('rabbit', 'images/rabbit.png', 53, 53, 9);

		// TO CHANGE!!!!!!!!!
		// http://kvazars.com/littera/
		this.load.bitmapFont('gameFont', 'fonts/font.png', 'fonts/font.fnt');

		this.load.audio('menuSelect', ['audio/menuselect.mp3', 'audio/menuselect.ogg']);
		this.load.audio('score', 'audio/score.wav');
		this.load.audio('flap', 'audio/flap.wav');
		this.load.audio('pipeHit', 'audio/pipe-hit.wav');
		this.load.audio('groundHit', 'audio/ground-hit.wav');

		this.load.image('scoreboard', 'images/scoreboard.png');
		this.load.image('gameover', 'images/gameover.png');
		this.load.spritesheet('medals', 'images/medals.png', 44, 46, 2);
		this.load.image('particle', 'images/particle.png');

		// See update below if music is added
		// this.load.audio('titleMusic', ['audio/main_menu.mp3']);
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
	},

	update: function () {

		//	You don't actually need to do this,odes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode but I find it gives a much smoother game experience.
        //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //	You can jump right into the menu if you want and still play the music, but you'll have a few
        //	seconds of delay while the mp3 dec here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.


		// Add this if there is music
        // this.cache.isSoundDecoded('titleMusic') &&
		if (this.ready == false)
		{
			this.ready = true;
			this.state.start('GamersAssociate');
		}
	}

};
