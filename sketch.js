const numSeedPoints = 8,
  seedPoints = [],
  speed = 1000,
  equilateral = true,
  canRepeatVertex = false,
  jump = 0.7;

let curPoint,
  rand;

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0);

  noFill();
  stroke(255);
  strokeWeight(5);

  for (let i = 0; i < numSeedPoints; i++) {
    if (equilateral) {
      const angle = (TWO_PI / numSeedPoints) * i,
        radius = min(width, height) / 2;
      seedPoints.push(createVector(width / 2 + radius * sin(angle), height / 2 - radius * cos(angle)));
    }
    else {
      seedPoints.push(createVector(random(width), random(height)));
    }

    point(seedPoints[i].x, seedPoints[i].y);
  }

  curPoint = createVector(random(width), random(height));

  stroke(255, 0, 0, 50);
  strokeWeight(1);
}

function draw() {
  for (let i = 0; i < speed; i++) {
    point(curPoint.x, curPoint.y);
    if (canRepeatVertex || rand === undefined) {
      rand = floor(random(numSeedPoints));
    }
    else {
      let toRand = rand;
      while (toRand == rand) {
        toRand = floor(random(numSeedPoints));
      }
      rand = toRand;
    }

    curPoint.set(p5.Vector.lerp(curPoint, seedPoints[rand], jump));
  }
}