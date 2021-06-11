import LinkedList from "../shared/SimpleLinkedList";

interface Entry<K, V> {
  key: K;
  value?: V;
}

// Collisions are handled with Chaning Strategy
class HashTable<K, V> {
  private entries: LinkedList<Entry<K, V>>[];
  private count: number;

  constructor(size: number) {
    this.entries = new Array<LinkedList<Entry<K, V>>>(size);
    this.count = 0;
  }

  put(key: K, value: V): void {
    const addr = this.hash(key);
    const entry = { key, value };
    let bucket = this.entries[addr];

    if (!bucket) bucket = this.entries[addr] = new LinkedList<Entry<K, V>>();
    if (this.updateEntry(bucket, entry)) return;

    bucket.addLast(entry);
    this.count++;
  }

  get(key: K): V {
    const addr = this.hash(key);
    const bucket = this.entries[addr];
    let val: V = null;

    if (bucket) val = this.retriveValue(key, bucket);

    return val;
  }

  remove(key: K): V {
    const addr = this.hash(key);
    const bucket = this.entries[addr];
    let val: V = null;

    if (bucket) val = this.removeEntryFromChain(key, bucket);

    this.count--;
    return val;
  }

  get size(): number {
    return this.count;
  }

  /* Private Methods */

  private hash(key: K): number {
    if (typeof key === "number") return key % this.entries.length;

    return 0;
  }

  private retriveValue(key: K, bucket: LinkedList<Entry<K, V>>): V {
    let pairs = bucket.toArray();

    for (let i = 0; i < pairs.length; i++)
      if (pairs[i].key === key) return pairs[i].value;

    return null;
  }

  private updateEntry(
    bucket: LinkedList<Entry<K, V>>,
    entry: Entry<K, V>
  ): boolean {
    let updated = false;

    for (let i = 0; i < bucket.size; i++) {
      const storedEntry = bucket.removeFirst();

      if (storedEntry.key === entry.key) {
        storedEntry.value = entry.value;
        updated = true;
      }

      bucket.addLast(storedEntry);
    }

    return updated;
  }

  private removeEntryFromChain(key: K, bucket: LinkedList<Entry<K, V>>): V {
    let val: V = null;

    for (let i = 0; i < bucket.size; i++) {
      const entry = bucket.removeFirst();

      if (entry.key === key) val = entry.value;
      else bucket.addLast(entry);
    }

    return val;
  }
}

export default HashTable;
