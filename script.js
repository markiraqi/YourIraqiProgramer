var canvas;
var ctx;
var mainCircle;
var circles = []; // Array to store circles
var maxCircles = 20; // Maximum number of circles
var mainCircleRadius = 15;
var increasedSpeed = 1.5; // Increase in speed for enemy circles
var startTime;
var elapsedTime = 0;
var bestTime = localStorage.getItem('bestTime') || Infinity;


function circle() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  // Initialize the main circle
  mainCircle = { x: canvas.width / 2, y: canvas.height / 2, radius: mainCircleRadius };

  // Create initial circles
  for (var i = 0; i < maxCircles; i++) {
    createRandomCircle();
  }

  canvas.addEventListener("mousemove", moveMainCircle);

  setInterval(draw, 20);
}

function moveMainCircle(event) {
  mainCircle.x = event.clientX - canvas.getBoundingClientRect().left;
  mainCircle.y = event.clientY - canvas.getBoundingClientRect().top;
}

function createRandomCircle() {
  var radius = Math.floor(Math.random() * (mainCircle.radius + 15)) + 5; // Random radius between 5 and mainCircle.radius + 15
  var spawnSide = Math.random() < 0.5 ? "left" : "top"; // Determine spawn side

  var x, y;
  if (spawnSide === "left") {
    x = -radius;
    y = Math.random() * canvas.height;
  } else {
    x = Math.random() * canvas.width;
    y = -radius;
  }

  var dx = (Math.random() - 0.5 + 0.5) * (2 + increasedSpeed); // Increase speed
  var dy = (Math.random() - 0.5 + 0.5) * (2 + increasedSpeed); // Increase speed
  var color = getRandomColor(); // Random color

  circles.push({ x, y, radius, dx, dy, color });
}

function getRandomColor() {
  // Generate a random color in hexadecimal format
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update the main circle
  ctx.beginPath();
  ctx.fillStyle = "#3498db"; // Main circle color
  ctx.arc(mainCircle.x, mainCircle.y, mainCircle.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  // Check for collisions with other circles
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    // Draw the circle
    ctx.beginPath();
    ctx.fillStyle = circle.color;
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    // Check for collision with main circle
    var distance = Math.sqrt(Math.pow(mainCircle.x - circle.x, 2) + Math.pow(mainCircle.y - circle.y, 2));
    if (distance < mainCircle.radius + circle.radius) {
      // Collision detected, check if main circle is bigger
      if (mainCircle.radius > circle.radius) {
        // Eat the circle
        mainCircle.radius += 1; // Increase main circle radius
        circles.splice(i, 1); // Remove the eaten circle

        // Create a new circle after being eaten
        createRandomCircle();
      } else {
        // Game over, restart the game
        resetGame();
      }
    }
  }

  // Draw and update remaining circles
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    // Update circle position
    circle.x += circle.dx;
    circle.y += circle.dy;

    // Wrap around the canvas edges
    if (circle.x - circle.radius > canvas.width + mainCircle.radius * 2) {
      circle.x = -circle.radius * 2;
    } else if (circle.x + circle.radius * 2 < -mainCircle.radius) {
      circle.x = canvas.width + circle.radius * 2;
    }

    if (circle.y - circle.radius > canvas.height + mainCircle.radius * 2) {
      circle.y = -circle.radius * 2;
    } else if (circle.y + circle.radius * 2 < -mainCircle.radius) {
      circle.y = canvas.height + circle.radius * 2;
    }
  }
}

// Optional: Add new circles on mouse click
canvas.addEventListener("click", function(event) {
  createRandomCircle();
});

// Function to reset the game
function resetGame() {
  // Clear the circles array
  circles = [];

  // Reset the main circle properties
  mainCircle.radius = mainCircleRadius;
  mainCircle.x = canvas.width / 2;
  mainCircle.y = canvas.height / 2;

  // Create initial circles
  for (var i = 0; i < maxCircles; i++) {
    createRandomCircle();
  }
}

circle(); // Start the game
