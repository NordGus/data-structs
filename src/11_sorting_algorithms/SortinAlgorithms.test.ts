import BubbleSort from "./BubbleSort";
import BucketSort from "./BucketSort";
import CountingSort from "./CountingSort";
import InsertionSort from "./InsertionSort";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
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

  describe("Merge Sort algorithm", () => {
    const sorter = new MergeSort;

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

  describe("Quick Sort algorithm", () => {
    const sorter = new QuickSort;

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

  describe("Counting Sort algorithm", () => {
    const sorter = new CountingSort;

    describe("with multiple elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([8, 2, 4, 8, 1, 3, 8, 6, 4], 8)).toEqual([1, 2, 3, 4, 4, 6, 8, 8, 8]);
      });
    });

    describe("with 2 elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([3, 1], 3)).toEqual([1, 3]);
      });
    });

    describe("with 1 elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([1], 1)).toEqual([1]);
      });
    });

    describe("with an empty input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([], 0)).toEqual([]);
      });
    });
  });

  describe("Bucket Sort algorithm", () => {
    const sorter = new BucketSort;

    describe("with multiple elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([8, 2, 4, 8, 1, 3, 8, 6, 4])).toEqual([1, 2, 3, 4, 4, 6, 8, 8, 8]);
      });
    });

    describe("with 2 elements in the input array", () => {
      it("should return a sorted array from lowest to highest", () => {
        expect(sorter.sort([3, 1])).toEqual([1, 3]);
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