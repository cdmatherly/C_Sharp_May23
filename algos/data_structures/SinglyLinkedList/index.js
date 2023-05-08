/**
 * A class to represent a single item of a SinglyLinkedList that can be
 * linked to other Node instances to form a list of linked nodes.
 */
class ListNode {
  /**
   * Constructs a new Node instance. Executed when the 'new' keyword is used.
   * @param {any} data The data to be added into this new instance of a Node.
   *    The data can be anything, just like an array can contain strings,
   *    numbers, objects, etc.
   * @returns {ListNode} A new Node instance is returned automatically without
   *    having to be explicitly written (implicit return).
   */
  constructor(data) {
    this.data = data;
    /**
     * This property is used to link this node to whichever node is next
     * in the list. By default, this new node is not linked to any other
     * nodes, so the setting / updating of this property will happen sometime
     * after this node is created.
     *
     * @type {ListNode|null}
     */
    this.next = null;
  }
}

/**
 * This class keeps track of the start (head) of the list and to store all the
 * functionality (methods) that each list should have.
 */
class SinglyLinkedList {
  /**
   * Constructs a new instance of an empty linked list that inherits all the
   * methods.
   * @returns {SinglyLinkedList} The new list that is instantiated is implicitly
   *    returned without having to explicitly write "return".
   */
  constructor() {
    /** @type {ListNode|null} */
    this.head = null;
  }

  /**
     * Concatenates the nodes of a given list onto the back of this list.
     * - Time: O(?).
     * - Space: O(?).
     * @param {SinglyLinkedList} addList An instance of a different list whose
     *    whose nodes will be added to the back of this list.
     * @returns {SinglyLinkedList} This list with the added nodes.
     */
    concat(addList) {
      const node = addList.head;
      if (this.isEmpty()) {
        this.head = node;
      } else {
        let runner = this.head;
        while (runner.next !== null) {
          runner = runner.next;
        }
        runner.next = node;
      }
      return this;
    }

    /**
     * Finds the node with the smallest data and moves that node to the front of
     * this list.
     * - Time: O(?).
     * - Space: O(?).
     * @returns {SinglyLinkedList} This list.
     */
    moveMinToFront() {
      const minVal = this.recursiveMin()
      this.removeVal(minVal)
      this.insertAtFront(min)
      return this;
    }

    // EXTRA
    /**
     * Splits this list into two lists where the 2nd list starts with the node
     * that has the given value.
     * splitOnVal(5) for the list (1=>3=>5=>2=>4) will change list to (1=>3)
     * and the return value will be a new list containing (5=>2=>4)
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} val The value in the node that the list should be split on.
     * @returns {SinglyLinkedList} The split list containing the nodes that are
     *    no longer in this list.
     */
    splitOnVal(val) {
      let runner = this.head;
      while (runner.next !== null){
        if (runner.next.data === val){
          const newList = new SinglyLinkedList();
          newList.head = runner.next;
          runner.next = null;
          return newList;
        }
        runner = runner.next
      }
    }

  /**
 * Retrieves the data of the second to last node in this list.
 * - Time: O(?).
 * - Space: O(?).
 * @returns {any} The data of the second to last node or null if there is no
 *    second to last node.
 */
  secondToLast() {
    if (this.isEmpty() || this.head.next === null) {
      return null;
    }

    // More than 1 node.
    let runner = this.head;

    while (runner.next.next) {
      runner = runner.next;
    }

    return runner.data
  }

  /**
   * Removes the node that has the matching given val as its data.
   * - Time: O(?).
   * - Space: O(?).
   * @param {any} val The value to compare to the node's data to find the
   *    node to be removed.
   * @returns {boolean} Indicates if a node was removed or not.
   */
  removeVal(val) {


    let current = this.head;
    while (current) {
      if (current.next.data === val) {
        current.next = current.next.next
        return true
      }
      current = current.next
    }
    return false;
  }

// EXTRA
/**
 * Inserts a new node before a node that has the given value as its data.
 * - Time: O(?).
 * - Space: O(?).
 * @param {any} newVal The value to use for the new node that is being added.
 * @param {any} targetVal The value to use to find the node that the newVal
 *    should be inserted in front of.
 * @returns {boolean} To indicate whether the node was pre-pended or not.
 */
prepend(newVal, targetVal) {
  let current = this.head;
    while (current) {
      if (current.next.data === targetVal) {
        let newNode = new ListNode(newVal)
        newNode.next = current.next
        current.next = newNode
        return true
      }
      current = current.next
    }
    return false;
}

/**
   * Removes the last node of this list.
   * - Time: O(?).
   * - Space: O(?).
   * @returns {any} The data from the node that was removed.
   */
removeBack() {
  if (this.isEmpty) {
    return null;
  }
  if (this.head.next === null) {
    return this.removeHead();
  }
  let runner = this.head;
  let prev;
  while (runner.next !== null) {
    prev = runner;
    runner = runner.next;
  }
  const data = prev.next.data;
  prev.next = null;
  return data;
}

/**
 * Determines whether or not the given search value exists in this list.
 * - Time: O(?).
 * - Space: O(?).
 * @param {any} val The data to search for in the nodes of this list.
 * @returns {boolean}
 */
contains(val) {
  let current = this.head;
  while (current) {
    if (current.data === val) {
      return true;
    }
    current = current.next
  }
  return false;
}

/**
 * Determines whether or not the given search value exists in this list.
 * - Time: O(?).
 * - Space: O(?).
 * @param {any} val The data to search for in the nodes of this list.
 * @param {?ListNode} current The current node during the traversal of this list
 *    or null when the end of the list has been reached.
 * @returns {boolean}
 */
containsRecursive(val, current = this.head) {
  if (!current) {
    return false;
  }
  if (current.data === val) {
    return true;
  }
  return this.containsRecursive(val, current.next)
}

// EXTRA
/**
 * Recursively finds the maximum integer data of the nodes in this list.
 * - Time: O(?).
 * - Space: O(?).
 * @param {ListNode} runner The start or current node during traversal, or null
 *    when the end of the list is reached.
 * @param {ListNode} maxNode Keeps track of the node that contains the current
 *    max integer as it's data.
 * @returns {?number} The max int or null if none.
 */
recursiveMax(runner = this.head, maxNode = this.head) {
  if (this.head === null) {
    return null;
  }
  if (!runner) {
    return maxNode.data;
  }
  if (runner.data > maxNode.data) {
    maxNode = runner;
  }

  return this.recursiveMax(runner.next, maxNode)
}

recursiveMin(runner = this.head, minNode = this.head) {
  if (this.head === null) {
      return null;
  }

  if (runner === null) {
      return minNode.data;
  }

  if (runner.data < minNode.data) {
      minNode = runner;
  }

  return this.recursiveMin(runner.next, minNode);
}

/**
 * Creates a new node with the given data and inserts that node at the front
 * of this list.
 * - Time: (?).
 * - Space: (?).
 * @param {any} data The data for the new node.
 * @returns {SinglyLinkedList} This list.
 */
insertAtFront(data) {
  const node = new ListNode(data);
  node.next = this.head;
  this.head = node;
  return this;
}

/**
 * Removes the first node of this list.
 * - Time: (?).
 * - Space: (?).
 * @returns {any} The data from the removed node.
 */
removeHead() {
  const nodeToRemove = this.head;
  if (!this.isEmpty()) {
    this.head = nodeToRemove.next;
  } else {
    return null
  }
  return nodeToRemove.data;
}

// EXTRA
/**
 * Calculates the average of this list.
 * - Time: (?).
 * - Space: (?).
 * @returns {number|NaN} The average of the node's data.
 */
average() {
  if (this.isEmpty()) {
    return NaN;
  } else {
    let counter = 1;
    let runner = this.head;
    let sum = runner.data;
    while (runner.next !== null) {
      sum += runner.next.data;
      counter++;
      runner = runner.next;
    }
    return sum / counter;
  }
}

/**
 * Determines if this list is empty.
 * - Time: O(?).
 * - Space: O(?).
 * @returns {boolean}
 */
isEmpty() {
  return this.head === null;
}

/**
 * Creates a new node with the given data and inserts it at the back of
 * this list.
 * - Time: O(?).
 * - Space: O(?).
 * @param {any} data The data to be added to the new node.
 * @returns {SinglyLinkedList} This list.
 */
insertAtBack(data) {
  const node = new ListNode(data);
  if (this.isEmpty()) {
    this.head = node;
  } else {
    let runner = this.head;
    while (runner.next !== null) {
      runner = runner.next;
    }
    runner.next = node;
  }
  return this;
}

/**
 * Creates a new node with the given data and inserts it at the back of
 * this list.
 * - Time: O(?).
 * - Space: O(?).
 * @param {any} data The data to be added to the new node.
 * @param {?ListNode} runner The current node during the traversal of this list
 *    or null when the end of the list has been reached.
 * @returns {SinglyLinkedList} This list.
 */

insertAtBackRecursive(data, runner = this.head) {
  if (this.isEmpty()) {
    this.head = new ListNode(data);
    return this;
  }

  if (runner.next === null) {
    runner.next = new ListNode(data);
    return this;
  }
  return this.insertAtBackRecursive(data, runner.next);
}

/**
 * Calls insertAtBack on each item of the given array.
 * - Time: O(n * m) n = list length, m = arr.length.
 * - Space: O(1) constant.
 * @param {Array<any>} vals The data for each new node.
 * @returns {SinglyLinkedList} This list.
 */
insertAtBackMany(vals) {
  for (const item of vals) {
    this.insertAtBack(item);
  }
  return this;
}

/**
 * Converts this list into an array containing the data of each node.
 * - Time: O(n) linear.
 * - Space: O(n).
 * @returns {Array<any>} An array of each node's data.
 */
toArr() {
  const arr = [];
  let runner = this.head;

  while (runner) {
    arr.push(runner.data);
    runner = runner.next;
  }
  return arr;
}
}

const list = new SinglyLinkedList();

list.insertAtBack("no");
list.insertAtFront(1);
list.insertAtBack()
list.insertAtBack(5);
list.insertAtBack("dolphin")
list.insertAtBack(4)
list.insertAtBack(0)
list.removeBack()
console.log(list.contains(3))
console.log(list.containsRecursive("dolphin"))
console.log("Second to last: " + list.secondToLast())
list.prepend(3,4)
// console.log(list.recursiveMax())

const newList = list.splitOnVal(5)

// const list2 = new SinglyLinkedList();

// list2.insertAtBack("no");
// list2.insertAtFront(1);
// list2.insertAtBack()
// list2.insertAtBack(5);
// list2.insertAtBack("dolphin")
// list2.insertAtBack(4)
// list2.insertAtBack(0)

// list.concat(list2)

console.log(list.toArr());
console.log(newList.toArr());
