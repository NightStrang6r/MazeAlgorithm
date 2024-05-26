// utils.js
// Provides a utility function to read a maze from a file.

// File System module
import fs from 'fs';

// Function to read a maze from a file and return it as a matrix.
function readMazeFromFile(filePath) {
    try {
        // 'map(line => line.split(''))' splits each line into an array of characters, creating a matrix (2D array).
        return fs.readFileSync(filePath, 'utf-8').trim().split('\r\n').map(line => line.split(''));
    } catch (error) {
        // If an error occurs, log an error message to the console and exit the process.
        console.error(`Error reading file: ${filePath}`);
        process.exit(1);
    }
}

// Export the function for use in other modules (in our case, in index.js).
export { readMazeFromFile };