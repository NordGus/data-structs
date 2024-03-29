// Cabify question

import LinkedList from "../shared/SimpleLinkedList";
import { Node } from "./Node"

// lookup O(L) L = lenght of the word
// insert O(L)
// remove O(L)

class Trie {
  protected _root: Node;

  constructor() {
    this._root = new Node("");
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

  // recursive implementation looks more clear
  contains(word: string): boolean {
    if (!word) return false;

    return this._contains(this._root, word, 0);
  }

  private _contains(root: Node, word: string, index: number): boolean {
    if (index === word.length) return root.end;
    
    const child = root.getChild(word[index])
    if (!child) return false
    
    return this._contains(child, word, index + 1)
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

  findWords(prefix: string): string[] {
    const prefixNode = this._findLastNodeOf(prefix)
    const list = new LinkedList<string>()
    
    this._findWords(prefixNode, prefix, list)
    
    return list.toArray()
  }

  private _findLastNodeOf(prefix: string): Node {
    if (prefix === null || prefix === undefined) return null;

    return this.__findLastNodeOf(this._root, prefix, 0);
  }

  private __findLastNodeOf(root: Node, word: string, index: number): Node {
    if (index === word.length) return root;

    const child = root.getChild(word[index])
    if (!child) return null

    return this.__findLastNodeOf(child, word, index + 1)
  }

  private _findWords(root: Node, word: string, words: LinkedList<string>): void {
    if (root === null) return;
    if (root.end) words.addLast(word)
    
    for (const child of root.getChildren()) {
      this._findWords(child, word + child.value, words)
    }
  }

  contents(): string[] {
    const list = new LinkedList<string>()

    this._findWords(this._root, "", list)

    return list.toArray()
  }

  get count(): number {
    return this._count(this._root, 0)
  }

  private _count(root: Node, accumulator: number): number {
    if (root.end) accumulator += 1
    
    for (const child of root.getChildren()) {
      accumulator = this._count(child, accumulator)
    }

    return accumulator
  }
}

export default Trie;
