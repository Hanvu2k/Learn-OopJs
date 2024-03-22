const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 778);
const CANVAS_HEIGHT = (canvas.height = 625);
const spriteWidth = 1038;
const spriteHeight = 833;
const myImg = document.getElementById("myImg");
const fps = 16;
const secondsToUpdate = 1 * fps;
let frameIndex = 0;
let count = 0;

function animate() {
  ctx.drawImage(
    myImg,
    spriteWidth * frameIndex,
    spriteHeight * 1,
    spriteWidth,
    spriteHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );

  count++;
  if (count > secondsToUpdate) {
    frameIndex++;
    count = 0;
  }

  if (frameIndex >= 6) {
    frameIndex = 0;
  }
}

const frame = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  animate();
  requestAnimationFrame(frame);
};

frame();
