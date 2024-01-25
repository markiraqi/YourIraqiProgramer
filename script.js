var canvas;
var ctx;
var x = 100;
var y = 100;
var dx = 5;
var dy = 5;
var ballsize = 20;
var ballColor = "#9a5f5b"; // Starting colour
var counter = 0; // Counter starting value


function circle() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  setInterval(draw, 1);
}

function getRandomColor() {
  // Generate a random color in hexadecimal format
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  // Check if the ball hits the canvas borders
  if (x < ballsize || x > canvas.width - ballsize || y < ballsize || y > canvas.height - ballsize) {
    ballColor = getRandomColor(); // Change color when hitting the border
    counter += 1; // Increment the counter
    ballsize += 1; // Increase the ball size
  }

  ctx.fillStyle = ballColor; // Set the color
  ctx.arc(x, y, ballsize, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  // Display the counter in the middle of the canvas
  ctx.fillStyle = "#000"; // Set color for the number
  ctx.font = "80px Arial"; // Set font size and family
  ctx.textAlign = "center"; // Center the text horizontally
  ctx.textBaseline = "middle"; // Center the text vertically
  ctx.fillText(counter, canvas.width / 2, canvas.height / 2);
  
  // Uncomment the following lines to keep the ball bouncing off the canvas edges
  if (x < ballsize || x > canvas.width - ballsize) {
    dx = -dx;
  }
  if (y < ballsize || y > canvas.height - ballsize) {
    dy = -dy;
  }

  x += dx;
  y += dy;
}

