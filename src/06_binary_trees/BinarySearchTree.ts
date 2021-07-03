// has a root, node with no parent, and leafs, nodes with no children

import LinkedList from "../shared/SimpleLinkedList";

// Lookup O(log n)
// Insert O(log n)
// Delete O(log n)

interface Node<V> {
  value: V;
  left?: Node<V>;
  rigth?: Node<V>;
}

class BinarySearchTree {
  private _root: Node<number>;

  constructor(root?: Node<number>) {
    if (!!root) this._root = root;
  }

  insert(value: number): void {
    const node: Node<number> = { value };

    if (!this._root) {
      this._root = node;
      return;
    }

    let parent = this._root;

    while (true) {
      if (parent.value > node.value && !!parent.left) {
        parent = parent.left;
        continue;
      } else if (parent.value < node.value && !!parent.rigth) {
        parent = parent.rigth;
        continue;
      }

      if (parent.value > node.value) {
        parent.left = node;
      } else if (parent.value < node.value) {
        parent.rigth = node;
      }

      break;
    }
  }

  find(value: number): boolean {
    for (let current = this._root; !!current; ) {
      if (current.value > value) current = current.left;
      else if (current.value < value) current = current.rigth;
      else return true;
    }

    return false;
  }

  contains(value: number): boolean {
    return this._contains(this._root, value);
  }

  toArray(traversalType: string, subType?: string): number[] {
    const list = new LinkedList<number>();

    if (traversalType === "depth" && subType === "pre") {
      this.traversePreOrder(this._root, list);
      return list.toArray();
    } else if (traversalType === "depth" && subType === "in") {
      this.traverseInOrder(this._root, list);
      return list.toArray();
    } else if (traversalType === "depth" && subType === "post") {
      this.traversePostOrder(this._root, list);
      return list.toArray();
    } else if (traversalType === "breadth") {
      this.traverseLevelOrder(list);
      return list.toArray();
    } else throw new Error("invalid arguments");
  }

  min(): number {
    if (!this._root) throw new Error("illegal state");

    let current = this._root;
    let last = current;

    for (; current; ) {
      last = current;
      current = current.left;
    }

    return last.value;

    // return this._min(this._root);
  }

  max(): number {
    if (!this._root) throw new Error("illegal state");

    let current = this._root;
    let last = current;

    for (; current; ) {
      last = current;
      current = current.rigth;
    }

    return last.value;

    // return this._max(this._root);
  }

  equals(other: BinarySearchTree): boolean {
    if (!other) return false;

    return this._equals(this._root, other._root);
  }

  isBinarySerachTree(): boolean {
    return this._isBinarySearchTree(this._root, -Infinity, Infinity);
  }

  nodesAtDepth(depth: number): number[] {
    if (depth < 0) throw new Error("illegal argument");

    const list = new LinkedList<number>();

    this._nodesAtDepth(depth, this._root, list);

    return list.toArray();
  }

  areSibling(first: number, second: number): boolean {
    return this._areSibling(this._root, first, second);
  }

  invert(): void {
    this._invert(this._root);
  }

  height(): number {
    return this._height(this._root);
  }

  size(): number {
    return this._size(this._root);
  }

  countLeaves(): number {
    if (!this._root) return 0;

    const list = new LinkedList<number>();

    this._nodesAtDepth(this.height(), this._root, list);

    return list.size;
  }

  getAncestors(value: number): LinkedList<number> {
    const list = new LinkedList<number>();

    this._getAncestors(this._root, value, list);

    return list;
  }

  private _getAncestors(
    root: Node<number>,
    value: number,
    list: LinkedList<number>
  ): void {
    if (!root) return;
    if (root.value === value) return;

    if (this._contains(root.left, value)) {
      list.addFirst(root.value);
      this._getAncestors(root.left, value, list);
    }

    if (this._contains(root.rigth, value)) {
      list.addFirst(root.value);
      this._getAncestors(root.rigth, value, list);
    }
  }

  private traversePreOrder(root: Node<number>, list: LinkedList<number>) {
    if (!root) return;

    list.addLast(root.value);

    this.traversePreOrder(root.left, list);
    this.traversePreOrder(root.rigth, list);
  }

  private traverseInOrder(root: Node<number>, list: LinkedList<number>) {
    if (!root) return;

    this.traverseInOrder(root.left, list);
    list.addLast(root.value);
    this.traverseInOrder(root.rigth, list);
  }

  private traversePostOrder(root: Node<number>, list: LinkedList<number>) {
    if (!root) return;

    this.traversePostOrder(root.left, list);
    this.traversePostOrder(root.rigth, list);
    list.addLast(root.value);
  }

  private traverseLevelOrder(list: LinkedList<number>) {
    const height = this.height();

    for (let i = 0; i <= height; i++) this._nodesAtDepth(i, this._root, list);
  }

  private _size(root: Node<number>): number {
    if (!root) return 0;
    if (!root.left && !root.rigth) return 1;

    return 1 + this._size(root.left) + this._size(root.rigth);
  }

  private _height(root: Node<number>): number {
    if (!root) return -1;
    if (!root.left && !root.rigth) return 0;

    return 1 + Math.max(this._height(root.left), this._height(root.rigth));
  }

  private _equals(first: Node<number>, second: Node<number>): boolean {
    if (!first && !second) return true;

    if (!!first && !!second)
      return (
        first.value === second.value &&
        this._equals(first.left, second.left) &&
        this._equals(first.rigth, second.rigth)
      );

    return false;
  }

  private _isBinarySearchTree(
    root: Node<number>,
    min: number,
    max: number
  ): boolean {
    if (!root) return true;
    if (root.value < min || root.value > max) return false;

    return (
      this._isBinarySearchTree(root.left, min, root.value) &&
      this._isBinarySearchTree(root.rigth, root.value, max)
    );
  }

  private _nodesAtDepth(
    depth: number,
    root: Node<number>,
    list: LinkedList<number>
  ): void {
    if (!root) return;

    if (depth === 0) {
      list.addLast(root.value);
      return;
    }

    depth--;

    this._nodesAtDepth(depth, root.left, list);
    this._nodesAtDepth(depth, root.rigth, list);
  }

  private _invert(root: Node<number>): void {
    if (!root) return;

    const left = root.left;
    const rigth = root.rigth;

    root.left = rigth;
    root.rigth = left;

    this._invert(left);
    this._invert(rigth);
  }

  private _max(root: Node<number>): number {
    if (!root) return -Infinity;
    if (!root.left && !root.rigth) return root.value;

    return Math.max(root.value, this._max(root.left), this._max(root.rigth));
  }

  private _min(root: Node<number>): number {
    if (!root) return Infinity;
    if (!root.left && !root.rigth) return root.value;

    return Math.min(root.value, this._min(root.left), this._min(root.rigth));
  }

  private _contains(root: Node<number>, value: number): boolean {
    if (!root) return false;
    if (root.value > value) return this._contains(root.left, value);
    if (root.value < value) return this._contains(root.rigth, value);

    return true;
  }

  private _areSibling(
    root: Node<number>,
    first: number,
    second: number
  ): boolean {
    if (!root) return false;
    if (!root.left && !root.rigth) return false;
    if (root?.left?.value === first && root?.rigth?.value === second)
      return true;
    if (root?.left?.value === second && root?.rigth?.value === first)
      return true;

    return (
      this._areSibling(root.left, first, second) ||
      this._areSibling(root.rigth, first, second)
    );
  }
}

export default BinarySearchTree;
