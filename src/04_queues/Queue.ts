interface Node<T> {
  value: T;
  next?: Node<T>;
}

class Queue<T> {
  private count: number;
  private size: number;
  private head: Node<T>;
  private tail: Node<T>;

  constructor(size: number) {
    this.size = size;
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  add(val: T): boolean {
    if (this.isFull()) throw new Error("illegal state");

    try {
      this.push(val);
    } catch (error) {
      return false;
    }

    return true;
  }

  offer(val: T): boolean {
    if (this.isFull()) return false;

    try {
      this.push(val);
    } catch (error) {
      return false;
    }

    return true;
  }

  element(): T {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.front.value;
  }

  peek(): T {
    if (this.isEmpty()) return null;

    return this.front.value;
  }

  remove(): T {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.pop();
  }

  poll(): T {
    if (this.isEmpty()) return null;

    return this.pop();
  }

  isEmpty(): boolean {
    return !this.tail;
  }

  isFull() {
    return this.count === this.size;
  }

  get capacity(): number {
    return this.size;
  }

  toArray(): T[] {
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

  private push(val: T): void {
    const node: Node<T> = { value: val, next: null };

    if (this.isEmpty()) this.tail = this.head = node;
    else {
      this.tail.next = node;
      this.tail = node;
    }

    this.count++;
  }

  private pop(): T {
    let head = this.head;

    if (this.head === this.tail) this.head = this.tail = null;
    else this.head = this.head.next;

    head.next = null;
    this.count--;

    return head.value;
  }

  private get front(): Node<T> {
    return this.head;
  }
}

export default Queue;
