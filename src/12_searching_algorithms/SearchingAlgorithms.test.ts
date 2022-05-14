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
      it("should return -1", () => {
        expect(finder.linearSearch(array, 42)).toBe(-1);
      });
    });

    describe("when given an empty array", () => {
      it("should return -1", () => {
        expect(finder.linearSearch([], 42)).toBe(-1);
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
        it("should return -1", () => {
          expect(finder.binarySearchRec(array, 42)).toBe(-1);
        });
      });
  
      describe("when given an empty array", () => {
        it("should return -1", () => {
          expect(finder.binarySearchRec([], 42)).toBe(-1);
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
        it("should return -1", () => {
          expect(finder.binarySearch(array, 42)).toBe(-1);
        });
      });
  
      describe("when given an empty array", () => {
        it("should return -1", () => {
          expect(finder.binarySearch([], 42)).toBe(-1);
        });
      });
    });
  });


  describe("Ternary Search algorithm", () => {
    const array = [3, 5, 6, 9, 11, 18, 20, 21, 24, 30];

    describe("Recursive Implementation", () => {
      describe("when the given target is contained in the array", () => {
        it("should return the index of the given element", () => {
          expect(finder.ternarySearch(array, 11)).toBe(4);
        });
      });
  
      describe("when the given target isn't contained in the array", () => {
        it("should return -1", () => {
          expect(finder.ternarySearch(array, 42)).toBe(-1);
        });
      });
  
      describe("when given an empty array", () => {
        it("should return -1", () => {
          expect(finder.ternarySearch([], 42)).toBe(-1);
        });
      });
    });
  });
});