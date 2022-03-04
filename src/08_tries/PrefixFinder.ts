import Trie from "./Trie";
import { Node } from "./Node";

class PrefixFinder extends Trie {
    static longestCommonPrefix(...words: string[]): string {
        const finder = new PrefixFinder(words)

        return finder.commonPrefix()
    }

    constructor(words: string[]) {
        super()

        for (const word of words) this.insert(word)
    }

    commonPrefix(): string {
        return this._commonPrefix(this._root, "")
    }

    private _commonPrefix(root: Node, word: string): string {
        if (root.childrenCount !== 1 || root.end) return word + root.value;

        return this._commonPrefix(root.getChildren()[0], word + root.value);
    }
}

export default PrefixFinder;