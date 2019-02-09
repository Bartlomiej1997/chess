export default class Board {
  constructor(boxSize, chess, color, socket, blackc, whitec) {
    this.boxSize = boxSize;
    this.chess = chess;
    this.dragged = null;
    this.letters = "abcdefgh";
    this.color = color;
    this.swap = false;
    if (color == "b") this.swap = true;
    this.promotingMove = null;
    this.socket = socket;
    this.blackc = blackc;
    this.whitec = whitec;
  }

  resize(boxSize) {
    this.boxSize = boxSize;
  }

  show(p) {
    p.noStroke();

    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
        let san = this.sanNotationSquare({
          x: this.swap ? 7 - i : i,
          y: this.swap ? j : 7 - j
        });
        if ((i + j) % 2) p.fill(this.blackc);
        else p.fill(this.whitec);
        p.noStroke();
        p.rect(i * this.boxSize, j * this.boxSize, this.boxSize, this.boxSize);

        if ((i + j) % 2) p.fill(this.whitec);
        else p.fill(this.blackc);
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
    if (this.promotingMove) this.drawPromotionBox(p);
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

  move(data, p) {
    this.chess.move(data);
    if (this.chess.in_check()) data.flags = "ch";
    switch (data.flags) {
      case "ch":
        p.sounds["check"].play();
        break;
      case "n":
      case "b":
      case "p":
        p.sounds["move"].play();
        break;
      case "e":
      case "c":
      case "pc":
      case "cp":
        p.sounds["capture"].play();
        break;
      case "k":
      case "q":
        p.sounds["castle"].play();
        break;
    }
  }

  sanNotationSquare(square) {
    return String.fromCharCode(square.x + 97) + (square.y + 1);
  }

  startDrag(p) {
    this.dragged = this.getClickedPiece(p);
  }

  click(p) {
    if (p.isInCanvas()) {
      if (!this.promotingMove) {
        if (!this.dragged) this.startDrag(p);
      } else {
        this.choosePromotion(p);
      }
    }
  }

  release(p) {
    let correct = false;
    if (p.isInCanvas()) {
      if (this.dragged) {
        let pos = this.whichSquare(p);
        let move = {
          from: this.sanNotationSquare(this.dragged),
          to: this.sanNotationSquare(pos),
          promotion: "q"
        };
        move = this.chess.move(move);
        if (move) {
          correct = true;
          this.chess.undo();
          if (move.flags == "p" || move.flags == "pc" || move.flags == "cp") {
            this.promotingMove = move;
            p.redraw();
          } else {
            this.socket.emit("move", move);
          }
        }
      }
    }
    this.dragged = null;
    if (!correct) p.redraw();
  }

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
    pos.x = this.swap ? 7 - pos.x : pos.x;
    pos.y = this.swap ? pos.y : 7 - pos.y;
    return pos;
  }

  swapBoard() {
    this.swap = !this.swap;
  }

  drawPromotionBox(p) {
    let { x, y } = this.sanSquareToXYREAL(this.promotingMove.to);
    let dx, dy;
    dx = x * this.boxSize;
    dy = y == 0 ? 0 : 4 * this.boxSize;
    p.stroke(this.blackc);
    p.strokeWeight(1);
    p.fill(this.whitec);
    p.rect(dx, dy, this.boxSize, 4 * this.boxSize, 10);
    let imgs = "qrbn";
    if (this.color == "w") imgs = imgs.toUpperCase();
    if (y == 7) {
      imgs = imgs
        .split("")
        .reverse()
        .join("");
    }
    p.imageMode(p.CORNER);
    for (let i = 0; i < imgs.length; i++) {
      p.image(
        p.imgs[imgs[i]],
        dx,
        dy + i * this.boxSize,
        this.boxSize,
        this.boxSize
      );
    }
  }

  choosePromotion(p) {
    let { x, y } = this.sanSquareToXYREAL(this.promotingMove.to);
    let dx, dy;
    dx = x * this.boxSize;
    dy = y == 0 ? 0 : 4 * this.boxSize;
    let flag = "";
    let flags = "qrbn";
    if (y == 7)
      flags = flags
        .split("")
        .reverse()
        .join("");
    if (
      p.mouseX > dx &&
      p.mouseX < dx + this.boxSize &&
      p.mouseY > dy &&
      p.mouseY < dy + 4 * this.boxSize
    ) {
      if (p.mouseY < dy + this.boxSize) flag = flags[0];
      else if (p.mouseY < dy + 2 * this.boxSize) flag = flags[1];
      else if (p.mouseY < dy + 3 * this.boxSize) flag = flags[2];
      else if (p.mouseY < dy + 4 * this.boxSize) flag = flags[3];
      this.promotingMove.promotion = flag;
      this.socket.emit("move", this.promotingMove);
    }
    this.promotingMove = null;
  }
}
