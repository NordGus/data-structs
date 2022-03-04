/* Exercises

1-  Extend the Array class and add a new method to return the largest number. 
      What is the runtime complexity of this method?  
      Solution: Array.max() 
2-  Extend the Array class and add a method to return the common items in this array and another array.  
      Solution: Array.intersect() 
3-  Extend the Array class and add a method to reverse the array. 
      For example, if the array includes [1, 2, 3, 4], after reversing and printing it, 
      we should see [4, 3, 2, 1].  
      Solution: Array.reverse() 
4-  Extend the Array class and add a new method to insert an item at a given index: 
      public void insertAt(int item, int index)
      Solution: Array.insertAt()

*/

class CustomArray {
  private next: number = 0;
  private items: number[];

  constructor(length: number = 0) {
    this.items = new Array<number>(length);
  }

  public insert(item: number): void {
    if (this.next === this.items.length) this.resize();

    this.items[this.next++] = item;
  }

  public print(): void {
    let output = "";

    for (let i = 0; i < this.next; i++) {
      if (i + 1 == this.next) output += `${this.items[i]}`;
      else output += `${this.items[i]}, `;
    }

    console.log(`{ ${output} }`);
  }

  public removeAt(index: number): number {
    if (index < 0 || index >= this.next)
      throw new Error("index is out of bounds");

    let removed: number = this.items[index];

    for (let i = index; i < this.next; i++) this.items[i] = this.items[i + 1];

    this.next--;

    return removed;
  }

  public indexOf(item: number): number {
    for (let i = 0; i < this.next; i++) if (this.items[i] === item) return i;

    return -1;
  }

  // 1-  Extend the Array class and add a new method to return the largest number.
  //     What is the runtime complexity of this method?
  // O(n)
  public max(): number {
    let max = 0;

    for (let i = 0; i < this.next; i++) {
      if (this.items[i] >= max) max = this.items[i];
    }

    return max;
  }

  // 2-  Extend the Array class and add a method to return the common items in this array and another array.
  // O(m^n)
  public intersect(intersector: number[]): number[] {
    let intsected: number[] = [];
    for (let i = 0; i < this.next; i++) {
      for (let j = 0; j < intersector.length; j++) {
        if (this.items[i] === intersector[j]) {
          intsected.push(intersector[j]);
          break;
        }
      }
    }

    return intsected;
  }

  // 3-  Extend the Array class and add a method to reverse the array.
  //     For example, if the array includes [1, 2, 3, 4], after reversing and printing it,
  //     we should see [4, 3, 2, 1].
  public reverse(): void {
    const reversed: number[] = new Array<number>(this.items.length);

    for (let i = 0; i < this.next; i++)
      reversed[this.next - 1 - i] = this.items[i];

    this.items = reversed;
  }

  // 4-  Extend the Array class and add a new method to insert an item at a given index:
  //     public void insertAt(int item, int index)
  public insertAt(item: number, index: number): void {
    if (index < 0) throw new Error("index out of bounds");

    const newSize = index > this.items.length ? index + 1 : this.items.length;

    const newItems = new Array<number>(newSize);

    newItems[index] = item;

    for (let i = 0; i < newItems.length; i++) {
      if (i < this.next) {
        if (i < index) newItems[i] = this.items[i];
        if (i >= index) newItems[i + 1] = this.items[i];
      } else if (i < index && !newItems[i]) newItems[i] = 0;
    }

    this.items = newItems;
    this.next = this.next > index ? this.next + 1 : index + 1;
  }

  /* Private methods */

  private resize(): void {
    const size: number = this.next || 1;
    const newItems: number[] = new Array<number>(size * 2);

    for (let i = 0; i < this.next; i++) newItems[i] = this.items[i];

    this.items = newItems;
  }
}

export default CustomArray;
