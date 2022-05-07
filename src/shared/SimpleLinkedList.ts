interface Node<T> {
  value: T;
  next?: Node<T>;
}

class LinkedList<T> {
  protected first: Node<T>;
  protected last: Node<T>;
  protected count: number;

  constructor() {
    this.first = this.last = null;
    this.count = 0;
  }

  public addFirst(item: T): void {
    const node: Node<T> = { value: item, next: null };

    if (this.isEmpty()) this.last = node;
    else node.next = this.first;

    this.first = node;
    this.count++;
  }

  public addLast(item: T): void {
    const node: Node<T> = { value: item, next: null };

    if (this.isEmpty()) this.first = node;
    else this.last.next = node;

    this.last = node;
    this.count++;
  }

  public removeFirst(): T {
    if (this.isEmpty()) throw new Error("empty list");

    let val = this.first.value;

    if (this.first === this.last) this.first = this.last = null;
    else {
      const second = this.first.next;
      this.first.next = null;
      this.first = second;
    }

    this.count--;
    return val;
  }

  public removeLast(): T {
    if (this.isEmpty()) throw new Error("empty list");

    let val = this.last.value;

    if (this.first === this.last) this.first = this.last = null;
    else {
      this.last = this.getPrevious(this.last);
      this.last.next = null;
    }

    this.count--;
    return val;
  }

  public contains(item: T): boolean {
    let current = this.first;

    for (; current; ) {
      if (current.value === item) return true;

      current = current.next;
    }

    return false;
  }

  public toArray(): T[] {
    if (this.isEmpty()) return [];

    let arr = new Array(this.count);
    let current = this.first;

    for (let i = 0; current; i++) {
      arr[i] = current.value;
      current = current.next;
    }

    return arr;
  }

  public get start(): T {
    if (this.isEmpty()) throw new Error("empty list");

    return this.first.value;
  }

  public get end(): T {
    if (this.isEmpty()) throw new Error("empty list");

    return this.last.value;
  }

  public get size(): number {
    return this.count;
  }

  public hasLoop(): boolean {
    if (this.isEmpty()) throw new Error("empty list");

    let sensor = this.first;
    let current = this.first;

    for (; sensor && sensor.next; ) {
      if (sensor.next === current) return true;

      sensor = sensor.next.next;
      current = current.next;
    }

    return false;
  }

  public isEmpty(): boolean {
    return !this.first;
  }

  protected getPrevious(node: Node<T>): Node<T> {
    let current = this.first;

    for (; current; ) {
      if (current.next === node) return current;
      current = current.next;
    }

    return null;
  }
}

export default LinkedList;
