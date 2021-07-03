import LinkedList from "../shared/SimpleLinkedList";
import BinarySearchTree from "./BinarySearchTree";

describe("BinarySearchTree", () => {
  let tree: BinarySearchTree;

  const fillTree = (tree: BinarySearchTree) => {
    const arr = [20, 10, 30, 6, 14, 24, 3, 8, 26];
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      tree.insert(val);
    }
  };

  beforeEach(() => (tree = new BinarySearchTree()));

  it("should let you insert elements to the tree", () => {
    const arr = new Array(10, 5, 15, 6, 1, 8, 12, 18, 17);

    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      tree.insert(val);
    }

    expect(tree.size()).toBe(arr.length);
  });

  it("should let you find if an element is in the tree", () => {
    const arr = new Array(10, 5, 15, 6, 1, 8, 12, 18, 17);

    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      tree.insert(val);
    }

    expect(tree.size()).toBe(arr.length);
    expect(tree.find(1)).toBeTruthy();
    expect(tree.find(42)).toBeFalsy();
  });

  describe("traversal", () => {
    beforeEach(() => fillTree(tree));

    describe("breadth first (level order)", () => {
      test("filled tree", () => {
        const expected = [20, 10, 30, 6, 14, 24, 3, 8, 26];

        expect(tree.toArray("breadth")).toEqual(expected);
      });

      test("empty tree", () => {
        tree = new BinarySearchTree();
        expect(tree.toArray("breadth")).toEqual([]);
      });

      test("one element tree", () => {
        tree = new BinarySearchTree();
        const expected = [20];

        tree.insert(expected[0]);

        expect(tree.toArray("breadth")).toEqual(expected);
      });
    });

    describe("depth first", () => {
      test("pre-order", () => {
        const expected = [20, 10, 6, 3, 8, 14, 30, 24, 26];

        expect(tree.toArray("depth", "pre")).toEqual(expected);
      });

      test("in-order", () => {
        const expected = [3, 6, 8, 10, 14, 20, 24, 26, 30];

        expect(tree.toArray("depth", "in")).toEqual(expected);
      });

      test("post-order", () => {
        const expected = [3, 8, 6, 14, 10, 26, 24, 30, 20];

        expect(tree.toArray("depth", "post")).toEqual(expected);
      });
    });
  });

  describe("heigth", () => {
    beforeEach(() => fillTree(tree));

    test("filled tree", () => {
      expect(tree.height()).toBe(3);
    });

    test("empty tree", () => {
      let tree = new BinarySearchTree();
      expect(tree.height()).toBe(-1);
    });
  });

  describe("min", () => {
    test("filled tree", () => {
      fillTree(tree);

      expect(tree.min()).toBe(3);
    });

    test("empty tree", () => {
      let error: string;
      try {
        tree.min();
      } catch (e) {
        error = e.message;
      }

      expect(error).toBe("illegal state");
    });
  });

  describe("equality", () => {
    let second = new BinarySearchTree();

    beforeEach(() => {
      fillTree(tree);
      fillTree(second);
    });

    test("if the trees are equal", () => {
      expect(tree.equals(second)).toBeTruthy();
    });

    test("if one is empty", () => {
      tree = new BinarySearchTree();
      expect(tree.equals(second)).toBeFalsy();
    });

    test("if both are empty", () => {
      tree = new BinarySearchTree();
      second = new BinarySearchTree();
      expect(tree.equals(second)).toBeTruthy();
    });

    test("if second is null", () => {
      second = null;
      expect(tree.equals(second)).toBeFalsy();
    });
  });

  describe("validating", () => {
    beforeEach(() => fillTree(tree));

    test("when is valid", () => {
      expect(tree.isBinarySerachTree()).toBeTruthy();
    });

    test("when is invalid", () => {
      tree.invert();
      expect(tree.isBinarySerachTree()).toBeFalsy();
    });
  });

  describe("nodes at depth K", () => {
    beforeEach(() => fillTree(tree));

    test("distance 0, returns root", () => {
      expect(tree.nodesAtDepth(0)).toEqual([20]);
    });

    test("distance greater than 0", () => {
      expect(tree.nodesAtDepth(3)).toEqual([3, 8, 26]);
    });

    test("distance greater than tree depth", () => {
      expect(tree.nodesAtDepth(4)).toEqual([]);
    });

    test("distance less than 0, throws error", () => {
      let error: string;

      try {
        tree.nodesAtDepth(-1);
      } catch (e) {
        error = e.message;
      }

      expect(error).toBe("illegal argument");
    });
  });

  describe("countLeaves", () => {
    test("filled tree", () => {
      fillTree(tree);

      expect(tree.countLeaves()).toBe(3);
    });

    test("empty tree", () => {
      expect(tree.countLeaves()).toBe(0);
    });

    test("one element tree", () => {
      tree.insert(20);

      expect(tree.countLeaves()).toBe(1);
    });
  });

  describe("max", () => {
    test("filled tree", () => {
      fillTree(tree);

      expect(tree.max()).toBe(30);
    });

    test("empty tree", () => {
      let error: string;

      try {
        tree.max();
      } catch (e) {
        error = e.message;
      }

      expect(error).toBe("illegal state");
    });

    test("one element tree", () => {
      tree.insert(40);

      expect(tree.max()).toBe(40);
    });
  });

  describe("contains", () => {
    describe("filled tree", () => {
      beforeEach(() => fillTree(tree));

      test("present value", () => {
        expect(tree.contains(24)).toBeTruthy();
      });

      test("non-present value", () => {
        expect(tree.contains(42)).toBeFalsy();
      });
    });

    test("empty tree", () => {
      expect(tree.contains(42)).toBeFalsy();
    });
  });

  describe("areSibling", () => {
    describe("filled tree", () => {
      beforeEach(() => fillTree(tree));

      test("siblings", () => {
        expect(tree.areSibling(6, 14)).toBeTruthy();
      });

      test("non-siblings", () => {
        expect(tree.areSibling(3, 30)).toBeFalsy();
      });
    });

    test("empty tree", () => {
      expect(tree.areSibling(42, 15)).toBeFalsy();
    });
  });

  describe("getAncestors", () => {
    describe("filled tree", () => {
      beforeEach(() => fillTree(tree));

      test("present value", () => {
        const recieved = tree.getAncestors(6);

        expect(recieved.toArray()).toEqual([10, 20]);
      });

      test("non-present value", () => {
        const recieved = tree.getAncestors(42);

        expect(recieved.toArray()).toEqual([]);
      });
    });

    test("empty tree", () => {
      const recieved = tree.getAncestors(42);

      expect(recieved.toArray()).toEqual([]);
    });
  });
});
