
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
  direction: 'NORTH'
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

function executeCommand(rover, command) {
  const dirDelta = moveForward[rover.direction];
  if (command === 'F' || command === 'B') {
    const multiplier = command === 'F' ? 1 : -1;
    rover.x += dirDelta.x * multiplier;
    rover.y += dirDelta.y * multiplier;
  } else if (command === 'L' || command === 'R') {
    const currentIndex = directions.indexOf(rover.direction);
    const turn = command === 'L' ? -1 : 1;
    const newIndex = (currentIndex + turn + directions.length) % directions.length;
    rover.direction = directions[newIndex];
  }
}


function commandToRover(commandString) {
  for (let command of commandString) {
    executeCommand(roverState, command);
  }
  return `(${roverState.x}, ${roverState.y}) ${roverState.direction}`;
}


console.log(commandToRover("FFF"));
