export default function sketch (p) {
    p.setup = () => {
      p.createCanvas(800, 600)
  
    }
  
    p.draw = () => {
      p.background(0)
      p.stroke(255);
      p.rect(20,20,20,20);
    }
  }