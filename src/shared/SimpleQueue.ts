import LinkedList from "../shared/SimpleLinkedList";

class Queue<T> {
  private items: LinkedList<T>;
  private capacity: number;

  constructor(capacity?: number) {
    this.capacity = capacity;
    this.items = new LinkedList<T>();
  }

  enqueue(item: T): void {
    if (this.isFull()) throw new Error("illegal state");

    this.items.addLast(item);
  }

  dequeue(): T {
    if (this.isEmpty()) throw new Error("empty queue");

    return this.items.removeFirst();
  }

  peek(): T {
    if (this.isEmpty()) throw new Error("empty queue");

    return this.items.start;
  }

  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  isFull(): boolean {
    return this.capacity === this.size;
  }

  toArray(): T[] {
    return this.items.toArray();
  }

  get size(): number {
    return this.items.size;
  }
}

export default Queue;
