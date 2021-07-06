import { MaxHeap, MinHeap } from "./ArrayHeap";

describe("ArrayHeap", () => {
  describe("MaxHeap", () => {
    let heap: MaxHeap;

    const fillHeap = (heap: MaxHeap) => {
      const values = [15, 10, 3, 8, 12, 9, 4, 1, 24];

      for (const val of values) heap.insert(val);
    };

    beforeEach(() => (heap = new MaxHeap()));

    describe("size", () => {
      test("returns 0 when empty", () => {
        expect(heap.size).toBe(0);
      });

      test("returns the amount of elements in the heap", () => {
        heap.insert(1);

        expect(heap.size).toBe(1);

        heap.insert(2);

        expect(heap.size).toBe(2);
      });
    });

    describe("insert", () => {
      test("insert a value", () => {
        heap.insert(42);

        expect(heap.toArray()).toEqual([42]);
      });

      test("inserts and bubble up values", () => {
        const expected = [24, 15, 9, 12, 10, 3, 4, 1, 8];
        fillHeap(heap);

        expect(heap.toArray()).toEqual(expected);
      });

      test("throws an erro when is full", () => {
        let error: string;
        fillHeap(heap);
        heap.insert(42);

        try {
          heap.insert(69);
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe("illegal state");
      });
    });

    describe("remove", () => {
      test("removes the root value", () => {
        const expected = [15, 12, 9, 8, 10, 3, 4, 1];
        fillHeap(heap);

        expect(heap.remove()).toBe(24);

        expect(heap.toArray()).toEqual(expected);
      });

      test("throws an error when is empty", () => {
        let error: string;

        try {
          heap.remove();
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe("illegal state");
      });
    });

    describe("heap sort", () => {
      beforeEach(() => fillHeap(heap));

      test("descending order", () => {
        const expected = [24, 15, 12, 10, 9, 8, 4, 3, 1];
        const numbers = new Array(heap.size);

        for (let i = 0; i < numbers.length; i++) numbers[i] = heap.remove();

        expect(numbers).toEqual(expected);
      });

      test("ascending order", () => {
        const expected = [1, 3, 4, 8, 9, 10, 12, 15, 24];
        const numbers = new Array(heap.size);

        for (let i = numbers.length - 1; i >= 0; i--)
          numbers[i] = heap.remove();

        expect(numbers).toEqual(expected);
      });
    });
  });

  describe("MinHeap", () => {
    let heap: MinHeap;

    const fillHeap = (heap: MinHeap) => {
      const values = [
        { key: 15, value: "test" },
        { key: 10, value: "test" },
        { key: 3, value: "test" },
        { key: 8, value: "test" },
        { key: 12, value: "test" },
        { key: 9, value: "test" },
        { key: 4, value: "test" },
        { key: 1, value: "test" },
        { key: 24, value: "test" },
      ];

      for (const val of values) heap.insert(val);
    };

    beforeEach(() => (heap = new MinHeap()));

    describe("size", () => {
      test("returns 0 when empty", () => {
        expect(heap.size).toBe(0);
      });

      test("returns the amount of elements in the heap", () => {
        heap.insert({ key: 1, value: "" });

        expect(heap.size).toBe(1);

        heap.insert({ key: 2, value: "" });

        expect(heap.size).toBe(2);
      });
    });

    describe("insert", () => {
      test("insert a value", () => {
        heap.insert({ key: 42, value: "" });

        expect(heap.toArray()).toEqual([{ key: 42, value: "" }]);
      });

      test("inserts and bubble up values", () => {
        const expected = [
          { key: 1, value: "test" },
          { key: 3, value: "test" },
          { key: 4, value: "test" },
          { key: 8, value: "test" },
          { key: 12, value: "test" },
          { key: 10, value: "test" },
          { key: 9, value: "test" },
          { key: 15, value: "test" },
          { key: 24, value: "test" },
        ];

        fillHeap(heap);

        expect(heap.toArray()).toEqual(expected);
      });

      test("throws an erro when is full", () => {
        let error: string;

        try {
          fillHeap(heap);
          fillHeap(heap);
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe("illegal state");
      });
    });

    describe("remove", () => {
      test("removes the root value", () => {
        const expected = [
          { key: 3, value: "test" },
          { key: 8, value: "test" },
          { key: 4, value: "test" },
          { key: 15, value: "test" },
          { key: 12, value: "test" },
          { key: 10, value: "test" },
          { key: 9, value: "test" },
          { key: 24, value: "test" },
        ];

        fillHeap(heap);

        expect(heap.remove()).toEqual({ key: 1, value: "test" });

        expect(heap.toArray()).toEqual(expected);
      });

      test("throws an error when is empty", () => {
        let error: string;

        try {
          heap.remove();
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe("illegal state");
      });
    });
  });
});
