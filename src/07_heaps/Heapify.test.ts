import { MaxHeap } from "./ArrayHeap";

describe("heapify", () => {
  const numbers = [5, 3, 8, 4, 1, 2];

  describe("unoptimize", () => {
    const heapify = (array: number[]) => {
      array.map((_value: number, index: number, array: number[]) => {
        let largerIndex = index;
        const leftIndex = index * 2 + 1;
        const rightIndex = index * 2 + 2;

        if (leftIndex < array.length && array[leftIndex] > array[largerIndex])
          largerIndex = leftIndex;

        if (rightIndex < array.length && array[rightIndex] > array[largerIndex])
          largerIndex = rightIndex;

        if (index === largerIndex) return;

        const temp = array[index];

        array[index] = array[largerIndex];
        array[largerIndex] = temp;
      });
    };

    test("should turn the numbers array into a heap like array", () => {
      const heap = new MaxHeap(numbers.length);

      for (const num of numbers) heap.insert(num);

      heapify(numbers);

      expect(numbers).toEqual(heap.toArray());
    });
  });

  describe("size otimization", () => {
    class Heap {
      public static heapify(array: number[]): void {
        const lastParent = array.length / 2 - 1;
        for (let i = 0; i < lastParent; i++) this._heapify(array, i);
      }

      private static _heapify(array: number[], index: number): void {
        let largerIndex = index;
        const leftIndex = index * 2 + 1;
        const rightIndex = index * 2 + 2;

        if (leftIndex < array.length && array[leftIndex] > array[largerIndex])
          largerIndex = leftIndex;

        if (rightIndex < array.length && array[rightIndex] > array[largerIndex])
          largerIndex = rightIndex;

        if (index === largerIndex) return;

        const temp = array[index];

        array[index] = array[largerIndex];
        array[largerIndex] = temp;

        this._heapify(array, largerIndex);
      }
    }

    test("should turn the numbers array into a heap like array", () => {
      const heap = new MaxHeap(numbers.length);

      for (const num of numbers) heap.insert(num);

      Heap.heapify(numbers);

      expect(numbers).toEqual(heap.toArray());
    });
  });

  describe("recurtion otimization", () => {
    class Heap {
      public static heapify(array: number[]): void {
        const lastParent = array.length / 2 - 1;
        for (let i = lastParent; i >= 0; i--) this._heapify(array, i);
      }

      private static _heapify(array: number[], index: number): void {
        let largerIndex = index;
        const leftIndex = index * 2 + 1;
        const rightIndex = index * 2 + 2;

        if (leftIndex < array.length && array[leftIndex] > array[largerIndex])
          largerIndex = leftIndex;

        if (rightIndex < array.length && array[rightIndex] > array[largerIndex])
          largerIndex = rightIndex;

        if (index === largerIndex) return;

        const temp = array[index];

        array[index] = array[largerIndex];
        array[largerIndex] = temp;

        this._heapify(array, largerIndex);
      }
    }

    test("should turn the numbers array into a heap like array", () => {
      const heap = new MaxHeap(numbers.length);

      for (const num of numbers) heap.insert(num);

      Heap.heapify(numbers);

      expect(numbers).toEqual(heap.toArray());
    });
  });
});
