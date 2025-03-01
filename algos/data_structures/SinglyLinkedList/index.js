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
     * Reverses this list in-place without using any extra lists.
     * - Time: (?).
     * - Space: (?).
     * @returns {SinglyLinkedList} This list.
     */
    reverse() { }

    /**
     * Determines whether the list has a loop in it which would result in
     * infinitely traversing unless otherwise avoided. A loop is when a node's
     * next points to a node that is behind it.
     * - Time: (?).
     * - Space: (?).
     * @returns {boolean} Whether the list has a loop or not.
     */
    hasLoop() { }

    /**
   * Concatenates the nodes of a given list onto the back of this list.
   * - Time: O(n) n = "this" list length -> O(n) linear.
   *    addList does not need to be looped over.
   * - Space: O(1) constant, although this list grows by addList's length,
   *    our algo doesn't create extra objects or arrays to take up more space.
   * @param {SinglyLinkedList} addList An instance of a different list whose
   *    whose nodes will be added to the back of this list.
   * @returns {SinglyLinkedList} This list with the added nodes.
   */
    concat(addList) {
        let runner = this.head;

        if (runner === null) {
            this.head = addList.head;
        } else {
            while (runner.next) {
                runner = runner.next;
            }
            runner.next = addList.head;
        }
        return this;
    }

    /**
     * Finds the node with the smallest number as data and moves it to the front
     * of this list.
     * - Time: O(2n) n = list length -> O(n) linear,
     *    2nd loop could go to end if min is at end.
     * - Space: O(1) constant.
     * @returns {SinglyLinkedList} This list.
     */
    moveMinFront() {
        /* 
          Alternatively, we could swap the data only in min node and head,
          but it's better to swap the nodes themselves in case anyone has variables
          pointing to these nodes already so that we don't unexpectedly change the
          the data in those nodes potentially causing unwanted side-effects.
        */
        if (this.isEmpty()) {
            return this;
        }

        let minNode = this.head;
        let runner = this.head;
        let prev = this.head;

        while (runner) {
            if (runner.data < minNode.data) {
                minNode = runner;
            }

            runner = runner.next;
        }
        // now that we know the min, if it is already the head, nothing needs to be done
        if (minNode === this.head) {
            return this;
        }

        runner = this.head;

        while (runner !== minNode) {
            prev = runner;
            runner = runner.next;
        }

        prev.next = minNode.next; // remove the minNode
        minNode.next = this.head;
        this.head = minNode;
        return this;
    }

    /**
     * Finds the node with the smallest data and moves that node to the front of
     * this list.
     * - Time: O(n) linear, n = list length. This avoids the extra loop in
     *    the above sln.
     * - Space: O(n) linear.
     * @returns {SinglyLinkedList} This list.
     */
    moveMinToFront() {
        if (this.isEmpty()) {
            return this;
        }

        let minNode = this.head;
        let runner = this.head;
        let prev = this.head;

        while (runner.next) {
            if (runner.next.data < minNode.data) {
                prev = runner;
                minNode = runner.next;
            }

            runner = runner.next;
        }

        if (minNode === this.head) {
            return this;
        }

        prev.next = minNode.next;
        minNode.next = this.head;
        this.head = minNode;
        return this;
    }

    /**
     * Splits this list into two lists where the 2nd list starts with the node
     * that has the given value.
     * splitOnVal(5) for the list (1=>3=>5=>2=>4) will change list to (1=>3),
     * and the return value will be a new list containing (5=>2=>4)
     * - Time: O(n) linear, n = list length, could split on last node.
     * - Space: O(1) constant.
     * @param {any} val The value in the node that the list should be split on.
     * @returns {SinglyLinkedList} The split list containing the nodes that are
     *    no longer in this list.
     */
    splitOnVal(val) {
        const newList = new SinglyLinkedList();

        if (!this.head) {
            return newList;
        }

        if (this.head.data === val) {
            newList.head = this.head;
            this.head = null;
            return newList;
        }

        let runner = this.head;

        while (runner.next) {
            if (runner.next.data === val) {
                newList.head = runner.next;
                runner.next = null;
                return newList;
            }
            runner = runner.next;
        }
        return newList;
    }


    /**
     * Retrieves the data of the second to last node in this list.
     * - Time: O(n - 1) n = list length -> O(n) linear.
     * - Space: O(1) constant.
     * @returns {any} The data of the second to last node or null if there is no
     *    second to last node.
     */
    secondToLast() {
        if (!this.head || !this.head.next) {
            return null;
        }

        // There are at least 2 nodes since the above return hasn't happened.
        let runner = this.head;

        while (runner.next.next) {
            runner = runner.next;
        }
        return runner.data;
    }

    /**
     * Removes the node that has the given val.
     * - Time: O(n) linear, n = list length since the last node could be the one
     *    that is removed.
     * - Space: O(1) constant.
     * @param {any} val The value to compare to the node's data to find the
     *    node to be removed.
     * @returns {boolean} Indicates if a node was removed or not.
     */
    removeVal(val) {
        if (this.isEmpty()) {
            return false;
        }

        if (this.head.data === val) {
            this.removeHead();
            return true;
        }

        let runner = this.head;

        while (runner.next) {
            if (runner.next.data === val) {
                runner.next = runner.next.next;
                return true;
            }
            runner = runner.next;
        }
        return false;
    }

    /**
     * Inserts a new node before a node with that has a specified value.
     * - Time: O(n) linear, n = list length, because we could end up pre-pending
     *    to the last node.
     * - Space: O(1) constant.
     * @param {any} newVal The value to use for the new node that is being added.
     * @param {any} targetVal The value to use to find the node that the newVal
     *    should be inserted in front of.
     * @returns {ListNode|null} The added node, or null.
     */
    prepend(newVal, targetVal) {
        if (this.isEmpty()) {
            return null;
        }

        if (this.head.data === targetVal) {
            this.insertAtFront(newVal);
            return this.head;
        }

        // we already know we're not going to need to prepend before the head
        let runner = this.head;

        while (runner) {
            // End of list and not found.
            if (runner.next === null) {
                return null;
            }

            if (runner.next.data === targetVal) {
                const prependNode = new ListNode(newVal);
                prependNode.next = runner.next;
                runner.next = prependNode;
                return prependNode;
            }
            runner = runner.next;
        }
    }

    /**
   * Removes the last node of this list.
   * - Time: O(n) linear, n = length of list.
   * - Space: O(1) constant.
   * @returns {any} The data from the node that was removed.
   */
    removeBack() {
        if (this.isEmpty()) {
            return null;
        }

        // Only 1 node.
        if (this.head.next === null) {
            return this.removeHead();
        }

        // More than 1 node.
        let runner = this.head;

        while (runner.next.next) {
            runner = runner.next;
        }

        // after while loop finishes, runner is now at 2nd to last node
        const removedData = runner.next.data;
        runner.next = null; // remove it from list
        return removedData;
    }

    /**
     * This version uses more conditions instead of more returns. It is a good
     * example of how more returns can make the code easier to read and cleaner.
     * Removes the last node of this list.
     * - Time: O(n) linear, n = length of list.
     * - Space: O(1) constant.
     * @returns {any} The data from the node that was removed.
     */
    removeBack2() {
        let removedData = null;

        if (!this.isEmpty()) {
            if (this.head.next === null) {
                // head only node
                removedData = this.removeHead();
            } else {
                let runner = this.head;
                // right of && will only be checked if left is true
                while (runner.next && runner.next.next) {
                    runner = runner.next;
                }

                // after while loop finishes, runner is now at 2nd to last node
                removedData = runner.next.data;
                runner.next = null; // remove it from list
            }
        }
        return removedData;
    }

    /**
     * Determines whether or not the given search value exists in this list.
     * - Time: O(n) linear, n = length of list.
     * - Space: O(1) constant.
     * @param {any} val The data to search for in the nodes of this list.
     * @returns {boolean}
     */
    contains(val) {
        let runner = this.head;

        while (runner) {
            if (runner.data === val) {
                return true;
            }
            runner = runner.next;
        }
        return false;
    }

    /**
     * Determines whether or not the given search value exists in this list.
     * - Time: O(n) linear, n = length of list.
     * - Space: O(n) linear due to the call stack.
     * @param {any} val The data to search for in the nodes of this list.
     * @param {?node} current The current node during the traversal of this list
     *    or null when the end of the list has been reached.
     * @returns {boolean}
     */
    containsRecursive(val, current = this.head) {
        if (current === null) {
            return false;
        }
        if (current.data === val) {
            return true;
        }
        return this.containsRecursive(val, current.next);
    }

    /**
     * Recursively finds the maximum integer data of the nodes in this list.
     * - Time: O(n) linear, n = list length. Max could be at end.
     * - Space: O(n) linear due to the call stack.
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

        if (runner === null) {
            return maxNode.data;
        }

        if (runner.data > maxNode.data) {
            maxNode = runner;
        }

        return this.recursiveMax(runner.next, maxNode);
    }

    /**
     * Creates a new node with the given data and inserts that node at the front
     * of the list.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @param {any} data The data for the new node.
     * @returns {SinglyLinkedList} This list.
     */
    insertAtFront(data) {
        const newHead = new ListNode(data);
        newHead.next = this.head;
        this.head = newHead;
        return this;
    }

    /**
     * Removes the first node of this list.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The data from the removed node.
     */
    removeHead() {
        if (this.isEmpty()) {
            return null;
        }

        const oldHead = this.head;
        this.head = oldHead.next;
        return oldHead.data;
    }

    /**
     * Calculates the average of this list.
     * - Time: O(n) linear, n = length of list.
     * - Space: O(1) constant.
     * @returns {number|NaN} The average of the node's data.
     */
    average() {
        let runner = this.head;
        let sum = 0;
        let cnt = 0;

        while (runner) {
            cnt++;
            sum += runner.data;
            runner = runner.next;
        }

        /**
         * Dividing by 0 will give you NaN (Not a Number), so an empty list
         * will return NaN in this case, it may make sense to allow NaN to be
         * returned, because the average of an empty list doesn't make sense and
         * it could be misleading to return 0 since 0 is the average of any
         * list with a sum of 0 (due to negatives or all zeros).
         */
        return sum / cnt;
    }



    /**
   * Determines if this list is empty.
   * - Time: O(1) constant.
   * - Space: O(1) constant.
   * @returns {boolean}
   */
    isEmpty() {
        return this.head === null;
    }

    /**
     * Finds the node with the smallest data and moves that node to the front of
     * this list.
     * - Time: O(n) linear, n = length of list.
     * - Space: O(1) constant.
     * @returns {SinglyLinkedList} This list.
     */
    insertAtBack(data) {
        const newBack = new ListNode(data);

        if (this.isEmpty()) {
            this.head = newBack;
            return this;
        }

        let runner = this.head;

        while (runner.next !== null) {
            runner = runner.next;
        }

        runner.next = newBack;
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
 * - Time: O(n) linear, n = length of list.
 * - Space: O(n) linear due to the call stack.
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
