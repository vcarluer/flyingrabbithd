'use strict';

var Rabbit = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'rabbit', frame);

    // initialize your prefab here
    // set the sprite's anchor to the center
    this.anchor.setTo(0.5, 0.5);

    // add and play animations
    this.animations.add('flap', [0,1,2,3,4,5,6,7], true, true);

    this.animations.add('faint', [8], true, true);
    this.animations.play('flap', 12, true);

    this.game.physics.arcade.enableBody(this);

    this.body.setSize(this.body.width * 0.7, this.body.height * 0.7, 10, 0);
    this.body.allowGravity = false;
    this.alive = false;
    this.flapSound = this.game.add.audio('flap');
};

Rabbit.prototype = Object.create(Phaser.Sprite.prototype);
Rabbit.prototype.constructor = Rabbit;

Rabbit.prototype.update = function() {
    // check to see if our angle is less than 90
    // if it is rotate the bird towards the ground by 2.5 degrees
    if(this.angle < 90 && this.alive) {
        this.angle += 2.5;
    }
};

Rabbit.prototype.faint = function() {
    this.animations.play('faint');
};

Rabbit.prototype.flap = function() {
    if (this.alive) {
        this.flapSound.play();
        this.body.velocity.y = -400;
        // rotate the bird to -40 degrees
        this.game.add.tween(this).to({angle: -40}, 100).start();
    }
};
