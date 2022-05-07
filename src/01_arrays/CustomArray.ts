class CustomArray {
  protected next: number = 0;
  protected items: number[];

  constructor(length: number = 0) {
    this.items = new Array<number>(length);
  }

  public insert(item: number): void {
    if (this.next === this.items.length) this.resize();

    this.items[this.next++] = item;
  }

  public toString(): string {
    let output = "";

    for (let i = 0; i < this.next; i++) {
      if (i + 1 == this.next) output += `${this.items[i]}`;
      else output += `${this.items[i]}, `;
    }

    return output;
  }

  public removeAt(index: number): number {
    if (index < 0 || index >= this.next) throw new Error("index is out of bounds");

    let removed: number = this.items[index];

    for (let i = index; i < this.next; i++) this.items[i] = this.items[i + 1];

    this.next--;

    return removed;
  }

  public indexOf(item: number): number {
    for (let i = 0; i < this.next; i++) if (this.items[i] === item) return i;

    return -1;
  }

  protected resize(): void {
    const size: number = this.next || 1;
    const newItems: number[] = new Array<number>(size * 2);

    for (let i = 0; i < this.next; i++) newItems[i] = this.items[i];

    this.items = newItems;
  }
}

export default CustomArray;
