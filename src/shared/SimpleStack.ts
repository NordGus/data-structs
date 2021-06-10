interface Node<T> {
  value: T;
  next?: Node<T>;
}

class Stack<T> {
  private top: Node<T>;
  private count: number;
  private maxSize: number;

  constructor(size?: number) {
    this.top = null;
    this.count = 0;
    this.maxSize = size;
  }

  peek(): T {
    if (!this.top) throw new Error("illegal state");

    return this.top.value;
  }

  push(val: T): void {
    if (this.isFull()) throw new Error("stack overflow");

    this.top = { value: val, next: this.top };
    this.count++;
  }

  pop(): T {
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

export default Stack;
