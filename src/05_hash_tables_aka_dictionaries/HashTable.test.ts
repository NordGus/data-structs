import HashTable from "./HashTable";

interface Pair {
  key: number;
  value: string;
}

describe("HashTable", () => {
  let size = 5;
  let hash: HashTable<number, string>;

  const fillHash = () => {
    [
      { key: 1, value: "first" },
      { key: 7, value: "second" },
    ].forEach((pair: Pair) => hash.put(pair.key, pair.value));
  };

  beforeEach(() => (hash = new HashTable<number, string>(size)));

  describe("put", () => {
    it("stores a value pair", () => {
      let pair = { key: 1, value: "first" };

      hash.put(pair.key, pair.value);
      expect(hash.size).toBeGreaterThan(0);
      expect(hash.size).toBe(1);
      expect(hash.get(pair.key)).toBe(pair.value);

      pair = { key: 7, value: "second" };

      hash.put(pair.key, pair.value);
      expect(hash.size).toBeGreaterThan(0);
      expect(hash.size).toBe(2);
      expect(hash.get(pair.key)).toBe(pair.value);
    });

    it("updates the value if the key was already stored", () => {
      let pair = { key: 1, value: "first" };

      hash.put(pair.key, pair.value);
      expect(hash.size).toBeGreaterThan(0);
      expect(hash.size).toBe(1);
      expect(hash.get(pair.key)).toBe(pair.value);

      hash.put(pair.key, "updated");
      expect(hash.size).toBeGreaterThan(0);
      expect(hash.size).toBe(1);
      expect(hash.get(pair.key)).toBe("updated");
    });
  });

  describe("get", () => {
    beforeEach(() => fillHash());

    it("returns the value stored on the given key", () => {
      expect(hash.get(1)).toBe("first");
      expect(hash.get(7)).toBe("second");
    });

    it("returns null if theres no value stored on the given key", () => {
      expect(hash.get(42)).toBe(null);
    });
  });

  describe("remove", () => {
    beforeEach(() => fillHash());

    it("removes the value stored on the given key", () => {
      const key = 1;
      hash.remove(key);
      expect(hash.get(key)).toBe(null);
      expect(hash.size).toBe(1);
    });

    it("returns the removed value", () => {
      const key = 1;
      expect(hash.remove(key)).toBe("first");
      expect(hash.size).toBe(1);
    });
  });

  describe("size", () => {
    it("returns the amount of entries in the table", () => {
      expect(hash.size).toBe(0);
      fillHash();
      expect(hash.size).toBe(2);
    });
  });
});
