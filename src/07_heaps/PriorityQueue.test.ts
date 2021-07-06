import PriorityQueue from "./PriorityQueue";

describe("PriorityQueue", () => {
  let queue: PriorityQueue;
  beforeEach(() => (queue = new PriorityQueue()));

  test("enqueue", () => {
    queue.enqueue(10);
    expect(queue.size).toBe(1);

    queue.enqueue(20);
    expect(queue.size).toBe(2);
  });

  test("dequeue", () => {
    queue.enqueue(20);
    queue.enqueue(10);
    queue.enqueue(30);
    queue.enqueue(5);

    expect(queue.dequeue()).toBe(30);
    expect(queue.size).toBe(3);
  });
});
