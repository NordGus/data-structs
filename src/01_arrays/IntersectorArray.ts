import CustomArray from "./CustomArray";

class IntersectorArray extends CustomArray {
  // Runtime Complexity: O(m^n)
  public intersect(intersector: number[]): number[] {
    const intsected = new Array<number>();
    
    for (let i = 0; i < this.next; i++)
      for (let j = 0; j < intersector.length; j++)
        if (this.items[i] === intersector[j]) {
          intsected.push(intersector[j]);
          break;
        }

    return intsected;
  }
}

export default IntersectorArray;