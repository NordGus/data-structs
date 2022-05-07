import CustomArray from "./CustomArray";

class ReversorArray extends CustomArray {
  // Runtime Complexity: O(n)
  public reverse(): void {
    const reversed = new Array<number>(this.items.length);

    for (let i = 0; i < this.next; i++) reversed[this.next - 1 - i] = this.items[i];

    this.items = reversed;
  }
}

export default ReversorArray;