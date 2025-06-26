let rover = {
    x:0,
    y:0,
    direction: 'north',
    stopped: false
}

let directions = {
    north: {x: 0, y:1},
    east: {x:1, y:0},
    south: {x: 0, y:-1},
    west: {x:-1, y:0}
}

const obstacles = [
  [1, 4],
  [3, 5],
  [7, 4]
];


function isObstacle(x, y) {
  return obstacles.some(ob => ob[0] === x && ob[1] === y);
}

let coordinates = ['north', 'east', 'south', 'west']

function getCommand(commandString) {
    for(let i = 0; i < commandString.length; i++) {
        if(commandString[i] === 'F' || commandString[i] === 'B') {
            const direction = directions[rover.direction];
            const multiplier = commandString[i] === 'F' ? 1 : -1;
            const nextX = rover.x + direction.x * multiplier;
            const nextY = rover.y + direction.y * multiplier;

            if (isObstacle(nextX, nextY)) {
                return `Current Position (${rover.x}, ${rover.y}) ${rover.direction.toUpperCase()} STOPPED. Encountered an obstacle at (${nextX}, ${nextY}).`;
            }

            rover.x = nextX;
            rover.y = nextY;
        }
        else if(commandString[i] === 'R') {
            let currentIndex = coordinates.indexOf(rover.direction);
            let nextIndex =  (currentIndex + 1) % coordinates.length;
            rover.direction = coordinates[nextIndex];
        }
        else if (commandString[i] === 'L') {
            let currentIndex = coordinates.indexOf(rover.direction);
            let nextIndex =  (currentIndex - 1 + coordinates.length) % coordinates.length;
            rover.direction = coordinates[nextIndex];
        }
    }

    return `Current Position (${rover.x}, ${rover.y}) ${rover.direction.toUpperCase()}`;
}


console.log(getCommand('FFFFFRFFF'));

