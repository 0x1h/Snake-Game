const score = document.querySelector("h1") as HTMLElement
let point: number = 0
score.innerHTML = `Score: ${point}`

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.background = "#FFF";

canvas.width = 400;
canvas.height = 400;

const scale: number = 10;

const rows: number = canvas.width / scale;
const colums: number = canvas.height / scale;

function Snake(this: any) {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];

  this.draw = () => {
    if (ctx) {
      ctx.fillStyle = "#57ff54";
      for (let i = 0; i < this.tail.length; i++) {
        ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
      }
      ctx.fillRect(this.x, this.y, scale, scale)
    }
  };
  this.update = () => {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0) this.x = canvas.width;
    if (this.y < 0) this.y = canvas.height;
    if (this.x > canvas.width) this.x = 0;
    if (this.y > canvas.height) this.y = 0;
  };
  this.movement = (move: string) => {
    switch (move) {
      case "Up":
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
        break;
      case "Down":
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
        break;
      case "Left":
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
        break;
      case "Right":
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        break;
    }
  };
  this.eat = (fruit: any) => {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      point++
      score.innerHTML = `Score: ${point}`
      fruit.randomLocation();
      fruit.spawnFruit();
    }
  };
}

function Fruit(this: any) {
  this.x;
  this.y;

  this.randomLocation = () => {
    this.x = Math.floor(Math.random() * colums - 1 + 1) * scale;
    this.y = Math.floor(Math.random() * rows - 1 + 1) * scale;
  };

  this.spawnFruit = () => {
    if (ctx) {
      ctx.fillStyle = "#ff5454";
      ctx.fillRect(this.x, this.y, scale, scale);
    }
  };
}

let snake = new (Snake as any)();
let fruit = new (Fruit as any)();

const Setup = () => {
  fruit.randomLocation();
  snake.draw();

  window.setInterval(() => {
    if (ctx) ctx.clearRect(0, 0, canvas.height, canvas.width);
    fruit.spawnFruit();

    snake.update();
    snake.draw();

    snake.eat(fruit);
  }, 100);
};

window.addEventListener("keyup", (e) => {
  const direction: string = e.code.replace("Arrow", "");
  snake.movement(direction);
});

Setup();
