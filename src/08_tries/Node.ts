export class Node {
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