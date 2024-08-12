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
