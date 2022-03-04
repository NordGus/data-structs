import Trie from "./Trie";

describe("Trie", () => {
  let trie: Trie;

  beforeEach(() => (trie = new Trie()));

  describe("insert", () => {
    test("stores word", () => {
      expect(trie.insert("hello")).toBeTruthy();
    });

    test("illegal arguments", () => {
      expect(trie.insert("")).toBeFalsy();
      expect(trie.insert(undefined)).toBeFalsy();
      expect(trie.insert(null)).toBeFalsy();
    });
  });

  describe("contains", () => {
    test("contains the word", () => {
      trie.insert("cat");
      trie.insert("can");

      expect(trie.contains("cat")).toBeTruthy();
    });

    test("partially contains the word", () => {
      trie.insert("canada");

      expect(trie.contains("can")).toBeFalsy();
    });

    test("doesn't contain the word", () => {
      trie.insert("can");

      expect(trie.contains("canada")).toBeFalsy();
      expect(trie.contains("test")).toBeFalsy();
      expect(trie.contains(null)).toBeFalsy();
    });

    test("invalid strings", () => {
      trie.insert("can");
      trie.insert("canada");

      expect(trie.contains(undefined)).toBeFalsy();
      expect(trie.contains(null)).toBeFalsy();
    });
  });

  describe("traverse", () => {
    beforeEach(() => {
      trie.insert("can");
      trie.insert("canada");
    });

    test("pre-order", () => {
      expect(trie.toOrderedArray()).toEqual(["c", "a", "n", "a", "d", "a"]);
    });

    test("post-order", () => {
      expect(trie.toReversedArray()).toEqual(["a", "d", "a", "n", "a", "c"]);
    });
  });

  describe("remove", () => {
    beforeEach(() => {
      trie.insert("can");
      trie.insert("canada");
      trie.insert("dog")
    });

    test("substring", () => {
      expect(trie.remove("can")).toBe("can");
      expect(trie.contains("can")).toBeFalsy();
      expect(trie.contains("canada")).toBeTruthy();
      expect(trie.contains("dog")).toBeTruthy();
    });

    test("string", () => {
      expect(trie.remove("canada")).toBe("canada");
      expect(trie.contains("can")).toBeTruthy();
      expect(trie.contains("dog")).toBeTruthy();
    });

    test("illegal arguments", () => {
      const args = ["", null, undefined]

      for (const arg of args) {
        try {
          trie.remove(arg);
        } catch (e) {
          expect(e.message).toBe("illegal argument");
        }  
      }
    });
  });

  describe("findWords", () => {
    beforeEach(() => {
      trie.insert("car");
      trie.insert("card");
      trie.insert("careful");
      trie.insert("egg");
    });

    test("returns a list of suggestions for the given prefix", () => {
      expect(trie.findWords("car")).toEqual(["car", "card", "careful"]);
      expect(trie.findWords("e")).toEqual(["egg"]);
      expect(trie.findWords("test")).toEqual([]);
      expect(trie.findWords("")).toEqual(["car", "card", "careful", "egg"]);
      expect(trie.findWords(null)).toEqual([]);
      expect(trie.findWords(undefined)).toEqual([]);
    });
  });

  describe("contents", () => {
    beforeEach(() => {
      trie.insert("car");
      trie.insert("card");
      trie.insert("careful");
      trie.insert("egg");
    });

    test("returns a list of the words cotained on the trie", () => {
      expect(trie.contents()).toEqual(["car", "card", "careful", "egg"]);
    });

    test("returns an empty list when trie is empty", () => {
      trie.remove("car");
      trie.remove("card");
      trie.remove("careful");
      trie.remove("egg");

      expect(trie.contents()).toEqual([]);
    });
  });

  describe("count", () => {
    test("returns 0 when empty", () => {
      expect(trie.count).toBe(0)
    });

    test("returns word count", () => {
      trie.insert("car");
      trie.insert("card");
      trie.insert("care");
      trie.insert("careful");
      trie.insert("egg");

      expect(trie.count).toBe(5)
    });
  })
});
