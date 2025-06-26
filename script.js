let rover = {
    x:0,
    y:0,
    direction: 'north',
    stopped: false
}

        // NORTH

//West            // EAST
        // SOUTH
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
            const multipler = commandString[i] === 'F' ? 1 : -1;
            const nextX = rover.x + direction.x * multipler;
            const nextY = rover.y + direction.y * multipler;

            if(isObstacle(nextX, nextY)) {
                console.log("isObstacle trigger");
                rover.stopped = true;
                return `Current Position (${rover.x}, ${rover.y}) ${rover.direction.toUpperCase()} STOPPED. Encounterd an obstacle at (${nextX}, ${nextY}). `
            }
           
            rover.x = nextX;
            rover.y = nextY;
        }

        else if(commandString[i] === 'B') {
            rover.x -= directions[rover.direction].x
            rover.y -= directions[rover.direction].y
        }

        else if(commandString[i] === 'R') {
            let currentIndex = coordinates.indexOf(rover.direction)
            let nextIndex =  (currentIndex + 1) % coordinates.length;
            rover.direction = coordinates[nextIndex]
            
        }

        else if (commandString[i] === 'L') {
            let currentIndex = coordinates.indexOf(rover.direction)
            let nextIndex =  (currentIndex - 1) % coordinates.length;
            if (nextIndex === -1) 
                nextIndex = 3
            rover.direction = coordinates[nextIndex] 
        }
    }

    return `x: ${rover.x}, y: ${rover.y}, ${rover.direction}`
}


console.log(getCommand('FFFFFRFFF'));

