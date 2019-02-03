export default class Board {
  constructor(boxSize, chess, color) {
    this.boxSize = boxSize;
    this.chess = chess;
    this.dragged = null;
    this.letters = "abcdefgh";
    this.color = color;
    this.swap = false;
    if (color == "b") this.swap = true;
    this.promotingMove = null;
  }

  resize(boxSize) {
    this.boxSize = boxSize;
  }

  show(p) {
    p.noStroke();

    let blackc = p.color(182, 136, 97);
    let whitec = p.color(240, 216, 179);

    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
        let san = this.sanNotationSquare({
          x: this.swap ? 7 - i : i,
          y: this.swap ? j : 7 - j
        });
        if ((i + j) % 2) p.fill(blackc);
        else p.fill(whitec);
        p.noStroke();
        p.rect(i * this.boxSize, j * this.boxSize, this.boxSize, this.boxSize);

        if ((i + j) % 2) p.fill(whitec);
        else p.fill(blackc);
        p.textSize(this.boxSize / 5);
        if (j == 7) {
          p.text(
            san.charAt(0),
            (i + 1) * this.boxSize - p.textWidth(san.charAt(0)) - 1,
            (j + 1) * this.boxSize - p.textDescent()
          );
        }
        if (i == 0) {
          p.text(
            san.charAt(1),
            i * this.boxSize + 2,
            j * this.boxSize + p.textSize()
          );
        }
      }
    this.drawPieces(p);
  }

  drawPieces(p) {
    let dragimg;
    let dragpos;
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
        let piece = this.chess.get(this.letters[i] + (j + 1));
        if (piece != null) {
          p.imageMode(p.CENTER);
          let img = piece.color == "b" ? piece.type : piece.type.toUpperCase();
          if (this.dragged && this.dragged.x == i && this.dragged.y == j) {
            dragpos = { x: p.mouseX, y: p.mouseY };
            dragimg = img;
            continue;
          }
          let pos = {
            x: ((this.swap ? 7 - i : i) + 0.5) * this.boxSize,
            y: ((this.swap ? j : 7 - j) + 0.5) * this.boxSize
          };

          p.image(p.imgs[img], pos.x, pos.y, this.boxSize, this.boxSize);
        }
      }
    if (this.dragged)
      p.image(
        p.imgs[dragimg],
        dragpos.x,
        dragpos.y,
        this.boxSize,
        this.boxSize
      );
  }

  whichSquare(p) {
    let pos = {
      x: p.floor((this.swap ? p.width - p.mouseX : p.mouseX) / this.boxSize),
      y: p.floor((this.swap ? p.mouseY : p.height - p.mouseY) / this.boxSize)
    };
    return pos;
  }

  getClickedPiece(p) {
    let pos = this.whichSquare(p);
    let piece = this.chess.get(this.sanNotationSquare(pos));
    if (piece && piece.color == this.color) return pos;
    else return null;
  }

  move(data) {
    this.chess.move(data);
  }

  sanNotationSquare(square) {
    return String.fromCharCode(square.x + 97) + (square.y + 1);
  }

  startDrag(p) {
    if (p.isInCanvas()) {
      if (!this.dragged) this.dragged = this.getClickedPiece(p);
      let square = this.whichSquare(p);
      let san = this.sanNotationSquare(square);
      let square2 = this.sanSquareToXYREAL(san);
      console.log(square, " ", san, " ", square2);
    }
  }

  stopDrag(p, socket) {
    if (p.isInCanvas()) {
      if (this.dragged) {
        let pos = this.whichSquare(p);
        if (this.dragged) {
          let move = {
            from: this.sanNotationSquare(this.dragged),
            to: this.sanNotationSquare(pos),
            promotion: "q"
          };
          move = this.chess.move(move);
          if (move) {
            this.chess.undo();
            if (move.flags == "p" || move.flags == "pc")
              this.choosePromotion(pos, p);
            socket.emit("move", move);
          }
        }
      }
    }
    this.dragged = null;
  }

  choosePromotion(pos, p) {
    let w = this.boxSize;
    let h = this.boxSize * 4;
    p.rect(pos.x * this.boxSize);
  }

  drawPromotion(move, p) {}

  sanSquareToXY(san) {
    let pos = {
      x: san.charCodeAt(0) - 97,
      y: san.charCodeAt(1) - 49
    };
    return pos;
  }

  sanSquareToXYREAL(san) {
    let pos = {
      x: san.charCodeAt(0) - 97,
      y: san.charCodeAt(1) - 49
    };

    return pos;
  }

  swapBoard() {
    this.swap = !this.swap;
  }
}
