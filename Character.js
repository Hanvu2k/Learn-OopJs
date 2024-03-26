const app = document.querySelector("#app");

class Action {
  constructor(orderFrame, indexFrame, lengthFrame) {
    this.indexFrame = indexFrame;
    this.orderFrame = orderFrame;
    this.lengthFrame = lengthFrame;
    this.createAction();
  }

  createAction() {
    return {
      name: this.name,
      orderFrame: this.orderFrame,
      indexFrame: this.indexFrame,
      lengthFrame: this.lengthFrame,
    };
  }
}

class Character {
  #canvas = document.createElement("canvas");
  #context = this.#canvas.getContext("2d");
  #count = 0;
  #posX = 0;
  #posY = 50;
  #secondsToUpdate = 10;
  #charAction = {
    orderFrame: 0,
    indexFrame: 0,
    lengthFrame: 0,
  };

  constructor(imgSrc, height, width, spriteWidth, spriteHeight) {
    this.img = new Image();
    this.img.src = imgSrc;
    this.CANVAS_WIDTH = this.#canvas.width = width;
    this.CANVAS_HEIGHT = this.#canvas.height = height;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
  }

  createCharacter() {
    app.appendChild(this.#canvas);
  }

  characterAction(action) {
    switch (action) {
      case "moveRight": {
        const action = new Action(0, 1, 9);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
        break;
      }
      case "Block": {
        const action = new Action(1, 1, 9);
        this.#charAction = {
          ...this.#charAction,
          ...action,
          beginFrame: action.indexFrame,
        };
        break;
      }
      case "Jump": {
        const action = new Action(1, 0, 9);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
        break;
      }
      case "Fall": {
        const action = new Action(2, 0, 9);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
        break;
      }
      case "Hitted": {
        const action = new Action(2, 0, 9);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
        break;
      }
      case "Roll": {
        const action = new Action(4, 0, 9);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
        break;
      }
      case "StandUp": {
        const action = new Action(5, 0, 9);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
        break;
      }
      case "Punch": {
        const action = new Action(7, 0, 9);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
        break;
      }
      case "Kick": {
        const action = new Action(7, 0, 9);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
        break;
      }
      case "Teleport": {
        const action = new Action(11, 6, 3);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
        break;
      }
      case "Cheer": {
        const action = new Action(6, 0, 6);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
        break;
      }
      default: {
        const action = new Action(0, 0, 4);
        this.#charAction = {
          ...this.#charAction,
          ...action,
        };
      }
    }
  }

  animation() {
    const scaledSpriteWidth =
      this.spriteWidth * (this.CANVAS_HEIGHT / this.spriteHeight);
    const scaledSpriteHeight = this.CANVAS_HEIGHT;

    this.#context.drawImage(
      this.img,
      this.spriteWidth * this.#charAction.indexFrame,
      this.spriteHeight * this.#charAction.orderFrame,
      this.spriteWidth,
      this.spriteHeight,
      this.#posX,
      this.#posY,
      scaledSpriteWidth,
      scaledSpriteHeight
    );

    this.#count++;

    if (this.#count > this.#secondsToUpdate) {
      this.#charAction.indexFrame++;
      this.#count = 0;
    }

    if (this.#charAction.indexFrame >= this.#charAction.lengthFrame) {
      this.#charAction.indexFrame = 0;
    }
  }

  frame() {
    this.#context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.animation();
    requestAnimationFrame(this.frame.bind(this));
  }

  start() {
    this.frame();
  }
}

const character = new Character("./img/spi/GoKu.png", 500, 1910, 94, 120);
character.createCharacter();
character.start();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      character.characterAction("moveRight");
      break;
    case "ArrowUp":
      character.characterAction("Jump");
      break;
    case "ArrowLeft":
      character.characterAction("Block");
      break;
    case "q":
      character.characterAction("Punch");
      break;
    case "w":
      character.characterAction("Kick");
      break;
    case "f":
      character.characterAction("Teleport");
      break;
    case "s":
      character.characterAction("Roll");
      break;
    case "e":
      character.characterAction("Cheer");
      break;
  }
});
