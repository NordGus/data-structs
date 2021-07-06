import { MaxHeap } from "./ArrayHeap";

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
