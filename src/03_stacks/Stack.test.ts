import Stack from "./Stack";

describe("Stack", () => {
  let stack: Stack;
  const data = [1, "2", 3.0, { echo: "catorce" }];

  const fillStack = (data: any[]) =>
    data.forEach((obj: any) => stack.push(obj));

  beforeEach(() => (stack = new Stack()));

  it("push and object to the top of the stack", () => {
    stack.push(1);

    expect(stack.peek()).toBe(1);

    stack.push("3");

    expect(stack.peek()).toBe("3");
  });

  it("peek at the object on the top of the stack", () => {
    expect(stack.peek()).toEqual(null);

    stack.push(1);
    expect(stack.peek()).toBe(1);

    const obj = { test: "this is a test" };
    stack.push(obj);
    expect(stack.peek()).toEqual(obj);
  });

  describe("pop the top element of the stack", () => {
    it("throws an error if is empty", () => {
      try {
        stack.pop();
      } catch (error) {
        expect(error.message).toBe("empty stack");
      }
    });

    it("it removes the top element from the stack and returns it", () => {
      fillStack(data);

      let extracted = stack.pop();

      expect(extracted).toEqual(data[3]);
      expect(stack.peek()).toEqual(data[2]);

      extracted = stack.pop();

      expect(extracted).toEqual(data[2]);
      expect(stack.peek()).toEqual(data[1]);

      extracted = stack.pop();

      expect(extracted).toEqual(data[1]);
      expect(stack.peek()).toEqual(data[0]);

      extracted = stack.pop();

      expect(extracted).toEqual(data[0]);
      expect(stack.peek()).toEqual(null);
    });
  });

  describe("should indicate if the stack is empty", () => {
    it("should return true when empty", () => {
      expect(stack.empty()).toBeTruthy();
    });
  });
});
