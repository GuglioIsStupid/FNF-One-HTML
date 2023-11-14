// get the html canvas (MainGame) in body
var canvas = document.getElementById("MainGame");

var cache = {};

Sprite = function (x, y, path) {
    this.x = x;
    this.y = y;
    this.path = path;
    this.image = null;
    this.width = 0;
    this.height = 0;
    this.loaded = false;
    this.load();
}

Sprite.prototype.load = function () {
    // check if image is in cache, else load it
    if (cache[this.path]) {
        this.image = cache[this.path];
        this.loaded = true;
    } else {
        this.image = new Image();
        this.image.src = this.path;
        this.image.onload = function () {
            this.loaded = true;
            cache[this.path] = this.image;
        }.bind(this);
    }

    console.log("Sprite loaded: " + this.path);
}

Sprite.prototype.update = function () {
    // sin left and right
    this.x += Math.sin(this.x);
    this.y += Math.sin(this.y);
}

Sprite.prototype.draw = function (ctx) {
    if (this.loaded) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

var sprite = new Sprite(0, 0, "game/assets/OIP.jpg");
 
// get the context of the canvas
var ctx = canvas.getContext("2d");

// set the width and height of the canvas
canvas.width = 1280;
canvas.height = 720;

// while the game is running
var running = true;

// game loop
function loop() {
    // update
    sprite.update();

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw
    sprite.draw(ctx);

    // call loop function again
    if (running) {
        window.requestAnimationFrame(loop);
    }
}