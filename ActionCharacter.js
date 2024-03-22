const app = document.querySelector("#app");
class Animation {
  #canvas = document.createElement("canvas");
  #ctx = this.#canvas.getContext("2d");
  #count = 0;
  #posX = 0;
  #posY = 0;
  #currentPos = 0;
  #secondsToUpdate = 20;

  #actionFrame = {
    name: "",
    frameIndex: 1,
    frameLength: 0,
    frame: 1,
  };

  constructor(imgSrc, height, width) {
    this.CANVAS_WIDTH = this.#canvas.width = width;
    this.CANVAS_HEIGHT = this.#canvas.height = height;
    this.spriteWidth = 1024;
    this.spriteHeight = 830;
    this.img = new Image();
    this.img.src = imgSrc;
  }

  createCharacter() {
    app.appendChild(this.#canvas);
  }

  characterAction(action) {
    if (!action) return (this.#actionFrame.name = "");
    this.#actionFrame.name = action;
  }

  animate() {
    switch (this.#actionFrame.name) {
      case "WalkRight": {
        this.#posX += 1;
        this.#actionFrame.frame = 0;
        this.#actionFrame.frameLength = 3;
        if (this.#posX >= this.CANVAS_WIDTH) this.#posX = 0;
        this.#currentPos = this.#posX;
        break;
      }
      case "WalkLeft": {
        this.posX = this.#currentPos - 1;
        this.#actionFrame.frame = 4;
        this.#actionFrame.frameLength = 3;
        break;
      }
      case "Attack": {
        this.#secondsToUpdate = 18;
        this.#actionFrame.frame = 1;
        this.#actionFrame.frameLength = 5;
        break;
      }
      case "AttackLeft": {
        this.#actionFrame.frame = 5;
        this.#actionFrame.frameLength = 5;
        break;
      }
      case "AttackMoveRight": {
        this.#posX += 1;
        this.#actionFrame.frame = 1;
        this.#actionFrame.frameLength = 5;
        if (this.#posX >= this.CANVAS_WIDTH) this.#posX = 0;
        break;
      }
      case "Jump": {
        this.#secondsToUpdate = 20;
        this.#posX += 4;
        this.#actionFrame.frame = 2;
        this.#actionFrame.frameLength = 8;
        if (this.#posX >= this.CANVAS_WIDTH) this.#posX = 0;
        break;
      }
      case "Dash": {
        this.#secondsToUpdate = 50;
        this.#posX += 3;
        this.#actionFrame.frame = 3;
        this.#actionFrame.frameLength = 6;
        if (this.#posX >= this.CANVAS_WIDTH) this.#posX = 0;
        break;
      }
      default: {
        this.#actionFrame.frame = 2;
        this.#actionFrame.frameLength = 1;
      }
    }

    const scaledSpriteWidth =
      this.spriteWidth * (this.CANVAS_HEIGHT / this.spriteHeight);
    const scaledSpriteHeight = this.CANVAS_HEIGHT;

    this.#ctx.drawImage(
      this.img,
      this.spriteWidth * this.#actionFrame.frameIndex,
      this.spriteHeight * this.#actionFrame.frame,
      this.spriteWidth,
      this.spriteHeight,
      this.#posX,
      this.#posY,
      scaledSpriteWidth,
      scaledSpriteHeight
    );

    this.#count++;
    if (this.#count > this.#secondsToUpdate) {
      this.#actionFrame.frameIndex++;
      this.#count = 0;
    }

    if (this.#actionFrame.frameIndex >= this.#actionFrame.frameLength) {
      this.#actionFrame.frameIndex = 0;
    }
  }

  frame() {
    this.#ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.animate();
    requestAnimationFrame(this.frame.bind(this));
  }

  start() {
    this.frame();
  }
}

const character = new Animation("./img/spi/sprite2.png", 625, 1500);
character.createCharacter();
character.start();

let keysPressed = {};

window.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
  switch (e.key) {
    case "ArrowRight":
      character.characterAction("WalkRight");
      break;
    case "ArrowLeft":
      character.characterAction("WalkLeft");
      break;
    case "a":
      character.characterAction("Attack");
      break;
    case "s":
      character.characterAction("AttackLeft");
      break;
    case "ArrowUp":
      character.characterAction("Jump");
      break;
    case "f":
      character.characterAction("Dash");
      break;
  }

  if (keysPressed["a"] && keysPressed["ArrowRight"]) {
    character.characterAction("AttackMoveRight");
  }
});

window.addEventListener("keyup", (e) => {
  character.characterAction("");
  delete keysPressed[e.key];
});

character.characterAction("test");
