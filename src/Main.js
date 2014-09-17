'use strict';

window.onload = function () {
	var width = 640;
	var height = 960;
	var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');

	game.state.add('Boot', BasicGame.Boot);
    	game.state.add('CheckOrientation', BasicGame.CheckOrientation);
	game.state.add('GamersAssociate', BasicGame.GamersAssociate);
	game.state.add('Preloader', BasicGame.Preloader);
	game.state.add('MainMenu', BasicGame.MainMenu);
	game.state.add('Game', BasicGame.Game);

	game.state.start('Boot');
};
