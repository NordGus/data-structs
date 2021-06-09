class ArrayQueue {
  private count: number;
  private head: number | null;
  private tail: number | null;
  private items: number[];

  constructor(capacity?: number) {
    this.head = null;
    this.tail = null;
    this.count = 0;

    this.items = new Array(capacity || 10);
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

    return this.items[this.head];
  }

  peek(): number {
    if (this.isEmpty()) return null;

    return this.items[this.head];
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
    return this.count === 0;
  }

  isFull() {
    return this.count === this.items.length;
  }

  toArray(): number[] {
    if (this.isEmpty()) return [];

    const arr = new Array(this.count);
    let i = this.head;

    for (let j = 0; j < this.count; j++) {
      arr[j] = this.items[i];

      i = (i + 1) % this.items.length;
    }

    return arr;
  }

  /* Private Methods */

  private push(val: number): void {
    if (this.isEmpty()) this.tail = this.head = 0;
    else this.tail = (this.tail + 1) % this.items.length;

    this.items[this.tail] = val;
    this.count++;
  }

  private pop(): number {
    const val = this.items[this.head];
    this.items[this.head] = undefined;
    this.count--;

    if (this.isEmpty()) this.tail = this.head = null;
    else this.head = this.head + (1 % this.items.length);

    return val;
  }
}

export default ArrayQueue;
