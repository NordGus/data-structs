import PriorityQueue, { MinPriorityQueue } from "./PriorityQueue";

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

describe("MinPriorityQueue", () => {
  let queue: MinPriorityQueue;
  beforeEach(() => (queue = new MinPriorityQueue()));

  test("add", () => {
    queue.add("work", 1);
    expect(queue.size).toBe(1);

    queue.add("job", 2);
    expect(queue.size).toBe(2);
  });

  test("remove", () => {
    queue.add("write", 1);
    queue.add("read", 2);
    queue.add("add", 1);
    queue.add("clear", 3);

    expect(queue.remove()).toBe("write");
    expect(queue.size).toBe(3);
  });
});
