/**
 * Class to represent a stack using an array to store the stacked items.
 * Follows a LIFO (Last In First Out) order where new items are stacked on
 * top (back of array) and removed items are removed from the top / back.
 */
class Stack {
    /**
     * The constructor is executed when instantiating a new Stack() to construct
     * a new instance.
     * @returns {Stack} This new Stack instance is returned without having to
     *    explicitly write 'return' (implicit return).
     */
    constructor() {
        this.items = [];
    }

    /**
     * Adds a new given item to the top / back of this stack.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @param {any} item The new item to be added to the top / back.
     * @returns {number} The new length of this stack.
     */
    push(item) {
        this.items = [...this.items, item]
        return this.items.length
    }

    /**
     * Removes the top / last item from this stack.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The removed item or undefined if this stack was empty.
     */
    pop() {
        return this.items.pop();
    }

    /**
     * Retrieves the top / last item from this stack without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The top / last item of this stack.
     */
    peek() {
        return this.items[this.items.length - 1]
    }

    /**
     * Returns whether or not this stack is empty.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {boolean}
     */
    isEmpty() {
        if(this.items.length === 0){
            return true
        }
        return false
    }

    /**
     * Returns the size of this stack.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {number} The length.
     */
    size() {
        return this.items.length;
    }
}


//EXTRA - Try re-creating a stack using a linked list data structure

class StackNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListStack {
    constructor() {
        this.head = null;
        this.count = 0;
    }

    isEmpty() {
        return this.head === null
    }

    push(item) {
        const newNode = new StackNode(item)
        if (this.isEmpty()) {
            this.head = newNode;
            this.count = 1;
        } else {
            const runner = this.head;
            while (runner.next != null) {
                runner = runner.next
            }
            runner.next = newNode;
            this.count++
        }
        return this.count
    }

    pop() {
        if (this.isEmpty()){
            return undefined
        } 
        if(this.count === 1) {
            const lastNode = this.head
            this.head = null;
            this.count--
            return lastNode;
        } 
        else if(this.count === 2){
            const lastNode = this.head.next
            this.head.next = null
            this.count--
            return lastNode
        }
        else {
            const runner = this.head;
            while (runner.next.next != null){
                runner = runner.next
            }
            const lastNode = runner.next
            runner.next = null;
            this.count--
            return lastNode
        }
    }

    peek() {
        if (this.isEmpty()){
            return undefined
        } 
        if(this.count === 1) {
            return this.head;
        } 
        else if(this.count === 2){
            return this.head.next
        }
        else {
            const runner = this.head;
            while (runner.next.next != null){
                runner = runner.next
            }
            return runner.next
        }
    }

    size() {
        return this.count
    }
    
}

export default Stack

// const newStack = new Stack;
// console.log(newStack.push(5))
// console.log(newStack.peek())
// console.log(newStack.size())
// console.log(newStack.isEmpty())
// console.log(newStack.push(5))
// console.log(newStack.pop())
// console.log(newStack.isEmpty())
// console.log(newStack.size())

console.log("BREAK")
const newListStack = new LinkedListStack
console.log(newListStack.push(5))
// console.log(newListStack.peek())
// console.log(newListStack.size())
console.log(newListStack.isEmpty())
console.log(newListStack)
// console.log(newListStack.push(5))
console.log(newListStack.peek())
console.log(newListStack)
// console.log(newListStack.pop())
console.log(newListStack.size())
console.log(newListStack.pop())
console.log(newListStack.peek())
console.log(newListStack.isEmpty())
console.log(newListStack.size())
// console.log(newListStack.size())