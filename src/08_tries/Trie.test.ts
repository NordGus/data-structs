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
    });

    test("substring", () => {
      expect(trie.remove("can")).toBe("can");
      expect(trie.toOrderedArray()).toEqual(["c", "a", "n", "a", "d", "a"]);
      expect(trie.contains("can")).toBeFalsy();
      expect(trie.contains("canada")).toBeTruthy();
    });

    test("string", () => {
      expect(trie.remove("canada")).toBe("canada");
      expect(trie.toOrderedArray()).toEqual(["c", "a", "n"]);
      expect(trie.contains("can")).toBeTruthy();
    });

    test("illegal arguments", () => {
      let error: string;

      try {
        trie.remove("");
      } catch (e) {
        error = e.message;
      }

      expect(error).toBe("illegal argument");

      try {
        trie.remove(null);
      } catch (e) {
        error = e.message;
      }

      expect(error).toBe("illegal argument");

      try {
        trie.remove(undefined);
      } catch (e) {
        error = e.message;
      }

      expect(error).toBe("illegal argument");
    });
  });
});
