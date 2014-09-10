
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

       /* this.load.image('title', 'images/title.png');
        this.load.image('backgroundMenu', 'images/background_menu.png');
        this.load.image('play', 'images/control-play.png');
        this.load.audio('menuSelect', ['audio/menuselect.mp3', 'audio/menuselect.ogg']);
        this.load.image('soundOn', 'images/control-sound-on.png');
        this.load.image('soundOff', 'images/control-sound-off.png');
        this.load.image('pause', 'images/control-pause.png');
        this.load.image('home', 'images/control-home.png');
        this.load.image('restart', 'images/control-restart.png');

		this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		this.load.bitmapFont('gameFont', 'fonts/desyrel-pink.png', 'fonts/desyrel-pink.xml');
		//	+ lots of other required assets here
		this.load.image('background', 'images/background.png');
		this.load.image('board', 'images/board.png');

        // GAME
        this.load.image('gameover', 'images/gameover.png');*/
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			//this.state.start('GamersAssociate');
		}
	}

};
