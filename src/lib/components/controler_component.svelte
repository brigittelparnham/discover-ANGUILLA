<script>
  import { onMount } from 'svelte';
  import P5 from 'p5-svelte';
  import { createNoise3D } from 'simplex-noise';
  export let noiseValue;

  // TileableNoise class
  class TileableNoise {
    constructor(p, r, fromX, toX) {
      this.p = p;
      this.fromX = fromX;
      this.toX = toX;
      this.r = r;
      this.simplexNoise = createNoise3D();  // Create a noise function using createNoise3D
    }

    eval1D(x, t) {
      const angle = this.p.map(x, this.fromX, this.toX, 0, Math.PI * 2);
      const X = this.r * (Math.cos(angle) + 1);
      const Y = this.r * (Math.sin(angle) + 1);
      return (this.simplexNoise(X, Y, t) + 1) / 2;  // Use the 3D noise function (X, Y, t)
    }

    seed(value) {
      this.simplexNoise = createNoise3D(value);  // Seed the noise function
    }
  }

  let noiseObj;
  let points = 300;
  let step;
  let off = 0;
  let w, h;
  let circleRadius;
  let lastNoiseValue = null;  // To store the last noise value when the mouse is outside

  // Define the p5 sketch
  const sketch = (p) => {
  const updateCanvasSize = () => {
    let mobileCircle = window.innerWidth < 768 ? 600 : 200;
    circleRadius = p.min(p.min(p.windowWidth, p.windowHeight) * 0.5, mobileCircle); 
    w = 2 * circleRadius;
    h = w;
    p.resizeCanvas(w, h); // Resize the canvas dynamically
  };

  p.setup = () => {
    updateCanvasSize(); // Initialize the canvas size
    p.createCanvas(w, h);
    step = (Math.PI * 2) / points;
    noiseObj = new TileableNoise(p, 0.1, 0, Math.PI * 2);
  };

  p.windowResized = () => {
    updateCanvasSize(); // Recalculate sizes when window resizes
  };

  p.draw = () => {
    p.clear(); // Ensure the canvas clears properly

    // Draw the circle
    p.fill(255);
    p.stroke(0);
    p.strokeWeight(2);
    p.ellipse(w / 2, h / 2, (circleRadius * 2) - 10, (circleRadius * 2) - 10);

    let distance = p.dist(p.mouseX, p.mouseY, w / 2, h / 2);

    if (distance <= circleRadius) {
      lastNoiseValue = off;
      off += 0.01;
      noiseObj.r = p.map(p.mouseX, 0, p.width, 0.1, 3);

      let angle = Math.atan2(p.mouseY - h / 2, p.mouseX - w / 2);
      if (angle < 0) angle += Math.PI * 2;
      noiseValue = p.map(angle, 0, Math.PI * 2, 0, 100);
    } else if (lastNoiseValue !== null) {
      off = lastNoiseValue;
    }

    // Draw the tileable noise inside the circle
    p.fill(0);
    p.noStroke();

    let centerX = w / 2;
    let centerY = h / 2;
    let maxRadius = circleRadius * 0.8;
    let minRadius = circleRadius * 0.5;

    p.beginShape();
    for (let a = 0; a < Math.PI * 2; a += step) {
      let r = noiseObj.eval1D(a, off);
      r = p.map(r, 0, 1, minRadius, maxRadius);
      let x = p.cos(a) * r + centerX;
      let y = p.sin(a) * r + centerY;
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
  };

  p.mousePressed = () => {
    noiseObj.seed();
  };
};

</script>

<P5 {sketch} />
