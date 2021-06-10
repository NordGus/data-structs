import Stack from "../shared/SimpleStack";
import Queue from "./Queue";

class QueueReverser<T> {
  private stack: Stack<T>;
  private queue: Queue<T>;
  private k: number | null;

  constructor(queue: Queue<T>, k?: number) {
    if (k && k < 0) throw new Error("illegal argument");
    if (k && k > queue.capacity) throw new Error("illegal argument");

    this.stack = new Stack<T>();
    this.queue = queue;
    this.k = k;
  }

  reverse(): void {
    if (this.k >= 0) this.kReverse();
    else this.nonKReverse();
  }

  private kReverse(): void {
    if (this.k === 0) return;

    let tmp = new Queue<T>(this.queue.capacity - this.k);

    for (let i = 1; !this.queue.isEmpty(); i++) {
      if (i <= this.k) this.stack.push(this.queue.remove());
      else tmp.add(this.queue.remove());
    }

    for (let i = 0; i < this.queue.capacity; i++) {
      if (!this.stack.isEmpty()) this.queue.add(this.stack.pop());
      else this.queue.add(tmp.remove());
    }
  }

  private nonKReverse(): void {
    for (; !this.queue.isEmpty(); ) this.stack.push(this.queue.remove());
    for (; !this.stack.isEmpty(); ) this.queue.add(this.stack.pop());
  }
}

export default QueueReverser;
