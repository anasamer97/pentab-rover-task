let rover = {
  x: 0,
  y: 0,
  direction: "north",
};

const directions = {
  north: { x: 0, y: 1 },
  east:  { x: 1, y: 0 },
  south: { x: 0, y:-1 },
  west:  { x:-1, y: 0 },
};

const obstacles = [
  [1, 4],
  [3, 5],
  [7, 4],
];

function isObstacle(x, y) {
  return obstacles.some(o => o[0] === x && o[1] === y);
}

const headings = ["north", "east", "south", "west"];

function step({ x, y, dir }, cmd) {
  if (cmd === "F") {
    const v = directions[dir];
    const nx = x + v.x;
    const ny = y + v.y;
    return isObstacle(nx, ny) ? null : { x: nx, y: ny, dir };
  }

  if (cmd === "L" || cmd === "R") {
    const idx = headings.indexOf(dir);
    const next =
      cmd === "L"
        ? (idx - 1 + headings.length) % headings.length
        : (idx + 1) % headings.length;
    return { x, y, dir: headings[next] };
  }

  return null; // unsupported command
}

function findPath(targetX, targetY, maxSteps = 200) {
  const start = { x: rover.x, y: rover.y, dir: rover.direction };
  const queue = [{ ...start, path: "" }];
  const visited = new Set([`${start.x},${start.y},${start.dir}`]);
  const moves = ["F", "L", "R"];

  while (queue.length) {
    const { x, y, dir, path } = queue.shift();

    // reached destination
    if (x === targetX && y === targetY) return path || " "; // already there

    if (path.length >= maxSteps) continue; // safety stop

    for (const mv of moves) {
      const next = step({ x, y, dir }, mv);
      if (!next) continue; // obstacle hit

      const key = `${next.x},${next.y},${next.dir}`;
      if (visited.has(key)) continue;

      visited.add(key);
      queue.push({ ...next, path: path + mv });
    }
  }

  return null; // no path found within maxSteps
}

function getCommand(cmdStr) {
  for (const c of cmdStr) {
    if (c === "F" || c === "B") {
      const v = directions[rover.direction];
      const mul = c === "F" ? 1 : -1;
      const nx = rover.x + v.x * mul;
      const ny = rover.y + v.y * mul;
      if (isObstacle(nx, ny))
        return `STOPPED at (${rover.x}, ${rover.y}) facing ${
          rover.direction
        }. Obstacle at (${nx}, ${ny}).`;
      rover.x = nx;
      rover.y = ny;
    } else if (c === "L" || c === "R") {
      const idx = headings.indexOf(rover.direction);
      const next =
        c === "L"
          ? (idx - 1 + headings.length) % headings.length
          : (idx + 1) % headings.length;
      rover.direction = headings[next];
    }
  }
  return `Current Position (${rover.x}, ${rover.y}) ${rover.direction.toUpperCase()}`;
}

// ==================================================================
// --------------------------- DEMO ---------------------------------
const target = [1   , 3];
const commands = findPath(...target);

console.log("Generated command string :", commands);       
console.log(getCommand(commands));                        
