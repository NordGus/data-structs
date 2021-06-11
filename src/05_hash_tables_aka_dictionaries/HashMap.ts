interface Entry {
  key: number;
  value: string;
}

// Collisions are handled with Linear Probing
class HashMap {
  private entries: Entry[];
  private count: number;

  constructor(size: number) {
    this.entries = new Array<Entry>(size);
    this.count = 0;
  }

  put(key: number, value: string): void {
    const entry = { key, value };
    let addr = this.hash(entry.key);
    let jumps = 0;

    while (jumps < this.entries.length) {
      const pair = this.entries[addr];

      if (!pair) {
        this.entries[addr] = entry;
        this.count++;
        return;
      }

      if (pair.key === entry.key) {
        pair.value = entry.value;
        return;
      }

      jumps++;
      addr = (addr + jumps) % this.entries.length;
    }

    throw new Error("map overflow");
  }

  get(key: number): string {
    let addr = this.hash(key);
    let jumps = 0;

    while (jumps < this.entries.length) {
      const pair = this.entries[addr];

      if (pair && pair.key === key) return pair.value;

      jumps++;
      addr = (addr + jumps) % this.entries.length;
    }

    return null;
  }

  remove(key: number): string {
    let addr = this.hash(key);
    let jumps = 0;

    while (jumps < this.entries.length) {
      const pair = this.entries[addr];

      if (pair && pair.key === key) {
        this.entries[addr] = null;
        this.count--;
        return pair.value;
      }

      jumps++;
      addr = (addr + jumps) % this.entries.length;
    }

    return null;
  }

  get size(): number {
    return this.count;
  }

  /* Private Methods */

  private hash(key: number): number {
    return key % this.entries.length;
  }
}

export default HashMap;
