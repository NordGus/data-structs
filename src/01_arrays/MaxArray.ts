import CustomArray from "./CustomArray";

class MaxArray extends CustomArray {
  // Runtine Complexity: O(n)
  public max(): number {
    if (!this.items[0]) return 0;

    let max = this.items[0];

    for (let i = 0; i < this.next; i++) {
      if (this.items[i] >= max) max = this.items[i];
    }

    return max;
  }
}

export default MaxArray;