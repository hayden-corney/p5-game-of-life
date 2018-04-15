let grid;
let rows;
let cols;
let resolution = 5;

function setup() {
  
  createCanvas(800, 800);
  cols = width / resolution;
  rows = height / resolution;
  grid = Array2D.buildWith(cols, rows, function() {
    return random()>=0.5;
  });

}

function draw() {

  background(0);
  fill(255);
  stroke(0);
  Array2D.eachCell(grid, function (cell, r, c) {
    if (cell) {
      let x = c * resolution;
      let y = r * resolution;
      rect(x, y, resolution - 1, resolution - 1);
    }
  });

  grid = computeNext(grid);
  
}

function computeNext(grid) {

  return Array2D.map(grid, function(cell, r, c) {
    // Count live neighbors
    neighbors = Array2D
      .neighbors(grid, r, c) // get neighours
      .reduce((s,v)=>s+(v?1:0),0); // sum
      //.filter(v => v).length;
    if (!cell) {
      return neighbors == 3;
    } else {
      return neighbors == 2 || neighbors == 3;
    }
  });

}