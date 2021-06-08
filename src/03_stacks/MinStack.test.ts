import MinStack from "./MinStack";

describe("MinStack", () => {
  let stack: MinStack;

  beforeEach(() => {
    stack = new MinStack();
  });

  it("pushes elements traking the minimum value", () => {
    stack.push(1);

    expect(stack.top()).toBe(1);
    expect(stack.getMin()).toBe(1);

    stack.push(3);

    expect(stack.top()).toBe(3);
    expect(stack.getMin()).not.toBe(3);
    expect(stack.getMin()).toBe(1);

    stack.pop();

    expect(stack.top()).toBe(1);
    expect(stack.getMin()).toBe(1);
  });

  it("let you peek at the top of the stack", () => {
    stack.push(42);

    expect(stack.top()).toBe(42);
  });

  it("lets you get the minimum in constant time", () => {
    stack.push(23);
    stack.push(1);
    stack.push(42);

    expect(stack.getMin()).toBe(1);
    expect(stack.getMin()).not.toBe(23);
    expect(stack.getMin()).not.toBe(42);
  });

  it("remove the top element of the stack", () => {
    stack.push(42);
    stack.push(1);

    stack.pop();
    expect(stack.top()).not.toBe(1);
    expect(stack.getMin()).not.toBe(1);
    expect(stack.top()).toBe(42);
    expect(stack.getMin()).toBe(42);
  });
});
