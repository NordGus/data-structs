import Queue from "./Queue";
import QueueReverser from "./QueueReverser";

describe("QueueReverser", () => {
  let queue: Queue<number>;
  const size = 5;
  const values = [1, 2, 3, 4, 5];

  beforeEach(() => (queue = new Queue(size)));
  beforeEach(() => values.forEach((i: number) => queue.add(i)));

  describe("no K value given", () => {
    it("reverses the given Queue", () => {
      let rev = new QueueReverser<number>(queue);

      expect(queue.toArray()).toEqual(values);

      rev.reverse();

      expect(queue.toArray()).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe("K value given", () => {
    it("reverses the first K elements in the given Queue", () => {
      let rev = new QueueReverser<number>(queue, 3);

      expect(queue.toArray()).toEqual(values);

      rev.reverse();

      expect(queue.toArray()).toEqual([3, 2, 1, 4, 5]);
    });

    it("doens't reverse the given Queue if K is 0", () => {
      let rev = new QueueReverser<number>(queue, 0);

      expect(queue.toArray()).toEqual(values);

      rev.reverse();

      expect(queue.toArray()).toEqual(values);
    });

    it("throws an illegal argument error if K < 0", () => {
      let error = "";

      try {
        const _ = new QueueReverser<number>(queue, -3);
      } catch (err) {
        error = err.message;
      }

      expect(error).toBe("illegal argument");
    });

    it("throws an illegal argument error if K > Queue.capacity", () => {
      let error = "";

      try {
        const _ = new QueueReverser<number>(queue, 100);
      } catch (err) {
        error = err.message;
      }

      expect(error).toBe("illegal argument");
    });
  });
});
