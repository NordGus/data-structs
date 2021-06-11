import IntsFinder from "./IntsFinder";

describe("IntsFinder", () => {
  let finder: IntsFinder;

  describe("initializazion", () => {
    it("stores a given array if intergers", () => {
      let numbers = [1, 2, 2, 3, 3, 3, 4];

      finder = new IntsFinder(numbers);

      expect(finder.numbers).toBe(numbers);
    });
  });

  describe("mostFrequent", () => {
    it("should return the most repeated number", () => {
      let numbers = [1, 2, 2, 3, 3, 3, 4];

      finder = new IntsFinder(numbers);

      expect(finder.numbers).toBe(numbers);
      expect(finder.mostFrequent()).toEqual(3);

      numbers = [1, 2, 3, 4];

      finder = new IntsFinder(numbers);

      expect(finder.numbers).toBe(numbers);
      expect(finder.mostFrequent()).toEqual(1);
    });
  });

  describe("countPairsWithDiff", () => {
    describe("given an array of integers", () => {
      it("should return the amount of unique pairs of integers that have a difference K", () => {
        let k = 2;
        const numbers = [1, 7, 5, 9, 2, 12, 3];

        finder = new IntsFinder(numbers);

        expect(finder.numbers).toBe(numbers);
        expect(finder.countPairsWithDiff(k)).toEqual(4);

        k = 3;

        expect(finder.numbers).toBe(numbers);
        expect(finder.countPairsWithDiff(k)).toEqual(2);
      });
    });
  });

  describe("twoSum", () => {
    describe("given an array of integers", () => {
      it("should return the indices of the two numbers such that they add up to a specific target", () => {
        let target = 9;
        const numbers = [2, 7, 11, 15];

        finder = new IntsFinder(numbers);

        expect(finder.numbers).toBe(numbers);
        expect(finder.twoSum(target)).toEqual([0, 1]);

        target = 18;

        expect(finder.numbers).toBe(numbers);
        expect(finder.twoSum(target)).toEqual([1, 2]);
      });
    });
  });
});
