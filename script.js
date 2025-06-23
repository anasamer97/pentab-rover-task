
/*
// Develop an API that translates the commands sent from earth to instructions that are understood by the rover.
// When the rover touches down on Mars, it is initialised with it’s current coordinates and the direction it is facing.
// (x, y, direction) e.g. (4, 2, EAST).

The rover is given a command string which contains multiple commands, This string must then be 
broken into each individual command and that command then executed.
 The valid commands are: 
F -> Move forward on current heading  
B -> Move backwards on current heading 
L -> Rotate left by 90 degrees 
R -> Rotate right by 90 degrees 

 An example command might be FLFFFRFLB 
 Once the full command string has been followed, the rover reports it’s current coordinates 
 and heading in the format (6, 4) NORTH
*/


const roverState = {
  x: 0,
  y: 0,
  direction: 'WEST',
  stopped: false
};

const obstacles = [
  [1, 4],
  [3, 5],
  [7, 4]
];

const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

const moveForward = {
  NORTH: { x: 0, y: 1 },
  EAST: { x: 1, y: 0 },
  SOUTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 }
};

function executeCommand(roverState, command) {
  if (command === 'F') {
    roverState.x += moveForward[roverState.direction].x;
    roverState.y = moveForward[roverState.direction].y + roverState.y;
  } else if (command === 'B') {
    roverState.x -= moveForward[roverState.direction].x;
    roverState.y -= moveForward[roverState.direction].y;
  } else if (command === 'L') {
    // Determine the direction of the rover
    const currentIndex = directions.indexOf(roverState.direction);
    // Math to calculate proper direction
    const newIndex = (currentIndex - 1 + directions.length) % directions.length;
    roverState.direction = directions[newIndex];
  } else if (command === 'R') {
    const currentIndex = directions.indexOf(roverState.direction);
    const newIndex = (currentIndex + 1) % directions.length;
    roverState.direction = directions[newIndex];
  }
}

function commandToRover(commandString) {
  for (let command of commandString) {
    executeCommand(roverState, command);
  }
  return `(${roverState.x}, ${roverState.y}) ${roverState.direction}`;
}



console.log(commandToRover("FLFLB"));
// X = -1, Y = 0, West