import Queue from "../shared/SimpleQueue";

class QueuesStack<T> {
  private pushable: Queue<T>;
  private poppable: Queue<T>;
  private top: T;
  private capacity: number;

  constructor(capacity?: number) {
    this.capacity = capacity;

    if (capacity) {
      this.pushable = new Queue<T>(capacity);
      this.poppable = new Queue<T>(capacity);
    } else {
      this.pushable = new Queue<T>();
      this.poppable = new Queue<T>();
    }
  }

  // O(1)
  push(item: T): void {
    if (this.isFull()) throw new Error("stack overflow");

    this.top = item;
    this.pushable.enqueue(item);
  }

  // O(1)
  peek(): T {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.top;
  }

  // O(n)
  pop(): T {
    if (this.isEmpty()) throw new Error("illegal state");

    const _ = this.shiftStacks();

    if (this.size <= 1) this.top = undefined;

    return this.poppable.dequeue();
  }

  // O(1)
  isEmpty(): boolean {
    return this.size === 0;
  }

  // O(1)
  isFull(): boolean {
    return this.capacity === this.pushable.size + this.poppable.size;
  }

  // O(1)
  get size(): number {
    return this.pushable.size + this.poppable.size;
  }

  // O(n)
  private shiftStacks(): boolean {
    let tmp = this.poppable;

    for (; this.pushable.size > 1; ) {
      const item = this.pushable.dequeue();
      tmp.enqueue(item);
      if (this.pushable.size === 1) this.top = item;
    }

    this.poppable = this.pushable;
    this.pushable = tmp;

    return true;
  }
}

export default QueuesStack;
