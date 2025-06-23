const roverState = {
  x: 0,
  y: 0,
  direction: 'EAST',
  stopped: false
};

const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

const moveForward = {
  NORTH: { x: 0, y: 1 },
  EAST:  { x: 1, y: 0 },
  SOUTH: { x: 0, y: -1 },
  WEST:  { x: -1, y: 0 }
};

const obstacles = [
  [1, 4],
  [3, 5],
  [7, 4]
];

// Step 2.2 - Check if a position is an obstacle
function isObstacle(x, y) {
  return obstacles.some(ob => ob[0] === x && ob[1] === y);
}

function executeCommand(rover, command) {
  if (rover.stopped) return;

  if (command === 'F' || command === 'B') {
    const delta = moveForward[rover.direction];
    const multiplier = command === 'F' ? 1 : -1;

    // Step 2.1 - Compute next position
    const nextX = rover.x + delta.x * multiplier;
    const nextY = rover.y + delta.y * multiplier;

    // Step 2.2 - Check for obstacle
    if (isObstacle(nextX, nextY)) {
      rover.stopped = true;
      return;
    }

    rover.x = nextX;
    rover.y = nextY;

  } else if (command === 'L' || command === 'R') {
    const currentIndex = directions.indexOf(rover.direction);
    const turn = command === 'L' ? -1 : 1;
    const newIndex = (currentIndex + turn + directions.length) % directions.length;
    rover.direction = directions[newIndex];
  }
}

function commandToRover(commandString) {
  roverState.stopped = false; // reset in case of reuse

  for (let command of commandString) {
    executeCommand(roverState, command);
    if (roverState.stopped) break;
  }

  const position = `(${roverState.x}, ${roverState.y}) ${roverState.direction}`;
  return roverState.stopped ? `${position} STOPPED` : position;
}


console.log(commandToRover('FFRRRRFFFFLLF'))