interface Node {
  value: number;
  next?: Node;
}

class Stack {
  private top: Node;

  constructor() {
    this.top = null;
  }

  peek(): number {
    if (!this.top) throw new Error("illegal state");

    return this.top.value;
  }

  push(val: number): void {
    this.top = { value: val, next: this.top };
  }

  pop(): void {
    if (!this.top) throw new Error("illegal state");

    const poped = this.top;

    this.top = this.top.next;

    poped.next = null;
  }

  isEmpty(): boolean {
    return !this.top;
  }
}

class MinStack {
  private state: Stack;
  private min: Stack;

  constructor() {
    this.state = new Stack();
    this.min = new Stack();
  }

  getMin(): number {
    return this.min.peek();
  }

  top(): number {
    return this.state.peek();
  }

  push(val: number): void {
    this.state.push(val);

    if (this.min.isEmpty()) this.min.push(val);
    else if (this.min.peek() > val) this.min.push(val);
    else this.min.push(this.min.peek());
  }

  pop(): void {
    this.state.pop();
    this.min.pop();
  }
}

export default MinStack;
