"use strict";

var arrayGemX = [0, 100, 200, 305, 405, 505, 605, 705],
    arrayGemY = [60, 130, 220],
    arrayGemSprite = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'],
    arrayPlayerSprite = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'],
    count = 7000,
    life = 3,
    startVelocityNumber = 2,
    waterSound = new Audio('sounds/water.mp3'),
    deathSound = new Audio('sounds/death.mp3');


// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 100;


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    document.querySelector('p').innerHTML = "POINTS " + count + "   LIVES: " + life;
    count--;
    if (this.x < 809) {
        this.x += this.velocity * dt;

    }
    else {
        this.move();
        this.x = 0;

    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {

    //console.log(this.sprite, this.x,this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};

Enemy.prototype.move = function () {


    this.velocity = (Math.floor((Math.random() * (180 - 90)) + 90)) * startVelocityNumber;

    return this.velocity;

};

Enemy.prototype.position = function (y) {


    this.y = y;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = arrayPlayerSprite[random(5)];
    this.x = 404;
    this.y = 420;
};

Player.prototype.update = function () {


};
// Render player sprite and calculate his points
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (count <= 0) {
        reset();
    }
    if ((distance(player.x, player.y, enemy.x, enemy.y)) < 50) {
        deathSound.play();
        life--;
        if (life === 0) {
            document.querySelector('p').innerHTML = "POINTS " + count + "   LIVES: " + life;
            reset();
        }
        else {
            count -= 1000;
            this.x = 200;
            this.y = 420;
        }
    }
    else if ((distance(player.x, player.y, enemy1.x, enemy1.y)) < 50) {
        deathSound.play();
        life--;
        if (life === 0) {
            document.querySelector('p').innerHTML = "POINTS " + count + "   LIVES: " + life;
            reset();
        }
        else {
            count -= 1000;
            this.x = 200;
            this.y = 420;
        }
    }
    else if ((distance(player.x, player.y, enemy2.x, enemy2.y)) < 50) {
        deathSound.play();
        life--;
        if (life === 0) {
            document.querySelector('p').innerHTML = "POINTS " + count + "   LIVES: " + life;
            reset();
        }
        else {
            count -= 1000;
            this.x = 200;
            this.y = 420;
        }
    }


};

//Player hendler, manage actions of player
Player.prototype.handleInput = function (env) {

    if (this.x < 10) {
        this.x += 30;
    }
    else if (this.x > 709) {
        this.x -= 30;
    }
    else if (this.y > 400) {
        this.y -= 30;
    }
    else if (this.y < 10) {

        waterSound.play();
        count -= 1000;
        startVelocityNumber += 0.5;
        this.x = 200;
        this.y = 420;

    }

    switch (env) {
        case  "up" :
            this.y -= 30;
            break;
        case "down" :
            this.y += 30;
            break;
        case  "right" :
            this.x += 30;
             break;
        case "left" :
            this.x -= 30;
            break;
        case "space" :
            reset();
            start();
            break;


    }



};

//Create Gem Object. A player when take a gem earn  more time
var Gem = function () {

    this.sprite = arrayGemSprite[random(3)];
    this.x = arrayGemX[random(8)];
    this.y = arrayGemY[random(3)];


};

// Update gem position and if player bump to gem the player earn time and the gem position will be reset
Gem.prototype.update = function () {

    if (distance(player.x, player.y, gem.x, gem.y) < 50) {
        count += 1000;
        this.sprite = arrayGemSprite[random(3)];
        gem.x = arrayGemX[random(8)];
        gem.y = arrayGemY[random(3)];

    }


};
// Render the gem
Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var enemy = new Enemy();
enemy.position(60);
var enemy1 = new Enemy();
enemy1.position(130);

var enemy2 = new Enemy();
enemy2.position(220);

var allEnemies = [enemy, enemy1, enemy2];

var player = new Player();
var gem = new Gem();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Create random function
function random(n) {

    return Math.floor((Math.random() * n));


}
//Create distance function, that function accept 4 arguments,
// x and y of object one and x and y of object 2.
function distance(x1, y1, x2, y2) {

    var dx = x1 - x2;
    var dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);

}








