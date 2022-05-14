import Search from "./Search";

describe("Implement Searching Algorithms", () => {
  const finder = new Search();

  describe("Linear Search algorithm", () => {
    const array = [8, 2, 4, 1, 3];

    describe("when the given target is contained in the array", () => {
      it("should return the index of the given element", () => {
        expect(finder.linearSearch(array, 4)).toBe(2);
      });
    });

    describe("when the given target isn't contained in the array", () => {
      it("should return the index of the given element", () => {
        expect(finder.linearSearch(array, Infinity)).toBe(-1);
      });
    });
  });

  describe("Binary Search algorithm", () => {
    const array = [1, 2, 3, 4, 8];

    describe("Recursive Implementation", () => {
      describe("when the given target is contained in the array", () => {
        it("should return the index of the given element", () => {
          expect(finder.binarySearchRec(array, 3)).toBe(2);
        });
      });
  
      describe("when the given target isn't contained in the array", () => {
        it("should return the index of the given element", () => {
          expect(finder.binarySearchRec(array, Infinity)).toBe(-1);
        });
      });
    });

    describe("Iterative Implementation", () => {
      describe("when the given target is contained in the array", () => {
        it("should return the index of the given element", () => {
          expect(finder.binarySearch(array, 3)).toBe(2);
        });
      });
  
      describe("when the given target isn't contained in the array", () => {
        it("should return the index of the given element", () => {
          expect(finder.binarySearch(array, Infinity)).toBe(-1);
        });
      });
    });
  });
});