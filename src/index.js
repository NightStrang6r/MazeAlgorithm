// Algorithms and Methods of Programming
// Final Project
// Leonid Tsaruk

// NodeJS v21.7.1 & npm v10.5.0
// To run: npm i & node .

// index.js
// Main entry file.

// Import modules
import c from 'chalk';
import AStar from './AStar.js';
import { readMazeFromFile } from './utils.js';

// Constants
const mazeFolder = './mazes';
const mazeFilePaths = {
    7: `/maze_7x7.txt`,
    11: `/maze_11x11.txt`,
    31: `/maze_31x31.txt`,
    101: `/maze_101x101.txt`
};

main();

// Main function
function main() {
    console.log(c.bold.cyan('=== Algorithms and Methods of Programming ==='));
    console.log(c.bold.cyan('=== Final Project ===\n'));
    console.log(c.bold.magenta('> By Leonid Tsaruk\n\n'));

    processMazes();
}

// Process all mazes, one by one
function processMazes() {
    for (const size in mazeFilePaths) {
        processMaze(mazeFolder + mazeFilePaths[size]);
    }
}

// Process a single maze
function processMaze(mazeFilePath) {
    console.log(`${c.cyan('Maze:')} ${c.yellow(mazeFilePath)}`);

    const maze = readMazeFromFile(mazeFilePath);

    // AStar
    // Time complexity: O(rows*cols*log(rows*cols))
    // Space complexity: O(rows*cols)
    console.time(c.bold.cyan('AStar time'));
    const AStarResult = AStar(maze);
    console.timeEnd(c.bold.cyan('AStar time'));
    console.log(`${c.bold.cyan('AStar result')}: ${AStarResult.coins} coins, ${AStarResult.steps} steps\n`);
}