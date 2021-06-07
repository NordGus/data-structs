class Node {
  private value: any;
  private address: Node;

  constructor(item: any, next?: Node) {
    this.value = item;
    this.address = next;
  }

  public get item(): any {
    return this.value;
  }

  public get next(): Node {
    return this.address;
  }

  public set next(node: Node) {
    this.address = node;
  }
}

export default Node;
