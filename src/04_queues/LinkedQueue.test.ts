import LinkedQueue from "./LinkedQueue";

describe("Queue", () => {
  let queue: LinkedQueue<number>;
  let values: number[];

  const illegalStateError = "illegal state";
  const emptyQueueError = "empty queue";
  const fillQueue = () => values.forEach((item: number) => queue.enqueue(item));
  beforeEach(() => (values = [1, 2, 3, 4, 5]));

  describe("when capped", () => {
    let size = 5;
    const initQueue = () => (queue = new LinkedQueue<number>(size));
    beforeEach(() => initQueue());

    describe("enqueue", () => {
      it("adds elements to the end of the queue", () => {
        queue.enqueue(values[0]);
        let contents = queue.toArray();
        expect(contents).toEqual([1]);

        queue.enqueue(values[1]);
        contents = queue.toArray();
        expect(contents).toEqual([1, 2]);
      });

      it("throws and illegal state error when the queue is full", () => {
        let error = "";

        try {
          values.forEach((item: number) => queue.enqueue(item));
          queue.enqueue(99);
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(illegalStateError);
      });
    });

    describe("dequeue", () => {
      it("removes and returns the element at the front of the queue", () => {
        fillQueue();

        expect(queue.dequeue()).toBe(values[0]);
        expect(queue.peek()).not.toBe(values[0]);
        expect(queue.peek()).toBe(values[1]);
      });

      it("throws and illegal state error when the queue is empty", () => {
        let error = "";

        try {
          queue.dequeue();
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(emptyQueueError);
      });
    });

    describe("peek", () => {
      it("returns the value at the front of the queue without removing it", () => {
        fillQueue();

        expect(queue.peek()).toBe(values[0]);
      });

      it("throws and illegal state error when the queue is empty", () => {
        let error = "";

        try {
          queue.peek();
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(emptyQueueError);
      });
    });

    describe("size", () => {
      it("returns the amount of items in the queue", () => {
        expect(queue.size).toBe(0);
        queue.enqueue(1);
        expect(queue.size).toBe(1);
      });
    });

    describe("isEmpty", () => {
      it("returns true when the queue is empty", () =>
        expect(queue.isEmpty()).toBeTruthy());

      it("returns false when the queue is not empty", () => {
        queue.enqueue(1);
        expect(queue.isEmpty()).toBeFalsy();
      });
    });

    describe("toArray", () => {
      it("returns an array of the contents of the queue", () => {
        fillQueue();

        queue.dequeue();
        queue.enqueue(99);

        expect(queue.toArray()).toEqual([2, 3, 4, 5, 99]);
      });
    });
  });

  describe("when uncapped", () => {
    const initQueue = () => (queue = new LinkedQueue<number>());
    beforeEach(() => initQueue());

    describe("enqueue", () => {
      it("adds elements to the end of the queue", () => {
        queue.enqueue(values[0]);
        let contents = queue.toArray();
        expect(contents).toEqual([1]);

        queue.enqueue(values[1]);
        contents = queue.toArray();
        expect(contents).toEqual([1, 2]);
      });
    });

    describe("dequeue", () => {
      it("removes and returns the element at the front of the queue", () => {
        fillQueue();

        expect(queue.dequeue()).toBe(values[0]);
        expect(queue.peek()).not.toBe(values[0]);
        expect(queue.peek()).toBe(values[1]);
      });

      it("throws and illegal state error when the queue is empty", () => {
        let error = "";

        try {
          queue.dequeue();
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(emptyQueueError);
      });
    });

    describe("peek", () => {
      it("returns the value at the front of the queue without removing it", () => {
        fillQueue();

        expect(queue.peek()).toBe(values[0]);
      });

      it("throws and illegal state error when the queue is empty", () => {
        let error = "";

        try {
          queue.peek();
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(emptyQueueError);
      });
    });

    describe("size", () => {
      it("returns the amount of items in the queue", () => {
        expect(queue.size).toBe(0);
        queue.enqueue(1);
        expect(queue.size).toBe(1);
      });
    });

    describe("isEmpty", () => {
      it("returns true when the queue is empty", () =>
        expect(queue.isEmpty()).toBeTruthy());

      it("returns false when the queue is not empty", () => {
        queue.enqueue(1);
        expect(queue.isEmpty()).toBeFalsy();
      });
    });

    describe("toArray", () => {
      it("returns an array of the contents of the queue", () => {
        fillQueue();

        queue.dequeue();
        queue.enqueue(99);

        expect(queue.toArray()).toEqual([2, 3, 4, 5, 99]);
      });
    });
  });
});
