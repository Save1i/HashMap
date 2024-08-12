class HashMap {
  constructor(capacity = 16, loadfactor = 0.75) {
    this.capacity = capacity;
    this.loadfactor = loadfactor;
    this.size = 0;
    this._baskets = Array.from({ length: this.capacity });
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
    let index = this.hash(key);

    this._baskets[index] = value;

    this.size++;

    if (this.capacity * this.loadfactor < this.size) {
      this._resize();
    }
  }

  _resize() {
    let oldBasket = this._baskets;
    this.capacity *= 2;
    this.size = 0;
    this._baskets = Array.from({ length: this.capacity });

    for (const bucket of oldBasket) {
      this.set();
    }
  }
}

let test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");
console.log(test);
