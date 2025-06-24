let RoverCurrentPosition = {
    X: 0,
    Y: 0,
    Direction: "North"
}

const Directions = ['North', 'East', "South", "West"];

const MappingDirections = {
    North: { X: 0, Y: 1},
    East: { X: 1, Y: 0},
    South: { X: 0, Y: -1},
    West: { X: -1, Y: 0},
}

const Obstacles = [[1,4], [3,5], [7,4]]

function isObstacle(x, y) {
    return Obstacles.some(ob => ob[0] === x && ob[1] === y);
}

function GetCommandToRover(Command) {
    for (let letter of Command) {
        if (letter === 'F' || letter === 'B') {
        let moveX = MappingDirections[RoverCurrentPosition.Direction].X;
        let moveY = MappingDirections[RoverCurrentPosition.Direction].Y;

        if (letter === 'B') {
            moveX *= -1;
            moveY *= -1;
        }
        const nextX = RoverCurrentPosition.X + moveX;
        const nextY = RoverCurrentPosition.Y + moveY;
       
        if (isObstacle(nextX, nextY)) {
            
            console.log(`Obstacle encountered at (${nextX}, ${nextY}). Aborting movement.`);
            break; 
        }

        RoverCurrentPosition.X = nextX;
        RoverCurrentPosition.Y = nextY;
}

        else if (letter === 'R') {
            let currentIndex = Directions.indexOf(RoverCurrentPosition.Direction);
            let nextIndex = (currentIndex + 1) % Directions.length;
            RoverCurrentPosition.Direction = Directions[nextIndex];
        }

        else if (letter === 'L') {
            let currentIndex = Directions.indexOf(RoverCurrentPosition.Direction);
            let nextIndex = (currentIndex - 1 + Directions.length) % Directions.length;
            RoverCurrentPosition.Direction = Directions[nextIndex];
        }
    }

    return `X: ${RoverCurrentPosition.X}, Y: ${RoverCurrentPosition.Y}, Direction: ${RoverCurrentPosition.Direction}`;
}



console.log(GetCommandToRover('FFBFFFFBRF'));