// Cabify question

import LinkedList from "../shared/SimpleLinkedList";
import { Node } from "./Node"

// lookup O(L) L = lenght of the word
// insert O(L)
// remove O(L)

class Trie {
  private _root: Node;

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

  contains(word: string): boolean {
    if (!word) return false;

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

    let current = this._root;

    for (const char of prefix) {
      if (!current.hasChild(char)) return null;
      current = current.getChild(char);
    }

    return current;
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
}

export default Trie;
