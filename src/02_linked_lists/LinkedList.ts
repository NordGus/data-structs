/*  Group of nodes ordered in sequence
    each node contains a value and the memory address of the next node
    It has a head and a tail, which references are stored in the class
    
    Lookup
      By value O(n) it needs to iterate the entire list
      By index O(n) it needs to iterate until the index is reached, worse case is at the end
    
    Insert
      At the end: O(1) We create a new node and point the tail node to the new node, then point the tail reference to the new node
      At the beginning: O(1) We create a new node point it to the current head, then point the head reference to the new node
      In the middle: O(n) We need to find the target node by index (O(n)) then point the address to the new node and point the new node the the previous node's target

    Detele
      At the beginning: O(1) We point the head reference to the node targeted by the previos head, then delete the value
      At the end: O(n) We need to find the second to last node (O(n)), delete the address to the tail and point the tail refference to the second to last node
      In the middle: O(n) We need to find the target node and the previos by index (O(n)) then change the previous node's address to the one stored on the target node
*/

import { EmptyListError, IllegalArgumentError } from "../shared/Errors";
import Node from "./Node";

export class LinkedList {
  private first: Node | null;
  private last: Node | null;
  private count: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.count = 0;
  }

  public addFirst(item: number): void {
    const node = new Node(item);

    if (this.isEmpty()) this.first = this.last = node;
    else {
      node.next = this.first;
      this.first = node;
    }

    this.count++;
  }

  public addLast(item: number): void {
    const node = new Node(item);

    if (this.isEmpty()) this.first = this.last = node;
    else {
      this.last.next = node;
      this.last = node;
    }

    this.count++;
  }

  public removeFirst(): void {
    if (this.isEmpty()) throw new EmptyListError();

    if (this.almostEmpty()) this.first = this.last = null;
    else {
      const second = this.first.next;
      this.first.next = null;
      this.first = second;
    }

    this.count--;
  }

  public removeLast(): void {
    if (this.isEmpty()) throw new EmptyListError();

    if (this.almostEmpty()) this.first = this.last = null;
    else {
      this.last = this.getPrevious(this.last);
      this.last.next = null;
    }

    this.count--;
  }

  public contains(item: number): boolean {
    let current = this.first;

    for (; current; ) {
      if (current.item === item) return true;

      current = current.next;
    }

    return false;
  }

  public indexOf(item: number): number {
    let current = this.first;

    for (let i = 0; current !== null; i++) {
      if (current.item === item) return i;
      current = current.next;
    }

    return -1;
  }

  public size(): number {
    return this.count;
  }

  public toArray(): number[] {
    let array: number[] = new Array<number>(this.count);
    let current = this.first;

    for (let i = 0; current; i++, current = current.next)
      array[i] = current.item;

    return array;
  }

  public reverse(): void {
    if (this.isEmpty()) throw new EmptyListError();

    let current = this.first.next;
    let prev = this.first;
    let next = null;

    for (; current !== null; ) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.last = this.first;
    this.last.next = null;
    this.first = prev;
  }

  public getNodeFromEnd(k: number): number {
    if (this.isEmpty()) throw new EmptyListError();
    if (k < 0) throw new IllegalArgumentError();

    let node = this.first;
    let sensor = this.first;

    for (let i = 0; i < k - 1; i++) {
      if (sensor === null) throw new IllegalArgumentError();

      sensor = sensor.next;
    }

    for (; sensor !== this.last; ) {
      node = node.next;
      sensor = sensor.next;
    }

    return node.item;
  }

  public findMiddle(): number[] {
    if (this.isEmpty()) throw new EmptyListError();

    let middle = this.first;
    let sensor = this.first;

    for (; sensor !== this.last && sensor.next !== this.last; ) {
      sensor = sensor.next.next;
      middle = middle.next;
    }

    if (sensor === this.last) return [middle.item];
    else return [middle.item, middle.next.item];
  }

  public hasLoop(): boolean {
    if (this.isEmpty()) throw new EmptyListError();

    let sensor = this.first;
    let current = this.first;

    for (; sensor && sensor.next; ) {
      if (sensor.next === current) return true;

      sensor = sensor.next.next;
      current = current.next;
    }

    return false;
  }

  public print(): void {
    if (this.isEmpty()) console.log("Empty List");
    else console.log(this.toString());
  }

  public forceLoop(force: string = ""): void {
    if (force === "force")
      this.last.next = this.first.next ? this.first.next : this.first;
  }

  public toString(): string {
    let output = "";

    let current = this.first;

    for (; current; ) {
      output += `{ ${current.item} } -> `;

      if (!current.next) output += `{ ${current.next} }`;

      current = current.next;
    }

    return output;
  }

  /* Private Methods */

  private isEmpty(): boolean {
    return !this.first;
  }

  private almostEmpty(): boolean {
    return this.first === this.last;
  }

  private getPrevious(node: Node): Node {
    let current = this.first;

    for (; current; ) {
      if (current.next === node) return current;
      current = current.next;
    }

    return null;
  }
}
