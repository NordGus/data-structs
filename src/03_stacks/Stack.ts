import Node from "../03_stacks/Node";

class Stack {
  private top: Node;
  private count: number;
  private size = 10;

  constructor(size?: number) {
    this.top = null;
    this.count = 0;
    if (size) this.size = size;
  }

  public empty(): boolean {
    return this.isEmpty();
  }

  public peek(): any {
    if (this.isEmpty()) throw new Error("illegal state");

    return this.top.item;
  }

  public push(item: any): void {
    if (this.isFull()) throw new Error("stack overflow");

    const node = new Node(item);

    if (this.top) node.next = this.top;

    this.top = node;
    this.count++;
  }

  public pop(): any {
    if (this.isEmpty()) throw new Error("illegal state");

    const poped = this.top;
    this.top = this.top.next;
    poped.next = null;

    this.count--;
    return poped.item;
  }

  private isEmpty(): boolean {
    return !this.top;
  }

  private isFull(): boolean {
    return this.count === this.size;
  }
}

export default Stack;
