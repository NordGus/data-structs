import BubbleSort from "./BubbleSort";
import InsertionSort from "./InsertionSort";
import SelectionSort from "./SelectionSort";


describe("Implement Sorting Algorithms", () => {
  describe("Bubble Sort algorithm", () => {
    const sorter = new BubbleSort;

    describe("with multiple elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([8, 2, 4, 1, 3])).toEqual([1, 2, 3 ,4, 8]);
      });
    });

    describe("with 2 elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([8, 1])).toEqual([1, 8]);
      });
    });

    describe("with 1 elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([1])).toEqual([1]);
      });
    });

    describe("with an empty input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([])).toEqual([]);
      });
    });
  });

  describe("Selection Sort algorithm", () => {
    const sorter = new SelectionSort;

    describe("with multiple elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([8, 2, 4, 1, 3])).toEqual([1, 2, 3 ,4, 8]);
      });
    });

    describe("with 2 elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([8, 1])).toEqual([1, 8]);
      });
    });

    describe("with 1 elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([1])).toEqual([1]);
      });
    });

    describe("with an empty input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([])).toEqual([]);
      });
    });
  });

  describe("Insertion Sort algorithm", () => {
    const sorter = new InsertionSort;

    describe("with multiple elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([8, 2, 4, 1, 3])).toEqual([1, 2, 3 ,4, 8]);
      });
    });

    describe("with 2 elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([8, 1])).toEqual([1, 8]);
      });
    });

    describe("with 1 elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([1])).toEqual([1]);
      });
    });

    describe("with an empty input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([])).toEqual([]);
      });
    });
  });
});