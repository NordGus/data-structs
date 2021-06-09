interface Node {
  value: number;
  next?: Node;
}

class Queue {
  private count: number;
  private size: number;
  private head: Node;
  private tail: Node;

  constructor(size: number) {
    this.size = size;
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  add(val: number): boolean {
    if (this.isFull()) throw new Error("illegal state");

    try {
      this.push(val);
    } catch (error) {
      return false;
    }

    return true;
  }

  offer(val: number): boolean {
    if (this.isFull()) return false;

    try {
      this.push(val);
    } catch (error) {
      return false;
    }

    return true;
  }

  element(): number {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.front.value;
  }

  peek(): number {
    if (this.isEmpty()) return null;

    return this.front.value;
  }

  remove(): number {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.pop();
  }

  poll(): number {
    if (this.isEmpty()) return null;

    return this.pop();
  }

  isEmpty(): boolean {
    return !this.tail;
  }

  isFull() {
    return this.count === this.size;
  }

  toArray(): number[] {
    if (this.isEmpty()) return [];

    let arr = new Array(this.count);
    let current = this.head;

    for (let i = 0; current; i++) {
      arr[i] = current.value;
      current = current.next;
    }

    return arr;
  }

  /* Private Methods */

  private push(val: number): void {
    const node = { value: val };

    if (this.isEmpty()) this.tail = this.head = node;
    else {
      this.tail.next = node;
      this.tail = node;
    }

    this.count++;
  }

  private pop(): number {
    let head = this.head;
    this.head = this.head.next;
    head.next = null;
    this.count--;

    return head.value;
  }

  private get front(): Node {
    return this.head;
  }
}

export default Queue;
