interface Node {
  value: number;
  next?: Node;
}

class Stack {
  private top: Node;
  private count: number;
  private maxSize: number;

  constructor(size?: number) {
    this.top = null;
    this.count = 0;
    this.maxSize = size;
  }

  peek(): number {
    if (!this.top) throw new Error("illegal state");

    return this.top.value;
  }

  push(val: number): void {
    if (this.isFull()) throw new Error("stack overflow");

    this.top = { value: val, next: this.top };
    this.count++;
  }

  pop(): number {
    if (!this.top) throw new Error("illegal state");

    const poped = this.top;
    this.top = this.top.next;
    poped.next = null;
    this.count--;

    return poped.value;
  }

  isEmpty(): boolean {
    return !this.top;
  }

  get size(): number {
    return this.count;
  }

  private isFull(): boolean {
    if (this.maxSize) return this.count === this.maxSize;
    return false;
  }
}

class StackQueue {
  private count: number;
  private size: number;
  private enqueue: Stack;
  private dequeue: Stack;

  constructor(size: number) {
    this.size = size;
    this.count = 0;
    this.enqueue = new Stack(size);
    this.dequeue = new Stack(size);
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

    return this.glance();
  }

  peek(): number {
    if (this.isEmpty()) return null;

    return this.glance();
  }

  remove(): number {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.pop();
  }

  poll(): number {
    if (this.isEmpty()) return null;

    const _ = this.transferToDequeue();
    this.count--;
    return this.dequeue.pop();
  }

  isEmpty(): boolean {
    return this.enqueue.isEmpty() && this.dequeue.isEmpty();
  }

  isFull() {
    return this.count === this.size;
  }

  toArray(): number[] {
    if (this.isEmpty()) return [];

    let arr = new Array(this.count);
    let dump = new Stack(this.size);

    for (let i = 0; i < this.count; i++) {
      const _ = this.transferToDequeue();
      let val = this.dequeue.pop();

      arr[i] = val;

      dump.push(val);
    }

    for (let i = 0; i < this.count; i++) this.dequeue.push(dump.pop());

    return arr;
  }

  /* Private Methods */

  private push(val: number): void {
    this.enqueue.push(val);
    this.count++;
  }

  private pop(): number {
    const _ = this.transferToDequeue();
    this.count--;
    return this.dequeue.pop();
  }

  private glance(): number {
    const _ = this.transferToDequeue();
    return this.dequeue.peek();
  }

  private transferToDequeue(): boolean {
    if (this.dequeue.isEmpty())
      for (; !this.enqueue.isEmpty(); ) this.dequeue.push(this.enqueue.pop());

    return true;
  }
}

export default StackQueue;
