import QueuesStack from "./StackWithTwoQueues";

describe("QueuesStack", () => {
  let stack: QueuesStack<number>;
  const data = [1, 2, 3, 4, 5];

  const stackOverflowError = "stack overflow";
  const illegalStateError = "illegal state";

  const fillStack = (data: number[]) =>
    data.forEach((item: number) => stack.push(item));

  describe("capped", () => {
    const size = 5;

    beforeEach(() => (stack = new QueuesStack<number>(size)));

    describe("push", () => {
      it("adds an item to the stack", () => {
        stack.push(1);
        expect(stack.peek()).toBe(1);
        expect(stack.size).toBe(1);

        stack.push(2);
        expect(stack.peek()).toBe(2);
        expect(stack.size).toBe(2);
      });

      it("throws an error when trying to push another item when is full", () => {
        let message: string;

        for (let i = 0; i < 20; i++) {
          try {
            stack.push(i);
          } catch (error) {
            message = error.message;
          }
        }

        expect(message).toBe(stackOverflowError);
      });
    });

    describe("pop", () => {
      beforeEach(() => fillStack(data));

      it("returns the item at the top", () => {
        let val = stack.pop();

        expect(val).toBe(5);
        expect(stack.peek()).toBe(4);
        expect(stack.size).toBe(4);

        val = stack.pop();

        expect(val).toBe(4);
        expect(stack.peek()).toBe(3);
        expect(stack.size).toBe(3);

        val = stack.pop();

        expect(val).toBe(3);
        expect(stack.peek()).toBe(2);
        expect(stack.size).toBe(2);

        val = stack.pop();

        expect(val).toBe(2);
        expect(stack.peek()).toBe(1);
        expect(stack.size).toBe(1);

        val = stack.pop();

        expect(val).toBe(1);
        expect(stack.size).toBe(0);
      });

      it("throws an error when is empty", () => {
        let error = "";

        try {
          for (let i = 0; i < 100; ) stack.pop();
        } catch (err) {
          error = err.message;
        }

        expect(error).toBe(illegalStateError);
      });
    });

    describe("peek", () => {
      it("throws an error when the stack is empty", () => {
        let error = "";
        try {
          stack.peek();
        } catch (err) {
          error = err.message;
        }
        expect(error).toBe(illegalStateError);
      });

      it("returns the top item", () => {
        stack.push(1);
        expect(stack.peek()).toBe(1);

        stack.push(42);
        expect(stack.peek()).toBe(42);
      });
    });

    describe("size", () => {
      it("should return the amount of items in the stack", () => {
        expect(stack.size).toBe(0);
        fillStack(data);
        expect(stack.size).toBe(data.length);
      });
    });

    describe("isEmpty", () => {
      it("should return true when empty", () =>
        expect(stack.isEmpty()).toBeTruthy());

      it("should return false when is empty", () => {
        stack.push(1);
        expect(stack.isEmpty()).toBeFalsy();
      });
    });
  });

  // describe("pop the top element of the stack", () => {
  //   it("throws an error if is empty", () => {
  //     try {
  //       stack.pop();
  //     } catch (error) {
  //       expect(error.message).toBe(illegalStateError);
  //     }
  //   });

  //   it("it removes the top element from the stack and returns it", () => {
  //     fillStack(data);

  //     let extracted = stack.pop();

  //     expect(extracted).toEqual(data[3]);
  //     expect(stack.peek()).toEqual(data[2]);

  //     extracted = stack.pop();

  //     expect(extracted).toEqual(data[2]);
  //     expect(stack.peek()).toEqual(data[1]);

  //     extracted = stack.pop();

  //     expect(extracted).toEqual(data[1]);
  //     expect(stack.peek()).toEqual(data[0]);

  //     extracted = stack.pop();

  //     expect(extracted).toEqual(data[0]);

  //     try {
  //       stack.peek();
  //     } catch (error) {
  //       expect(error.message).toBe(illegalStateError);
  //     }
  //   });
  // });
});
