// AStar.js
// Provides the A* algorithm to solve the maze.

import PriorityQueue from "./PriorityQueue.js";

// Main function to solve the maze using A* algorithm
function aStarMazeSolver(maze) {
    // Directions for movement: Up, Down, Left, Right, and Diagonals
    // [row, col], basically [y, x]
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // Up, Down, Left, Right
        [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonals
    ];

    // Get the number of rows and columns in the maze
    const rows = maze.length;
    const cols = maze[0].length;

    // Variables will be an array of two elements: [row, col]
    let start, end;

    // Find the start ('S') and end ('G') positions in the maze
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (maze[r][c] === 'S') start = [r, c];
            if (maze[r][c] === 'G') end = [r, c];
        }
    }
    
    // Initialize the priority queue for A* search
    const pq = new PriorityQueue();
    // Enqueue the starting position with initial values
    // [totalCost, row, col, coinCount, stepCount]
    pq.enqueue([0, ...start, 0, 0]);

    // Create a 2D array to store the minimum cost to reach each cell
    const costs = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    costs[start[0]][start[1]] = 0;

    // Process nodes in the priority queue
    while (pq.size() > 0) {
        // Dequeue the node with the lowest cost
        const [currentCost, currentRow, currentCol, coinCount, stepCount] = pq.dequeue();

        // If the end position is reached, return the result
        if (currentRow === end[0] && currentCol === end[1]) {
            return { coins: coinCount, steps: stepCount };
        }

        // Explore all possible directions
        for (const [dr, dc] of directions) {
            const newRow = currentRow + dr;
            const newCol = currentCol + dc;

            // Check if the new position is within bounds and not an obstacle ('X')
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && maze[newRow][newCol] !== 'X') {
                // Calculate the new coin count 
                // Parse cell value as coin count if it's not 'S' or 'G'
                const newCoinCount = coinCount + (maze[newRow][newCol] !== 'S' && maze[newRow][newCol] !== 'G' ? parseInt(maze[newRow][newCol], 10) : 0);
                // Increment the step count
                const newStepCount = stepCount + 1;
                // Calculate the new cost as the sum of coin count and heuristic value
                const newCost = newCoinCount + manhattanDistance([newRow, newCol], end);

                // If the new cost is less than the recorded cost, update and enqueue
                if (newCost < costs[newRow][newCol]) {
                    costs[newRow][newCol] = newCost;
                    pq.enqueue([newCost, newRow, newCol, newCoinCount, newStepCount]);
                }
            }
        }
    }

    // If no path is found, return null
    return null;
}

// Heuristic function to estimate the cost from current position (a) to the goal (b)
// This heuristic uses the Manhattan distance, which is the sum of the absolute differences
// of the coordinates.
// https://www.shiksha.com/online-courses/articles/all-about-manhattan-distance/
function manhattanDistance(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export default aStarMazeSolver;