const app = document.querySelector("#app");

class Character {
  #height = 300;
  #width = 300;
  #left = 50;
  #char = document.createElement("div");

  constructor(image) {
    this.image = image;
  }

  createCharacter() {
    this.#char.style.height = this.#height + "px";
    this.#char.style.width = this.#width + "px";
    this.#char.style.backgroundImage = "url(" + this.image + ")";
    this.#char.style.backgroundSize = "cover";
    this.#char.style.position = "absolute";
    this.#char.style.top = "50%";
    this.#char.style.left = `${this.#left}%`;
    this.#char.style.transform = "translate(-50%, -50%)";

    return this.#char;
  }

  move(action) {
    this.#char.style.backgroundImage = "url()";
    this.#char.style.animation = `${action.name} ${action.time}s cubic-bezier(0.075, 0.82, 0.165, 2) infinite forwards`;
  }

  stop() {
    this.#char.style.backgroundImage = "url(" + this.image + ")";
    this.#char.style.animation = "";
  }
}

// action
class ActionCharacter {
  constructor(images, name, time) {
    this.images = images || [];
    this.name = name;
    this.time = time;

    this.createKeyframes();
  }

  #actionKeyFrame() {
    let keyFramesContent = "";
    let increment = 0;

    for (let img of this.images) {
      keyFramesContent += ` ${increment}% { background-image: url('${img}'); }`;
      increment += 100 / this.images.length;
    }

    return `
      @keyframes ${this.name} {
        ${keyFramesContent}
      }
    `;
  }

  createKeyframes() {
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    styleElement.sheet.insertRule(this.#actionKeyFrame(), 0);
  }
}

const character = new Character("./img/runToRight/right1.png");
const moveRight = new ActionCharacter(
  [
    "./img/runRight/run1.png",
    "./img/runRight/run2.png",
    "./img/runRight/run3.png",
    "./img/runRight/run4.png",
    "./img/runRight/run5.png",
    "./img/runRight/run6.png",
  ],
  "runRight",
  0.8
);

const walkRight = new ActionCharacter(
  [
    "./img/runToRight/right2.png",
    "./img/runToRight/right3.png",
    "./img/runToRight/right4.png",
    "./img/runToRight/right5.png",
    "./img/runToRight/right6.png",
  ],
  "walkRight",
  1
);

const jump = new ActionCharacter(
  [
    "./img/jump/jum1.png",
    "./img/jump/jum2.png",
    "./img/jump/jum3.png",
    "./img/jump/jum4.png",
    "./img/jump/jum5.png",
    "./img/jump/jum6.png",
  ],
  "jump",
  0.8
);

const characterEl = character.createCharacter();
app.appendChild(characterEl);

const handleMovement = (e) => {
  switch (e.key) {
    case "e":
      character.move(moveRight);
      break;
    case "ArrowUp":
      character.move(jump);
      break;
    case "ArrowRight":
      character.move(walkRight);
      break;
    default:
      character.stop();
  }
};

window.addEventListener("keydown", (e) => handleMovement(e));

window.addEventListener("keyup", () => character.stop());
