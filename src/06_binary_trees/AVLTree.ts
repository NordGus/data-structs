import LinkedList from "../shared/SimpleLinkedList";

interface AVLNode<V> {
  value: V;
  left?: AVLNode<V>;
  right?: AVLNode<V>;
  height: number;
}

function AVLNode<V>(value: V): AVLNode<V> {
  return { value, height: 0 };
}

class AVLTree {
  private _root: AVLNode<number>;

  constructor(root?: AVLNode<number>) {
    if (!!root) this._root = root;
  }

  /* insert */

  insert(value: number): void {
    this._root = this._insert(this._root, value);
  }

  private _insert(root: AVLNode<number>, value: number): AVLNode<number> {
    if (!root) return AVLNode<number>(value);

    if (root.value > value) root.left = this._insert(root.left, value);
    else root.right = this._insert(root.right, value);

    root.height = this._calculateNodeHeight(root);

    return this._balance(root);
  }

  private _height(node: AVLNode<number>): number {
    return !node ? -1 : node.height;
  }

  private _calculateNodeHeight(node: AVLNode<number>): number {
    return Math.max(this._height(node.left), this._height(node.right)) + 1;
  }

  private _balance(root: AVLNode<number>): AVLNode<number> {
    if (this._isLeftHeavy(root)) {
      if (this._balanceFactor(root.left) > 0)
        root.left = this._leftRotate(root.left);

      return this._rightRotate(root);
    } else if (this._isRightHeavy(root)) {
      if (this._balanceFactor(root.right) > 0)
        root.right = this._rightRotate(root.right);

      return this._leftRotate(root);
    }

    return root;
  }

  private _balanceFactor(node: AVLNode<number>): number {
    return !node ? 0 : this._height(node.left) - this._height(node.right);
  }

  private _isLeftHeavy(node: AVLNode<number>): boolean {
    return this._balanceFactor(node) > 1;
  }

  private _isRightHeavy(node: AVLNode<number>): boolean {
    return this._balanceFactor(node) < -1;
  }

  private _leftRotate(root: AVLNode<number>): AVLNode<number> {
    const newRoot = root.right;

    root.right = newRoot.left;
    newRoot.left = root;

    newRoot.height = this._calculateNodeHeight(newRoot);
    root.height = this._calculateNodeHeight(newRoot);

    return newRoot;
  }

  private _rightRotate(root: AVLNode<number>): AVLNode<number> {
    const newRoot = root.left;

    root.left = newRoot.right;
    newRoot.right = root;

    newRoot.height = this._calculateNodeHeight(newRoot);
    root.height = this._calculateNodeHeight(newRoot);

    return newRoot;
  }

  /* insert */

  /* toList */

  toList(): LinkedList<number> {
    const list = new LinkedList<number>();

    this._traverseInOrder(this._root, list);

    return list;
  }

  private _traverseInOrder(root: AVLNode<number>, list: LinkedList<number>) {
    if (!root) return;

    this._traverseInOrder(root.left, list);
    list.addLast(root.value);
    this._traverseInOrder(root.right, list);
  }

  /* toList */

  /* height */

  get height(): number {
    return this._root.height;
  }

  /* height */

  /* size */

  get size(): number {
    return this._size(this._root);
  }

  private _size(root: AVLNode<number>): number {
    if (!root) return 0;

    return this._size(root.left) + this._size(root.right) + 1;
  }

  /* size */

  /* isBalanced */

  isBalanced(): boolean {
    return this._isBalanced(this._root);
  }

  private _isBalanced(root: AVLNode<number>): boolean {
    if (!root) return true;

    return (
      Math.abs(this._balanceFactor(root)) <= 1 &&
      this._isBalanced(root.left) &&
      this._isBalanced(root.right)
    );
  }

  /* isBalanced */

  /* isBalanced */

  isPerfect(): boolean {
    return this._isPerfect(this._root);
  }

  private _isPerfect(root: AVLNode<number>): boolean {
    return this.size === Math.pow(2, this.height + 1) - 1;
  }

  /* isBalanced */
}

export default AVLTree;
