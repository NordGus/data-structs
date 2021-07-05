import AVLTree from "./AVLTree";

describe("AVLTree", () => {
  let tree: AVLTree;

  const fillTree = (tree: AVLTree) => {
    const arr = [3, 6, 10, 20, 30, 14, 24, 8, 26];
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      tree.insert(val);
    }
  };

  beforeEach(() => (tree = new AVLTree()));

  describe("insert", () => {
    test("adds an element", () => {
      tree.insert(1);

      expect(tree.toList().toArray()).toEqual([1]);
    });

    test("adds multiple elements", () => {
      const expected = [3, 6, 8, 10, 14, 20, 24, 26, 30];
      fillTree(tree);

      expect(tree.toList().toArray()).toEqual(expected);
    });

    test("with rotation", () => {
      const root = {
        value: 10,
        height: 1,
        rigth: {
          value: 20,
          height: 0,
        },
      };

      tree = new AVLTree(root);

      tree.insert(30);

      expect(tree.toList().toArray()).toEqual([10, 20, 30]);
    });
  });

  describe("isBalanced", () => {
    test("balanced tree", () => {
      const root = {
        value: 20,
        height: 1,
        rigth: {
          value: 30,
          height: 0,
        },
        left: {
          value: 10,
          height: 0,
        },
      };

      tree = new AVLTree(root);

      expect(tree.isBalanced()).toBeTruthy();
    });

    test("unbalanced tree", () => {
      const root = {
        value: 10,
        height: 2,
        rigth: {
          value: 20,
          height: 1,
          rigth: {
            value: 30,
            height: 0,
          },
        },
      };

      tree = new AVLTree(root);

      expect(tree.isBalanced()).toBeFalsy();
    });
  });

  describe("isPerfect", () => {
    test("perfect tree", () => {
      const root = {
        value: 20,
        height: 1,
        rigth: {
          value: 30,
          height: 0,
        },
        left: {
          value: 10,
          height: 0,
        },
      };

      tree = new AVLTree(root);

      expect(tree.size).toBe(3);
      expect(tree.isPerfect()).toBeTruthy();
    });

    test("imperfect tree", () => {
      const root = {
        value: 10,
        height: 2,
        rigth: {
          value: 20,
          height: 1,
          rigth: {
            value: 30,
            height: 0,
          },
        },
      };

      tree = new AVLTree(root);

      expect(tree.size).toBe(3);
      expect(tree.isPerfect()).toBeFalsy();
    });
  });
});
