import CustomArray from "./CustomArray";

class InsertableArray extends CustomArray {
  // 4-  Extend the Array class and add a new method to insert an item at a given index
  public insertAt(item: number, index: number): void {
    if (index < 0) throw new Error("index out of bounds");

    const newSize = index > this.items.length ? index + 1 : this.items.length;

    const newItems = new Array<number>(newSize);

    newItems[index] = item;

    for (let i = 0; i < newItems.length; i++) {
      if (i < this.next && i < index) {
        newItems[i] = this.items[i];
        continue;
      }

      if (i < this.next && i >= index) {
        newItems[i + 1] = this.items[i];
        continue;
      }

      if (i < index && !newItems[i]) newItems[i] = 0;
    }

    this.items = newItems;
    this.next = this.next > index ? this.next + 1 : index + 1;
  }
}

export default InsertableArray;