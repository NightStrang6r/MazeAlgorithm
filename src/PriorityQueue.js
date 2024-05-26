// PriorityQueue.js
// Provides a priority queue implementation.

// The base of the class is taken from:
// https://www.geeksforgeeks.org/implementation-priority-queue-javascript/

class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    // Helper method to get the parent index of a given node
    parent(index) {
        return Math.floor((index - 1) / 2);
    }

    // Helper method to get the left child index of a given node
    leftChild(index) {
        return (2 * index) + 1;
    }

    // Helper method to get the right child index of a given node
    rightChild(index) {
        return (2 * index) + 2;
    }

    // Add a new element to the priority queue
    enqueue(element) {
        this.heap.push(element); // Add the new element to the end of the heap
        this.bubbleUp(); // Restore the heap property by moving the element up
        // Restore means ensuring that the binary heap structure remains valid after adding a new element
    }

    // Remove and return the element with the highest priority (smallest value)
    dequeue() {
        if (this.size() === 1) {
            return this.heap.pop(); // If there's only one element, just pop it
        }

        const min = this.heap[0]; // The root of the heap (min element)
        this.heap[0] = this.heap.pop(); // Move the last element to the root
        this.bubbleDown(); // Restore the heap property by moving the element down
        
        return min; // Return the min element
    }

    // Return the number of elements in the priority queue
    size() {
        return this.heap.length;
    }

    // Move the newly added element up to restore the heap property
    bubbleUp() {
        let index = this.heap.length - 1; // Start with the last element
        while (index > 0) {
            const parentIndex = this.parent(index); // Get the parent index

            // Compare the current element with its parent based on priority and secondary criteria
            if (this.heap[index][0] > this.heap[parentIndex][0] ||
                (this.heap[index][0] === this.heap[parentIndex][0] && this.heap[index][2] >= this.heap[parentIndex][2])) {
                break; // If the heap property is not violated, break the loop
            }

            // Swap the current element with its parent
            // We can swap elements using 3rd variable, but using ES6 destructuring makes it easier:
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex; // Update the index to the parent's index
        }
    }

    // Move the root element down to restore the heap property
    bubbleDown() {
        let index = 0; // Start with the root element
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = this.leftChild(index); // Get the left child index
            let rightChildIndex = this.rightChild(index); // Get the right child index
            let leftChild, rightChild;
            let swap = null;

            // Check if the left child exists and if it violates the heap property
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild[0] < element[0] || (leftChild[0] === element[0] && leftChild[2] < element[2])) {
                    swap = leftChildIndex; // Mark the left child for swapping
                }
            }

            // Check if the right child exists and if it violates the heap property
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && (rightChild[0] < element[0] || (rightChild[0] === element[0] && rightChild[2] < element[2]))) ||
                    (swap !== null && (rightChild[0] < leftChild[0] || (rightChild[0] === leftChild[0] && rightChild[2] < leftChild[2])))
                ) {
                    swap = rightChildIndex; // Mark the right child for swapping if it has higher priority
                }
            }

            // If no swapping is needed, the heap property is restored
            if (swap === null) {
                break;
            }

            // Swap the element with the child that violates the heap property
            [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
            index = swap; // Update the index to the child's index
        }
    }
}

export default PriorityQueue;