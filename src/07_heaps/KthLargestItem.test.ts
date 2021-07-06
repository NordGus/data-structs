import { MaxHeap } from "./ArrayHeap";

describe("kth largest item", () => {
  const numbers = [5, 3, 8, 4, 1, 2];

  describe("given a K value", () => {
    const getKthLargest = (array: number[], k: number): number => {
      if (k < 1 || k > array.length) throw new Error("illegal argument");

      const heap = new MaxHeap(array.length);

      for (const num of array) heap.insert(num);

      let largest: number;

      for (let i = 0; i < k; i++) largest = heap.remove();

      return largest;
    };

    test("k = 1 should return 8", () => {
      expect(getKthLargest(numbers, 1)).toBe(8);
    });

    test("k = 2 should return 5", () => {
      expect(getKthLargest(numbers, 2)).toBe(5);
    });

    test("k = 3 should return 4", () => {
      expect(getKthLargest(numbers, 3)).toBe(4);
    });

    test("throws an error if K <= 0 should return undefined", () => {
      let error: string;

      try {
        getKthLargest(numbers, 0);
      } catch (e) {
        error = e.message;
      }

      expect(error).toBe("illegal argument");

      try {
        getKthLargest(numbers, -2);
      } catch (e) {
        error = e.message;
      }

      expect(error).toBe("illegal argument");
    });

    test("throws an error if k > array.length should return undefined", () => {
      let error: string;

      try {
        getKthLargest(numbers, numbers.length + 1);
      } catch (e) {
        error = e.message;
      }

      expect(error).toBe("illegal argument");
    });
  });
});
