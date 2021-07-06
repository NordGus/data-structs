// Lookup O(log n)
// Insert O(log n)
// Delete O(log n)

export class MaxHeap {
  private _items: number[];
  private _size: number;

  constructor(size?: number) {
    this._items = new Array(size || 10);
    this._size = 0;
  }

  get size(): number {
    return this._size;
  }

  isFull(): boolean {
    return this._size === this._items.length;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  toArray(): number[] {
    const arr = new Array(this._size);

    for (let i = 0; i < this._size; i++) arr[i] = this._items[i];

    return arr;
  }

  insert(value: number): void {
    if (this.isFull()) throw new Error("illegal state");

    this._items[this._size++] = value;

    this._bubbleUp(this._size - 1);
  }

  private _bubbleUp(index: number): void {
    let current = index;

    while (
      current > 0 &&
      this._items[current] > this._items[this._parent(current)]
    ) {
      this._swapItems(current, this._parent(current));
      current = this._parent(current);
    }
  }

  remove(): number {
    if (this.isEmpty()) throw new Error("illegal state");

    const root = this._items[0];

    this._items[0] = this._items[--this._size];

    this._bubbleDown(0);

    return root;
  }

  private _bubbleDown(index: number): void {
    let current = index;

    while (this._validIndex(current) && !this._isValidParent(current)) {
      const child = this._largerChild(current);
      this._swapItems(current, child);
      current = child;
    }
  }

  private _isValidParent(parent: number): boolean {
    if (!this._hasLeftChild(parent)) return true;

    let valid = this._items[parent] >= this._items[this._leftChild(parent)];

    if (this._hasRightChild(parent))
      valid =
        valid && this._items[parent] >= this._items[this._rightChild(parent)];

    return valid;
  }

  private _largerChild(parent: number): number {
    if (!this._hasLeftChild(parent)) return parent;
    if (!this._hasRightChild(parent)) return this._leftChild(parent);

    const left = this._leftChild(parent);
    const right = this._rightChild(parent);

    if (this._items[left] > this._items[right]) return left;
    else return right;
  }

  private _validIndex(index: number): boolean {
    return index <= this._size;
  }

  private _hasLeftChild(index: number): boolean {
    return this._validIndex(this._leftChild(index));
  }

  private _hasRightChild(index: number): boolean {
    return this._validIndex(this._rightChild(index));
  }

  private _leftChild(parent: number): number {
    return parent * 2 + 1;
  }

  private _rightChild(parent: number): number {
    return parent * 2 + 2;
  }

  private _parent(child: number): number {
    return Math.floor((child - 1) / 2);
  }

  private _swapItems(first: number, second: number): void {
    const temp = this._items[first];
    this._items[first] = this._items[second];
    this._items[second] = temp;
  }
}
