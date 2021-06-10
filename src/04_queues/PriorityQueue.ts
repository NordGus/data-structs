class PriorityQueue<T> {
  private count: number;
  private head: number;
  private capped: boolean;
  private items: T[];

  constructor(capacity?: number) {
    this.capped = !!capacity;
    this.head = 0;
    this.count = 0;
    this.items = capacity ? new Array<T>(capacity) : new Array<T>(1);
  }

  add(val: T): boolean {
    if (this.isFull() && this.capped) throw new Error("illegal state");

    return this.push(val);
  }

  offer(val: T): boolean {
    if (this.isFull() && this.capped) return false;

    return this.push(val);
  }

  remove(): T {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.pop();
  }

  poll(): T {
    if (this.isEmpty()) return null;

    return this.pop();
  }

  element(): T {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.items[this.count - 1];
  }

  peek(): T {
    if (this.isEmpty()) return null;

    return this.items[this.count - 1];
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  isFull(): boolean {
    if (!this.capped) return false;
    return this.items.length === this.count;
  }

  toArray(): T[] {
    if (this.isEmpty()) return [];

    let arr = new Array<T>(this.count);
    let j = 0;

    for (let i = this.count - 1; i >= 0; i--) {
      arr[j] = this.items[i];
      j++;
    }

    return arr;
  }

  /* Private Methods */

  private push(val: T): boolean {
    if (this.isFull() && !this.capped) this.items = this.resize();

    let i = this.shiftItemsToInsert(val);

    this.items[i] = val;
    this.count++;

    return true;
  }

  private pop(): T {
    return this.items[--this.count];
  }

  private resize(): T[] {
    let newItems = new Array<T>(this.items.length * 2);

    for (let i = 0; i < this.items.length; i++) newItems[i] = this.items[i];

    return newItems;
  }

  private shiftItemsToInsert(item: T): number {
    let i = this.count - 1;

    for (; i >= this.head; i--) {
      if (this.items[i] > item) this.items[i + 1] = this.items[i];
      else break;
    }

    return i + 1;
  }
}

export default PriorityQueue;
