interface MostFrequent {
  value: number;
  count: number;
}

class IntsFinder {
  private items: number[];

  constructor(numbers: number[]) {
    this.items = numbers;
  }

  // O(n²)
  mostFrequent(): number {
    const map = new Map<number, number>();
    let mF: MostFrequent = { value: null, count: null };

    for (let i = 0; i < this.items.length; i++) {
      const value = this.items[i];
      const count = map.has(value) ? map.get(value) + 1 : 1;

      if (mF.count < count) mF = { value, count };

      map.set(value, count);
    }

    return mF.count;
  }

  countPairsWithDiff(k: number): number {
    const pairs = new Set<number[]>();

    for (let i = 0; i < this.items.length; i++) {
      if (this.items.includes(this.items[i] + k))
        pairs.add([this.items[i], this.items[i] + k]);
    }

    return pairs.size;
  }

  twoSum(target: number): number[] {
    const pairs = new Map<number, number[]>();

    for (let i = 0; i < this.items.length; i++)
      for (let j = i + 1; j < this.items.length; j++)
        pairs.set(this.items[i] + this.items[j], [i, j]);

    return pairs.get(target);
  }

  // O(1)
  get numbers(): number[] {
    return this.items;
  }
}

export default IntsFinder;
