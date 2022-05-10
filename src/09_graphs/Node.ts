class Node {
  private label: string;

  constructor(label: string) {
    this.label = label;
  }

  public toString(): string {
    return this.label;
  }
}

export default Node;