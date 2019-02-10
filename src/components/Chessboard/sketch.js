import "p5/lib/addons/p5.sound";
import Board from "./Board";
import chess from "chess.js";

var boxSize = 64;
let chessboard;
let props;
let setupDone = false;

export default function sketch(p) {
  p.preload = () => {
    p["imgs"] = {};
    p.imgs["k"] = p.loadImage("/assets/bK.png");
    p.imgs["q"] = p.loadImage("/assets/bQ.png");
    p.imgs["p"] = p.loadImage("/assets/bP.png");
    p.imgs["b"] = p.loadImage("/assets/bB.png");
    p.imgs["n"] = p.loadImage("/assets/bN.png");
    p.imgs["r"] = p.loadImage("/assets/bR.png");
    p.imgs["K"] = p.loadImage("/assets/wK.png");
    p.imgs["Q"] = p.loadImage("/assets/wQ.png");
    p.imgs["P"] = p.loadImage("/assets/wP.png");
    p.imgs["B"] = p.loadImage("/assets/wB.png");
    p.imgs["N"] = p.loadImage("/assets/wN.png");
    p.imgs["R"] = p.loadImage("/assets/wR.png");
    p["sounds"] = {};
    p.sounds["illegal"] = p.loadSound("/assets/illegal.mp3");
    p.sounds["move"] = p.loadSound("/assets/move.mp3");
    p.sounds["capture"] = p.loadSound("/assets/capture.mp3");
    p.sounds["time"] = p.loadSound("/assets/time.mp3");
    p.sounds["castle"] = p.loadSound("/assets/castle.mp3");
    p.sounds["win"] = p.loadSound("/assets/win.mp3");
    p.sounds["lose"] = p.loadSound("/assets/lose.mp3");
    p.sounds["check"] = p.loadSound("/assets/check.mp3");
  };

  p.setup = () => {
    p.frameRate(30);
    p.createCanvas(800, 800);
    p.textSize(30);
    boxSize = p.width / 8;
    props.socket.on("move", data => {
      chessboard.move(data, p);
      p.redraw();
    });
    p.noLoop();
    console.log(props);
    chessboard = new Board(
      boxSize,
      new chess(props.fen),
      props.color,
      p.color(182, 136, 97),
      p.color(240, 216, 179)
    );
    setupDone = true;
    p.windowResized();
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (tprops) {
    props = tprops;
  };

  p.draw = () => {
    p.background(255);
    chessboard.show(p);
  };

  p.windowResized = () => {
    if (!setupDone) return;
    let size = p.min(
      document.getElementById("chesscol").offsetWidth,
      p.windowHeight
    );
    p.resizeCanvas(size, size);
    boxSize = size / 8;
    chessboard.resize(boxSize);
    p.redraw();
  };

  p.mouseMoved = () => {
    if (!setupDone) return;
    if (chessboard.dragged) p.redraw();
  };
  p.mouseDragged = () => {
    if (!setupDone) return;
    if (chessboard.dragged) p.redraw();
  }

  p.mousePressed = (e) => {
    if (!setupDone) return;
    if (e.which == 1) {
      chessboard.click(p);
    }
  };

  p.mouseReleased = (e) => {
    if (!setupDone) return;
    if (e.which == 1) {
      chessboard.release(p);
    } else if (e.which == 3) {
      chessboard.resetDrag(p);
    }
  };

  p.keyPressed = () => {
    if (!setupDone) return;
    if (p.keyCode == 32) {
      chessboard.swapBoard();
      p.redraw();
    }
  };

  p.isInCanvas = () => {
    return (
      p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height
    );
  };
}
