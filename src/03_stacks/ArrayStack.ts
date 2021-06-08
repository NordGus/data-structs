class ArrayStack {
  private stack: any[];
  private size = 10;
  private count: number;

  constructor(size?: number) {
    if (size) this.size = size;

    this.stack = new Array<any>(this.size);
    this.count = 0;
  }

  public empty(): boolean {
    return this.isEmpty();
  }

  public peek(): any {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.stack[this.count - 1];
  }

  public push(item: any): void {
    if (this.isFull()) throw new Error("stack overflow");

    this.stack[this.count++] = item;
  }

  public pop(): any {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.stack[--this.count];
  }

  private isEmpty(): boolean {
    return this.count === 0;
  }

  private isFull(): boolean {
    return this.size === this.count;
  }
}

export default ArrayStack;
