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

class TwoStacks {
  private memory: any[];
  private size: number;
  private head1: Stack;
  private head2: Stack;
  private freed: Stack;

  constructor(size?: number) {
    this.size = size || 10;

    this.memory = new Array<any>(this.size);
    this.head1 = new Stack();
    this.head2 = new Stack();
    this.freed = new Stack(this.size);
  }

  public peek1(): number {
    if (this.isEmpty1()) throw new Error("illegal state");

    return this.memory[this.head1.peek()];
  }

  public peek2(): number {
    if (this.isEmpty2()) throw new Error("illegal state");

    return this.memory[this.head2.peek()];
  }

  public push1(val: number): void {
    if (this.isFull()) throw new Error("stack overflow");

    this.head1.push(this.getIndex1());

    this.memory[this.head1.peek()] = val;
  }

  public push2(val: number): void {
    if (this.isFull()) throw new Error("stack overflow");

    this.head2.push(this.getIndex2());

    this.memory[this.head2.peek()] = val;
  }

  public pop1(): number {
    if (this.isEmpty1()) throw new Error("illegal state");

    this.freed.push(this.head1.pop());

    return this.memory[this.freed.peek()];
  }

  public pop2(): number {
    if (this.isEmpty2()) throw new Error("illegal state");

    this.freed.push(this.head2.pop());

    return this.memory[this.freed.peek()];
  }

  public isEmpty1(): boolean {
    return this.head1.size === 0;
  }

  public isEmpty2(): boolean {
    return this.head2.size === 0;
  }

  public isFull1(): boolean {
    return this.isFull();
  }

  public isFull2(): boolean {
    return this.isFull();
  }

  /*  Private Methods */

  private isFull(): boolean {
    return this.freeSpace === 0;
  }

  private get freeSpace(): number {
    return this.size - this.head2.size - this.head1.size;
  }

  private emptyStacks(): boolean {
    return this.isEmpty1() && this.isEmpty2();
  }

  private anyFreedMemory(): boolean {
    return this.freed.size > 0;
  }

  private getIndex1(): number {
    if (this.anyFreedMemory()) return this.freed.pop();
    if (this.emptyStacks()) return 0;

    if (this.isEmpty1()) return this.head2.peek() + 1;
    if (this.isEmpty2()) return this.head1.peek() + 1;
    if (this.head1.peek() > this.head2.peek()) return this.head1.peek() + 1;

    return this.head2.peek() + 1;
  }

  private getIndex2(): number {
    if (this.anyFreedMemory()) return this.freed.pop();
    if (this.emptyStacks()) return 0;

    if (this.isEmpty2()) return this.head1.peek() + 1;
    if (this.isEmpty1()) return this.head2.peek() + 1;
    if (this.head1.peek() > this.head2.peek()) return this.head1.peek() + 1;

    return this.head2.peek() + 1;
  }
}

export default TwoStacks;
