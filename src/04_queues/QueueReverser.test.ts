import Queue from "./Queue";
import QueueReverser from "./QueueReverser";

describe("QueueReverser", () => {
  let queue: Queue;
  const size = 5;
  const values = [1, 2, 3, 4, 5];
  const reversed = [5, 4, 3, 2, 1];

  beforeEach(() => (queue = new Queue(size)));
  beforeEach(() => values.forEach((i: number) => queue.add(i)));

  it("recieves a Queue and reverse it", () => {
    let rev = new QueueReverser();

    expect(queue.toArray()).toEqual(values);

    rev.reverse(queue);

    expect(queue.toArray()).toEqual(reversed);
  });
});
