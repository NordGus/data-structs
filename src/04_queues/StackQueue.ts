import Stack from "../shared/SimpleStack";

class StackQueue<T> {
  private count: number;
  private size: number;
  private enqueue: Stack<T>;
  private dequeue: Stack<T>;

  constructor(size: number) {
    this.size = size;
    this.count = 0;
    this.enqueue = new Stack<T>(size);
    this.dequeue = new Stack<T>(size);
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

    return this.glance();
  }

  peek(): T {
    if (this.isEmpty()) return null;

    return this.glance();
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
    return this.enqueue.isEmpty() && this.dequeue.isEmpty();
  }

  isFull(): boolean {
    return this.count === this.size;
  }

  toArray(): T[] {
    if (this.isEmpty()) return [];

    let arr = new Array<T>(this.count);
    let dump = new Stack<T>(this.size);

    for (let i = 0; i < this.count; i++) {
      const _ = this.moveEnqueueToDequeue();
      let val = this.dequeue.pop();

      arr[i] = val;

      dump.push(val);
    }

    for (let i = 0; !dump.isEmpty(); i++) this.dequeue.push(dump.pop());

    return arr;
  }

  /* Private Methods */

  private push(val: T): void {
    this.enqueue.push(val);
    this.count++;
  }

  private pop(): T {
    const _ = this.moveEnqueueToDequeue();
    this.count--;

    return this.dequeue.pop();
  }

  private glance(): T {
    const _ = this.moveEnqueueToDequeue();

    return this.dequeue.peek();
  }

  private moveEnqueueToDequeue(): boolean {
    if (this.dequeue.isEmpty())
      for (; !this.enqueue.isEmpty(); ) this.dequeue.push(this.enqueue.pop());

    return true;
  }
}

export default StackQueue;
