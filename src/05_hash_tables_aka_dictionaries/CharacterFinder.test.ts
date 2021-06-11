import CharacterFinder from "./CharacterFinder";

describe("CharacterFinder", () => {
  let finder: CharacterFinder;

  describe("initializazion", () => {
    it("stores the given str", () => {
      let str = "A Green Apple";

      finder = new CharacterFinder(str);

      expect(finder.string).toBe(str);
    });
  });

  describe("firstNonRepeatedChar", () => {
    it("should return the first non-repeated character", () => {
      let str = "A Green Apple";

      finder = new CharacterFinder(str);

      expect(finder.string).toBe(str);
      expect(finder.firstNonRepeatedChar()).toEqual("g");
    });

    it("should return null if all characters repeat at least once", () => {
      let str = "Banana B Banana";

      finder = new CharacterFinder(str);

      expect(finder.string).toBe(str);
      expect(finder.firstNonRepeatedChar()).toEqual(null);
    });
  });

  describe("firstRepeatedChar", () => {
    it("should return the first repeated character", () => {
      let str = "A Green Apple";

      finder = new CharacterFinder(str);

      expect(finder.string).toBe(str);
      expect(finder.firstRepeatedChar()).toEqual("e");
    });

    it("should return null if no characters repeat", () => {
      let str = "Air";

      finder = new CharacterFinder(str);

      expect(finder.string).toBe(str);
      expect(finder.firstRepeatedChar()).toEqual(null);
    });
  });
});
