// import { Node, LinkedList } from "./LinkedList.mjs";

class Node {
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }

  toString() {
    return this.data;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  prepend(value) {
    const newNode = new Node(value, this.head);

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  size() {
    let currentNode = this.head;
    let i = 0;
    while (currentNode) {
      currentNode = currentNode.next;
      i++;
    }

    return i;
  }

  headEl() {
    let currentNode = this.head;
    return currentNode.data;
  }

  tailEl() {
    let currentNode = this.tail;
    return currentNode.data;
  }

  at(index) {
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode.data;
  }

  pop() {
    this.tail = null;
    return this;
  }

  contains(value) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.data === value) {
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  find(value) {
    let currentNode = this.head;
    let i = 0;
    if (currentNode) {
      while (currentNode) {
        if (currentNode.data === value) {
          return i;
        }
        i++;
        currentNode = currentNode.next;
      }
    }
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString() {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(`( ${currentNode} ) ->`);
      currentNode = currentNode.next;
    }
    nodes.push(`null`);

    return nodes.join(" ");
  }
}

// module.export = { Node, LinkedList };

class HashMap {
  constructor(capacity = 16, loadfactor = 0.75) {
    this.capacity = capacity;
    this.loadfactor = loadfactor;
    this.size = 0;
    this._baskets = Array.from({ length: this.capacity }, () => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return Math.abs(Math.floor(hashCode % 16)); // от 0 до 15;
  }

  set(key, value) {
    const index = this.hash(key);
    const basket = this._baskets[index];

    // Check if the key already exists in the basket to update its value
    let currentNode = basket.head;
    while (currentNode) {
      if (currentNode.data.key === key) {
        currentNode.data.value = value;
        return;
      }
      currentNode = currentNode.next;
    }

    // If the key does not exist, add it
    basket.append({ key, value });
    this.size++;

    if (this.size > this.capacity * this.loadfactor) {
      this._resize();
    }
  }

  at(index) {
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode.data;
  }

  get(key) {
    const index = this.hash(key);
    const basket = this._baskets[index];

    if (basket.head !== null) {
      let currentNode = basket.head;

      while (currentNode) {
        if (currentNode.data.key === key) {
          return basket;
        }
        currentNode = currentNode.next;
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    const basket = this._baskets[index];

    if (basket.head !== null) {
      let currentNode = basket.head;

      while (currentNode) {
        if (currentNode.data.key === key) {
          return true;
        }
        currentNode = currentNode.next;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const basket = this._baskets[index];

    if (basket.head !== null) {
      let currentNode = basket.head;
      let previosNode = null;

      while (currentNode) {
        if (currentNode.data.key === key) {
          if (previosNode === null) {
            basket.head = currentNode.next;
          } else {
            previosNode.next = currentNode.next;
          }

          if (currentNode === basket.tail) {
            basket.tail = previosNode;
          }
          this.size--;
          return true;
        }
        previosNode = currentNode;
        currentNode = currentNode.next;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    if (this._baskets !== null) {
      this.size = 0;
      this.capacity = 16;
      this._baskets = Array.from({ length: this.capacity }, () => new LinkedList());
    }
  }

  keys() {
    const allKeys = [];
    let baskets = this._baskets;

    for (let i = 0; i < this.capacity; i++) {
      let currentNode = baskets[i].head;

      while (currentNode !== null) {
        allKeys.push(currentNode.data.key);
        currentNode = currentNode.next;
      }
    }

    return allKeys;
  }

  values() {
    let allValues = [];
    let baskets = this._baskets;

    for (let i = 0; i < this.capacity; i++) {
      let currentNode = baskets[i].head;

      while (currentNode !== null) {
        allValues.push(currentNode.data.value);
        currentNode = currentNode.next;
      }
    }

    return allValues;
  }

  _resize() {
    console.log("Resizing...");
    let oldBaskets = this._baskets;
    this.capacity *= 2;
    this.size = 0;
    this._baskets = Array.from({ length: this.capacity }, () => new LinkedList());

    oldBaskets.forEach((basket) => {
      if (basket) {
        // Check if the basket is not undefined
        let currentNode = basket.head;
        while (currentNode) {
          let { key, value } = currentNode.data; // Assuming data is stored as an object { key, value }
          this.set(key, value);
          currentNode = currentNode.next;
        }
      }
    });
  }
}

let test = new HashMap();
console.log("fd");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moofn", "silver");
test.set("apple", "RED");
test.set("ap", "REdD");
test.set("o", "WOW");
test.set("no", "WfW");
// console.log(test.remove("o"));
// console.log(test.get("ap"));
// console.log(test.length());

// console.log(test.clear());
console.log(test.values());
