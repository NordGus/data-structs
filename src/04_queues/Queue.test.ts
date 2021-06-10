import Queue from "./Queue";

describe("Queue", () => {
  describe("are FIFO data structures", () => {
    let queue: Queue<number>;
    let size = 5;
    let values: number[];

    const illegalStateError = "illegal state";

    const initQueue = () => (queue = new Queue<number>(size));

    const fillQueue = () => values.forEach((item: number) => queue.offer(item));

    beforeEach(() => {
      values = new Array(size);

      for (let i = 0; i < size; i++) {
        values[i] = i;
      }
    });

    beforeEach(() => initQueue());

    describe("add", () => {
      it("adds elements to the end of the queue", () => {
        expect(queue.add(values[0])).toBeTruthy();
        let contents = queue.toArray();
        expect(contents[contents.length - 1]).toBe(values[0]);

        expect(queue.add(values[1])).toBeTruthy();
        contents = queue.toArray();
        expect(contents[contents.length - 1]).toBe(values[1]);
      });

      it("throws and illegal state error when the queue is full", () => {
        let error = "";

        try {
          values.forEach((item: number) => queue.add(item));
          queue.add(99);
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(illegalStateError);
      });
    });

    describe("offer", () => {
      it("adds elements to the end of the queue", () => {
        expect(queue.offer(values[0])).toBeTruthy();
        let contents = queue.toArray();
        expect(contents[contents.length - 1]).toBe(values[0]);

        expect(queue.offer(values[1])).toBeTruthy();
        contents = queue.toArray();
        expect(contents[contents.length - 1]).toBe(values[1]);
      });

      it("returns false when the queue is full", () => {
        fillQueue();

        expect(queue.offer(99)).toBeFalsy();
      });
    });

    describe("element", () => {
      it("returns the value at the front of the queue without removing it", () => {
        fillQueue();

        expect(queue.element()).toBe(values[0]);
      });

      it("throws and illegal state error when the queue is empty", () => {
        let error = "";

        try {
          queue.element();
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(illegalStateError);
      });
    });

    describe("peek", () => {
      it("returns the value at the front of the queue without removing it", () => {
        fillQueue();

        expect(queue.peek()).toBe(values[0]);
      });

      it("returns null when the queue is empty", () =>
        expect(queue.peek()).toEqual(null));
    });

    describe("remove", () => {
      it("removes and returns the element at the front of the queue", () => {
        fillQueue();

        expect(queue.remove()).toBe(values[0]);
        expect(queue.peek()).not.toBe(values[0]);
        expect(queue.peek()).toBe(values[1]);
      });

      it("throws and illegal state error when the queue is empty", () => {
        let error = "";

        try {
          queue.remove();
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(illegalStateError);
      });
    });

    describe("poll", () => {
      it("removes and returns the element at the front of the queue", () => {
        fillQueue();

        expect(queue.poll()).toBe(values[0]);
        expect(queue.peek()).not.toBe(values[0]);
        expect(queue.peek()).toBe(values[1]);
      });

      it("throws and illegal state error when the queue is empty", () =>
        expect(queue.poll()).toEqual(null));
    });

    describe("isEmpty", () => {
      it("returns true when the queue is empty", () =>
        expect(queue.isEmpty()).toBeTruthy());

      it("returns false when the queue is not empty", () => {
        queue.offer(1);
        expect(queue.isEmpty()).toBeFalsy();
      });
    });

    describe("isFull", () => {
      it("returns false when the queue is not at full capacity", () => {
        expect(queue.isFull()).toBeFalsy();
        queue.add(1);
        expect(queue.isFull()).toBeFalsy();
      });

      it("returns true when the queue is at full capacity", () => {
        expect(queue.isFull()).toBeFalsy();
        fillQueue();
        expect(queue.isFull()).toBeTruthy();
      });
    });

    describe("toArray", () => {
      it("returns an array of the contents of the queue", () => {
        fillQueue();

        queue.remove();
        queue.add(99);

        expect(queue.toArray()).toEqual([1, 2, 3, 4, 99]);
      });
    });
  });
});
