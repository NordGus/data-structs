class Node {
  private value: number;
  private address: Node | null;

  constructor(item?: number);
  constructor(item: number, next?: Node) {
    this.value = item ? item : 0;
    this.address = next ? next : null;
  }

  public get item(): number {
    return this.value;
  }

  public get next(): Node | null {
    return this.address;
  }

  public set next(node: Node | null) {
    this.address = node;
  }
}

export default Node;
