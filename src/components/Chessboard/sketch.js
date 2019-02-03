import Board from "./Board";
import chess from "chess.js";

var boxSize = 64;
let chessboard;
let socket;
let color;

export default function sketch(p) {
  p.preload = () => {
    p["imgs"] = {};
    p.imgs["k"] = p.loadImage("assets/bK.png");
    p.imgs["q"] = p.loadImage("assets/bQ.png");
    p.imgs["p"] = p.loadImage("assets/bP.png");
    p.imgs["b"] = p.loadImage("assets/bB.png");
    p.imgs["n"] = p.loadImage("assets/bN.png");
    p.imgs["r"] = p.loadImage("assets/bR.png");
    p.imgs["K"] = p.loadImage("assets/wK.png");
    p.imgs["Q"] = p.loadImage("assets/wQ.png");
    p.imgs["P"] = p.loadImage("assets/wP.png");
    p.imgs["B"] = p.loadImage("assets/wB.png");
    p.imgs["N"] = p.loadImage("assets/wN.png");
    p.imgs["R"] = p.loadImage("assets/wR.png");
  };
  p.setup = () => {
    p.frameRate(30);
    p.createCanvas(800, 800);
    p.textSize(30);
    boxSize = p.width / 8;
    socket.on("move", data => {
      chessboard.move(data);
      p.redraw();
    });
    p.windowResized();
    p.noLoop();
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    socket = props.socket;
    chessboard = new Board(boxSize, new chess(props.fen), props.color);
  };

  p.draw = () => {
    p.background(255);
    chessboard.show(p);
  };

  p.windowResized = () => {
    let size = p.min(p.windowWidth, p.windowHeight);
    p.resizeCanvas(size, size);
    boxSize = p.floor(size / 8);
    chessboard.resize(boxSize);
  };

  p.mouseDragged = ()=>{
    p.redraw();
  }

  p.mousePressed = () => {
    chessboard.startDrag(p);
  };

  p.mouseReleased = () => {
    chessboard.stopDrag(p, socket);
    p.redraw();
  };

  p.keyPressed = () => {
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
