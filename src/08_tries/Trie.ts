// Cabify question

import LinkedList from "../shared/SimpleLinkedList";

// lookup O(L) L = lenght of the word
// insert O(L)
// remove O(L)

class Node {
  private _value: string;
  private _children: Map<string, Node>;
  private _end: boolean;

  constructor(value: string) {
    this._value = value;
    this._children = new Map<string, Node>();
    this._end = false;
  }

  get end(): boolean {
    return this._end;
  }

  set end(v: boolean) {
    this._end = v;
  }

  getChild(v: string): Node {
    return this._children.get(v);
  }

  addChild(v: string): void {
    this._children.set(v, new Node(v));
  }

  hasChild(v: string): boolean {
    return this._children.has(v);
  }

  getChildren(): Node[] {
    return Array.from(this._children.values());
  }

  hasChildren(): boolean {
    return this._children.size > 0;
  }

  removeChild(v: string): boolean {
    return this._children.delete(v);
  }

  get value(): string {
    return this._value;
  }
}

class Trie {
  private _root: Node;

  constructor() {
    this._root = new Node(" ");
  }

  insert(word: string): boolean {
    if (!word) return false;
    if (typeof word !== "string") return false;

    let current = this._root;

    for (const char of word) {
      if (!current.hasChild(char)) current.addChild(char);

      current = current.getChild(char);
    }

    current.end = true;
    return true;
  }

  contains(word: string): boolean {
    if (!word) return false;
    if (typeof word !== "string") return false;

    let current = this._root;

    for (const char of word) {
      if (!current.hasChild(char)) return false;
      current = current.getChild(char);
    }

    return current.end;
  }

  toOrderedArray(): string[] {
    const list = new LinkedList<string>();

    this._orderedTraverse(this._root, list);

    return list.toArray();
  }

  private _orderedTraverse(root: Node, list: LinkedList<string>) {
    if (root !== this._root) list.addLast(root.value);
    const children = root.getChildren();
    for (const child of children) this._orderedTraverse(child, list);
  }

  toReversedArray(): string[] {
    const list = new LinkedList<string>();

    this._reversedTraverse(this._root, list);

    return list.toArray();
  }

  private _reversedTraverse(root: Node, list: LinkedList<string>) {
    const children = root.getChildren();

    for (const child of children) this._reversedTraverse(child, list);

    if (root !== this._root) list.addLast(root.value);
  }

  remove(word: string): string {
    if (!word) throw new Error("illegal argument");
    if (typeof word !== "string") throw new Error("illegal argument");

    this._remove(this._root, word, 0);

    return word;
  }

  private _remove(root: Node, word: string, index: number): void {
    if (index === word.length) {
      root.end = false;
      return;
    }

    const char = word[index];
    const child = root.getChild(char);
    if (!child) return;

    this._remove(child, word, index + 1);

    if (!child.hasChildren() && !child.end) root.removeChild(char);
  }
}

export default Trie;
