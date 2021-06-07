import { LinkedList } from "./LinkedList";

describe("LinkedList", () => {
  let ll: LinkedList;
  const testData = [1, 2, 3, 4, 5, 6];

  const fillLinkedList = () =>
    testData.forEach((item: number) => ll.addLast(item));

  beforeEach(() => {
    ll = new LinkedList();
  });

  it("is created empty", () => {
    expect(ll.size()).toBe(0);
    expect(ll.toArray()).toEqual([]);
  });

  it("can insert a value to the structure's head", () => {
    ll.addFirst(42);

    expect(ll.size()).toBe(1);
    expect(ll.size()).toBe(1);
    expect(ll.toArray()).toEqual([42]);

    ll.addFirst(13);

    expect(ll.size()).toBe(2);
    expect(ll.size()).toBe(2);
    expect(ll.toArray()).toEqual([13, 42]);
  });

  it("can insert a value to the structure's tail", () => {
    ll.addLast(42);

    expect(ll.size()).toBe(1);
    expect(ll.size()).toBe(1);
    expect(ll.toArray()).toEqual([42]);

    ll.addLast(13);

    expect(ll.size()).toBe(2);
    expect(ll.size()).toBe(2);
    expect(ll.toArray()).toEqual([42, 13]);
  });

  it("can remove an item from the structure's head", () => {
    fillLinkedList();
    let state: number[];

    ll.removeFirst();

    state = ll.toArray();

    expect(ll.size()).toBe(testData.length - 1);
    expect(state).not.toEqual(testData);
    expect(state[0]).not.toBe(testData[0]);
    expect(state[0]).toBe(testData[1]);

    ll.removeFirst();

    state = ll.toArray();

    expect(ll.size()).toBe(testData.length - 2);
    expect(state).not.toEqual(testData);
    expect(state[0]).not.toBe(testData[0]);
    expect(state[0]).not.toBe(testData[1]);
    expect(state[0]).toBe(testData[2]);
  });

  it("can remove an item from the structure's tail", () => {
    fillLinkedList();
    let state: number[];

    ll.removeLast();

    state = ll.toArray();

    expect(ll.size()).toBe(testData.length - 1);
    expect(state).not.toEqual(testData);
    expect(state[0]).toBe(testData[0]);
    expect(state[state.length - 1]).not.toBe(testData[testData.length - 1]);
    expect(state[state.length - 1]).toBe(testData[testData.length - 2]);

    ll.removeLast();

    state = ll.toArray();

    expect(ll.size()).toBe(testData.length - 2);
    expect(state).not.toEqual(testData);
    expect(state[0]).toBe(testData[0]);
    expect(state[state.length - 1]).not.toBe(testData[testData.length - 1]);
    expect(state[state.length - 1]).not.toBe(testData[testData.length - 2]);
    expect(state[state.length - 1]).toBe(testData[testData.length - 3]);
  });

  it("can return its size", () => {
    fillLinkedList();

    expect(ll.size()).toBe(testData.length);

    ll.removeFirst();

    expect(ll.size()).not.toBe(testData.length);
    expect(ll.size()).toBe(testData.length - 1);

    ll.addFirst(99);

    expect(ll.size()).not.toBe(testData.length - 1);
    expect(ll.size()).toBe(testData.length);

    ll.removeLast();

    expect(ll.size()).not.toBe(testData.length);
    expect(ll.size()).toBe(testData.length - 1);

    ll.addLast(99);

    expect(ll.size()).not.toBe(testData.length - 1);
    expect(ll.size()).toBe(testData.length);
  });

  it("can return if it contains a given value", () => {
    fillLinkedList();

    expect(ll.contains(5)).toBeTruthy();
    expect(ll.contains(99)).toBeFalsy();
  });

  it("can return the index of a given value", () => {
    fillLinkedList();
    let state: number;

    state = ll.indexOf(5);

    expect(state).toBeGreaterThanOrEqual(0);
    expect(state).not.toBeLessThan(0);
    expect(state).not.toBe(-1);
    expect(state).toBe(4);

    state = ll.indexOf(99);

    expect(state).not.toBeGreaterThanOrEqual(0);
    expect(state).toBeLessThan(0);
    expect(state).toBe(-1);
  });

  it("can return its contents in array form", () => {
    fillLinkedList();

    const state = ll.toArray();

    expect(state).toEqual(testData);
  });

  describe("can reverse the order of its contents", () => {
    let state: number[];

    it("throws an error if the list is empty", () => {
      try {
        ll.reverse();
      } catch (error) {
        expect(error.message).toBe("empty list");
      }
    });

    it("does nothing if its size is 1", () => {
      ll.addFirst(1);

      ll.reverse();

      state = ll.toArray();

      expect(state).toEqual([1]);
    });

    it("reserses the order when its size is greater than 1", () => {
      fillLinkedList();

      ll.reverse();

      state = ll.toArray();

      expect(state).not.toEqual(testData);
      expect(state).toEqual(testData.reverse());

      testData.reverse();
    });
  });

  describe("find the Kth node from the end  of a linked list in one pass", () => {
    describe("when size is greater than 1", () => {
      beforeEach(() => fillLinkedList());

      it("should return a valid node when k >= 0 but less than list size", () => {
        let k = 3;

        const knode = ll.getNodeFromEnd(k);

        expect(knode).toBe(4);
      });

      it("should throw an illegal argument error when k > list size", () => {
        let k = 10;

        try {
          const knode = ll.getNodeFromEnd(k);
        } catch (error) {
          expect(error.message).toEqual("illegal argument");
        }
      });

      it("should throw an illegal argument error when k < 0", () => {
        let k = -1;

        try {
          const knode = ll.getNodeFromEnd(k);
        } catch (error) {
          expect(error.message).toEqual("illegal argument");
        }
      });
    });

    describe("when size is 0", () => {
      it("should throw an empty list error", () => {
        let k = 0;

        try {
          const knode = ll.getNodeFromEnd(k);
        } catch (error) {
          expect(error.message).toEqual("empty list");
        }
      });
    });
  });

  describe("find the middle of the list in one pass", () => {
    describe("with size greater than 1", () => {
      beforeEach(() => fillLinkedList());

      it("should find the middle node of the list when size is odd", () => {
        ll.removeLast();

        const middle = ll.findMiddle();

        expect(middle).toEqual([3]);
      });

      it("should find the middle two node of the list when size is even", () => {
        const middle = ll.findMiddle();

        expect(middle).toEqual([3, 4]);
      });
    });

    describe("with size 1", () => {
      beforeEach(() => ll.addFirst(1));

      it("should return the head as middle", () => {
        const middle = ll.findMiddle();

        expect(middle).toEqual([1]);
      });
    });

    describe("with size 0", () => {
      it("should throw an empty list error", () => {
        try {
          const middle = ll.findMiddle();
        } catch (error) {
          expect(error.message).toEqual("empty list");
        }
      });
    });
  });

  describe("check if the list has a loop", () => {
    describe("with size greater than 1", () => {
      beforeEach(() => fillLinkedList());

      it("should return that the list doesn't have a loop", () => {
        ll.removeLast();

        const loop = ll.hasLoop();

        expect(loop).toBeFalsy();
      });

      it("should return that the list doesn't have a loop", () => {
        const loop = ll.hasLoop();

        expect(loop).toBeFalsy();
      });

      it("should return that the list have a loop", () => {
        ll.removeLast();

        ll.forceLoop("force");

        const loop = ll.hasLoop();

        expect(loop).toBeTruthy();
      });

      it("should return that the list have a loop", () => {
        ll.forceLoop("force");

        const loop = ll.hasLoop();

        expect(loop).toBeTruthy();
      });
    });

    describe("with size 1", () => {
      beforeEach(() => ll.addFirst(1));

      it("should return that the list doesn't have a loop", () => {
        const loop = ll.hasLoop();

        expect(loop).toBeFalsy();
      });

      it("should return that the list have a loop", () => {
        ll.forceLoop("force");

        const loop = ll.hasLoop();

        expect(loop).toBeTruthy();
      });
    });

    describe("with size 0", () => {
      it("should throw an empty list error", () => {
        try {
          const loop = ll.hasLoop();
        } catch (error) {
          expect(error.message).toEqual("empty list");
        }
      });
    });
  });
});
