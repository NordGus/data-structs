import Node from "../03_stacks/Node";

class Stack {
  private top: Node;

  constructor() {
    this.top = null;
  }

  public empty(): boolean {
    return this.isEmpty();
  }

  public peek(): any {
    if (this.isEmpty()) return null;

    return this.top.item;
  }

  public push(item: any): void {
    const node = new Node(item);

    if (this.top) node.next = this.top;

    this.top = node;
  }

  public pop(): any {
    if (this.isEmpty()) throw new Error("empty stack");

    const poped = this.top;
    this.top = this.top.next;
    poped.next = null;

    return poped.item;
  }

  private isEmpty(): boolean {
    return !this.top;
  }
}

export default Stack;
