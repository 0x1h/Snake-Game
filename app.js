"use strict";
var score = document.querySelector("h1");
var point = 0;
score.innerHTML = "Score: " + point;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.background = "#FFF";
canvas.width = 400;
canvas.height = 400;
var scale = 10;
var rows = canvas.width / scale;
var colums = canvas.height / scale;
function Snake() {
    var _this = this;
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.draw = function () {
        if (ctx) {
            ctx.fillStyle = "#57ff54";
            for (var i = 0; i < _this.tail.length; i++) {
                ctx.fillRect(_this.tail[i].x, _this.tail[i].y, scale, scale);
            }
            ctx.fillRect(_this.x, _this.y, scale, scale);
        }
    };
    this.update = function () {
        for (var i = 0; i < _this.tail.length - 1; i++) {
            _this.tail[i] = _this.tail[i + 1];
        }
        _this.tail[_this.total - 1] = { x: _this.x, y: _this.y };
        _this.x += _this.xSpeed;
        _this.y += _this.ySpeed;
        if (_this.x < 0)
            _this.x = canvas.width;
        if (_this.y < 0)
            _this.y = canvas.height;
        if (_this.x > canvas.width)
            _this.x = 0;
        if (_this.y > canvas.height)
            _this.y = 0;
    };
    this.movement = function (move) {
        switch (move) {
            case "Up":
                _this.xSpeed = 0;
                _this.ySpeed = -scale * 1;
                break;
            case "Down":
                _this.xSpeed = 0;
                _this.ySpeed = scale * 1;
                break;
            case "Left":
                _this.xSpeed = -scale * 1;
                _this.ySpeed = 0;
                break;
            case "Right":
                _this.xSpeed = scale * 1;
                _this.ySpeed = 0;
                break;
        }
    };
    this.eat = function (fruit) {
        if (_this.x === fruit.x && _this.y === fruit.y) {
            _this.total++;
            point++;
            score.innerHTML = "Score: " + point;
            fruit.randomLocation();
            fruit.spawnFruit();
        }
    };
}
function Fruit() {
    var _this = this;
    this.x;
    this.y;
    this.randomLocation = function () {
        _this.x = Math.floor(Math.random() * colums - 1 + 1) * scale;
        _this.y = Math.floor(Math.random() * rows - 1 + 1) * scale;
    };
    this.spawnFruit = function () {
        if (ctx) {
            ctx.fillStyle = "#ff5454";
            ctx.fillRect(_this.x, _this.y, scale, scale);
        }
    };
}
var snake = new Snake();
var fruit = new Fruit();
var Setup = function () {
    fruit.randomLocation();
    snake.draw();
    window.setInterval(function () {
        if (ctx)
            ctx.clearRect(0, 0, canvas.height, canvas.width);
        fruit.spawnFruit();
        snake.update();
        snake.draw();
        snake.eat(fruit);
    }, 100);
};
window.addEventListener("keyup", function (e) {
    var direction = e.code.replace("Arrow", "");
    snake.movement(direction);
});
Setup();
