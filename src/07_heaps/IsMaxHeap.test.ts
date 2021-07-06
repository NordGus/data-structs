describe("given an array of integers, check if this array represents a max heap", () => {
  const isMaxHeap = (array: number[]): boolean => {
    return _isMaxHeap(array, 0);
  };

  const _isMaxHeap = (array: number[], index: number): boolean => {
    const lastParent = array.length / 2 - 1;
    if (index > lastParent) return true;

    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;

    const isValid =
      array[index] >= array[leftIndex] && array[index] >= array[rightIndex];

    return (
      isValid && _isMaxHeap(array, leftIndex) && _isMaxHeap(array, rightIndex)
    );
  };

  test("valid array", () => {
    const numbers = [24, 15, 9, 12, 10, 3, 4, 1, 8];

    expect(isMaxHeap(numbers)).toBeTruthy();
  });

  test("invalid array", () => {
    const numbers = [5, 3, 8, 4, 1, 2];

    expect(isMaxHeap(numbers)).toBeFalsy();
  });
});
