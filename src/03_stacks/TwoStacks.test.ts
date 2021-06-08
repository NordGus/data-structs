import TwoStacks from "./TwoStacks";

describe("TwoStacks", () => {
  let stacks: TwoStacks;

  const fillStaks = () => {
    for (let i = 1; i <= 10; i++) {
      if (i % 2 === 0) stacks.push1(i);
      else stacks.push2(i);
    }
  };

  beforeEach(() => {
    stacks = new TwoStacks();
  });

  describe("lets push values to either stack", () => {
    it("push to 1", () => {
      let val = 1;

      stacks.push1(val);

      expect(stacks.peek1()).toBe(val);
    });

    it("push to 2", () => {
      let val = 42;

      stacks.push2(val);

      expect(stacks.peek2()).toBe(val);
    });

    it("throws stack overflow error when memory allocation for both stasks is full", () => {
      let message = "";

      try {
        for (let i = 0; i < 100; i++) {
          if (i % 2 === 0) stacks.push1(i);
          else stacks.push2(i);
        }
      } catch (error) {
        message = error.message;
      }

      expect(message).toBe("stack overflow");
    });
  });

  describe("lets pop values from either stack", () => {
    it("removes the top object in stack 1 and returns it", () => {
      let val = 42;
      stacks.push1(val);
      expect(stacks.pop1()).toBe(val);
    });

    it("removes the top object in stack 2 and returns it", () => {
      let val = 42;
      stacks.push2(val);
      expect(stacks.pop2()).toBe(val);
    });

    describe("throws an error when poping an empty stack", () => {
      it("stack 1", () => {
        let error = "";

        try {
          stacks.pop1();
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe("illegal state");
      });

      it("stack 2", () => {
        let error = "";

        try {
          stacks.pop2();
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe("illegal state");
      });
    });
  });

  describe("lets check if either stack is empty", () => {
    it("checks stack 1", () => {
      expect(stacks.isEmpty1()).toBeTruthy();
      stacks.push1(1);
      expect(stacks.isEmpty1()).toBeFalsy();
    });

    it("checks stack 2", () => {
      expect(stacks.isEmpty2()).toBeTruthy();
      stacks.push2(1);
      expect(stacks.isEmpty2()).toBeFalsy();
    });
  });

  describe("lets check if either stack is full", () => {
    it("checks stack 1", () => {
      expect(stacks.isFull1()).toBeFalsy();

      fillStaks();

      expect(stacks.isFull1()).toBeTruthy();
    });

    it("checks stack 1", () => {
      expect(stacks.isFull2()).toBeFalsy();

      fillStaks();

      expect(stacks.isFull2()).toBeTruthy();
    });
  });
});
