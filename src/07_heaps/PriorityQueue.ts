import { MaxHeap, MinHeap } from "./ArrayHeap";

export class MinPriorityQueue {
  private _heap: MinHeap;

  constructor(size?: number) {
    this._heap = new MinHeap(size);
  }

  get size(): number {
    return this._heap.size;
  }

  add(value: string, priority: number): void {
    this._heap.insert({ key: priority, value: value });
  }

  remove(): string {
    return this._heap.remove().value;
  }

  isEmpty(): boolean {
    return this._heap.isEmpty();
  }
}

class PriorityQueue {
  private _heap: MaxHeap;

  constructor(size?: number) {
    this._heap = new MaxHeap(size);
  }

  get size(): number {
    return this._heap.size;
  }

  enqueue(item: number): void {
    this._heap.insert(item);
  }

  dequeue(): number {
    return this._heap.remove();
  }

  isEmpty(): boolean {
    return this._heap.isEmpty();
  }
}

export default PriorityQueue;
