
const s1 = "^vv<v";
const s2 = "v>>>vv";

const UP = '^';
const DOWN = 'v';
const LEFT = '<';
const RIGHT = '>';

const getMinimumRotationsForArrowsToPointSameDirection = (s, mustRotateMultiple = false) => {
  // Get count of each direction?
  // Return sum of direction counts with fewest counts
  // Include "nextTo" property to determine if a direction can be rotated in 1 or 2 moves (if next to it, one rotation, otherwise two)
  const dirCountsBase = [
    { direction: UP, count: 0, nextTo: [LEFT, RIGHT]}, // 0
    { direction: DOWN, count: 0, nextTo: [LEFT, RIGHT] }, // 1
    { direction: LEFT, count: 0, nextTo: [UP, DOWN] }, // 2
    { direction: RIGHT, count: 0, nextTo: [UP, DOWN] } // 3
  ];

  const dirCounts = s.split('').reduce((prev, next) => {
    if (next === UP) {
      prev[0].count++;
    } else if (next === DOWN) {
      prev[1].count++;
    } else if (next === LEFT) {
      prev[2].count++;
    } else if (next === RIGHT) {
      prev[3].count++;
    }
    return prev;
  }, dirCountsBase);
  return calculateRotationsForArrowCounts(dirCounts, mustRotateMultiple);
}

const calculateRotationsForArrowCounts = (dirCounts, mustRotateMultiple) => {
  var sorted = dirCounts.sort((first, second) => second.count - first.count);
  // { direction, count }
  const targetDirection = sorted[0];
  const count = sorted.reduce((totalCount, currentDirection, i) => {
    // Ignore largest count of directions - already in correct direction
    if (i !== 0) {
      if (mustRotateMultiple) {
        // MODIFICATION HERE: if target is up, and the current direction is left or right, add 1, otherwise add 2 
        const multiplier = targetDirection.nextTo.includes(currentDirection.direction) ? 1 : 2;
        return totalCount + (currentDirection.count * multiplier);
      }
      
      // Original logic for single direction changes
      return totalCount + currentDirection.count;
    }
    // Count of direction relative to target direction
    return totalCount;
  }, 0)
  return count;
}

// Scenario 1; without multiple rotations
console.log('S1; No Mult: ', getMinimumRotationsForArrowsToPointSameDirection(s1)); // 2
// Scenario 2; without multiple rotations
console.log('S2; No Mult: ', getMinimumRotationsForArrowsToPointSameDirection(s2)); // 3

// Scenario 1; with multiple rotations
console.log('S1; Yes Mult: ', getMinimumRotationsForArrowsToPointSameDirection(s1, true)); // 3
// Scenario 2; with multiple rotations
console.log('S2; Yes Mult: ', getMinimumRotationsForArrowsToPointSameDirection(s2, true)); // 3