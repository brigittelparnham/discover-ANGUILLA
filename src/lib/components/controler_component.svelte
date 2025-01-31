<script>
  import { onMount } from 'svelte';
  import P5 from 'p5-svelte';
  import { createNoise3D } from 'simplex-noise';

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
    p.setup = () => {
      circleRadius = p.min(p.windowWidth, p.windowHeight) * 0.4;  // Circle radius as 40% of the smaller dimension
      w = 2 * circleRadius;  // Canvas width as the diameter of the circle
      h = w;  // Square canvas to fit the circle perfectly

      p.createCanvas(w, h);
      step = (Math.PI * 2) / points;
      noiseObj = new TileableNoise(p, 0.1, 0, Math.PI * 2);  // Initialize TileableNoise
    };

    p.draw = () => {
      p.background(255);  // Ensure background is white

      // Draw the circle (with black stroke and white fill)
      p.fill(255);          // White fill for the circle
      p.stroke(0);          // Black stroke for the circle
      p.strokeWeight(2);    // Make the stroke thicker
      p.ellipse(w / 2, h / 2, (circleRadius * 2)-10, (circleRadius * 2)-10);  // Draw the circle in the center

      // Check if the mouse is inside the circle
      let distance = p.dist(p.mouseX, p.mouseY, w / 2, h / 2);

      // Only update the noise if the mouse is inside the circle
      if (distance <= circleRadius) {
        // Mouse is inside the circle, update the noise
        lastNoiseValue = off;  // Save the current noise value
        off += 0.01;  // Increment the noise value
        noiseObj.r = p.map(p.mouseX, 0, p.width, 0.1, 3);  // Modify the radius based on mouse position
      } else if (lastNoiseValue !== null) {
        // Mouse is outside, continue with the last noise value
        off = lastNoiseValue;  // Use the stored noise value
      }

      // Now draw the tileable noise inside the circle
      p.fill(0);           // Black fill for the noise shape
      p.noStroke();        // Remove the outline for the noise shape

      let centerX = w / 2;
      let centerY = h / 2;
      let maxRadius = circleRadius * 0.8;  // Max radius to fit inside the circle
      let minRadius = circleRadius * 0.5;  // Min radius to keep the shape inside

      p.beginShape();
      for (let a = 0; a < (Math.PI * 2); a += step) {
        let r = noiseObj.eval1D(a, off);
        r = p.map(r, 0, 1, minRadius, maxRadius);
        let x = p.cos(a) * r + centerX;
        let y = p.sin(a) * r + centerY;
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
    };

    p.mousePressed = () => {
      noiseObj.seed();  // Seed noise with default value or custom string
    };
  };
</script>

<P5 {sketch} />
