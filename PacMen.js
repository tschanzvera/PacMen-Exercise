var pos = 0;
const pacArray = [
  ["images/PacMan1.png", "images/PacMan2.png"],
  ["images/PacMan3.png", "images/PacMan4.png"],
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "images/PacMan1.png";
  newimg.width = Math.random() * 300 + 20;
  //
  // set position here
  //
  newimg.style.left = position.x + "px";
  newimg.style.top = position.y + "px";

  // add new Child image to game
  game.appendChild(newimg);
  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  /* if (
    item.position.x + item.velocity.x + item.newimg.width >
      window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
  }

  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
}*/
  // detect collision with all walls and make pacman bounce

  if (item.position.x + 100 > window.innerWidth || item.position.x < 0) {
    // If the PacMan character hits a horizontal wall, change direction.
    direction = 1 - direction; // Toggle direction (0 to 1, or 1 to 0).
    pos = direction; // Update pos based on direction.
    item.newimg.src = pacArray[direction][pos]; // Change PacMan's image.
    item.velocity.x = -item.velocity.x; // Invert horizontal velocity.
  }
  if (item.position.y + 100 > window.innerHeight || item.position.y < 0) {
    // If the PacMan character hits a vertical wall, change direction.
    direction = 1 - direction; // Toggle direction (0 to 1, or 1 to 0).
    pos = direction; // Update pos based on direction.
    item.newimg.src = pacArray[direction][pos]; // Change PacMan's image.
    item.velocity.y = -item.velocity.y; // Invert vertical velocity.
  }
}
/*if (item.position.x + 100 > 400 || item.position.x < 0) {
        item.velocity.x = -item.velocity.x;
    }
    if (item.position.y + 100 > 400 || item.position.y < 0) {
        item.velocity.y = -item.velocity.y;
    }
}*/
//
pacMen.forEach((otherPacMan) => {
  if (item !== otherPacMan) {
    // Calculate the distance between PacMan characters
    const dx = item.position.x - otherPacMan.position.x;
    const dy = item.position.y - otherPacMan.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if they are too close (you can adjust the threshold)
    if (distance < 100) {
      // Invert velocities to make them bounce off each other
      item.velocity.x = -item.velocity.x;
      item.velocity.y = -item.velocity.y;
      otherPacMan.velocity.x = -otherPacMan.velocity.x;
      otherPacMan.velocity.y = -otherPacMan.velocity.y;
    }
  }
});

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
