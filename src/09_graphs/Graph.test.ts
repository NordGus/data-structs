import Graph from "./Graph";

describe("Graph", () => {
  let graph: Graph;

  beforeEach(() => graph = new Graph())

  describe("#addNode", () => {
    const A = "A";

    beforeEach(() => graph.addNode(A));

    describe("when given label doesn't exists on the graph", () => {
      it("should add a new node to the graph", () => {
        expect(graph.nodesArray()).toEqual([A]);
      });
  
      it("should add a new adjacency list entry", () => {
        expect(graph.edgesArray(A)).toEqual([]);
      });
    });

    describe("when given label exists on the graph", () => {
      beforeEach(() => graph.addNode(A));

      it("shouldn't add a new node to the graph", () => {
        expect(graph.nodesArray()).toEqual([A]);
      });

      it("shouldn't add a new adjacency list entry", () => {
        expect(graph.edgesArray(A)).toEqual([]);
      });
    });
  });

  describe("#removeNode", () => {
    const [A, B, C] = ["A", "B", "C"];

    beforeEach(() => {
      for (const label of [A, B, C]) graph.addNode(label);
      for (const to of [B, C]) graph.addEdge(A, to);
      for (const to of [A]) graph.addEdge(B, to);
    });

    describe("when label doesn't exists on graph", () => {
      beforeEach(() => graph.removeNode("D"));

      it("shouldn't remove any nodes", () => {
        expect(graph.nodesArray()).toEqual([A, B, C]);
      });

      it("shouldn't remove any edge", () => {
        expect(graph.edgesArray(A)).toEqual([B, C]);
        expect(graph.edgesArray(B)).toEqual([A]);
        expect(graph.edgesArray(C)).toEqual([]);
      });
    });

    describe("when label exists on graph", () => {
      beforeEach(() => graph.removeNode(C));

      it("should remove the associated node", () => {
        expect(graph.nodesArray()).toEqual([A, B]);
      });
  
      it("should remove associated edges with other nodes", () => {
        expect(graph.edgesArray(A)).toEqual([B]);
        expect(graph.edgesArray(B)).toEqual([A]);
      });

      it("should remove associated node's adjacency list", () => {
        expect(() => { graph.edgesArray(C) }).toThrow("illegal argument");
      });
    });
  });

  describe("#addEdge", () => {
    const [A, B, C] = ["A", "B", "C"];

    beforeEach(() => { for (const label of [A, B]) graph.addNode(label) });

    describe("when edge doesn't exist between the given nodes", () => {
      it("should add a new edge between the given nodes", () => {
        graph.addEdge(A, B);
        
        expect(graph.edgesArray(A)).toEqual([B]);
      });
    });

    describe("when edge exist between the given nodes", () => {
      beforeEach(() => graph.addEdge(A, B));

      it("shouldn't add a new edge", () => {
        graph.addEdge(A, B);
        
        expect(graph.edgesArray(A)).toEqual([B]);
      });
    });


    it("should throw an illegal argument error when invalid label is given for from argument", () => {
      expect(() => graph.addEdge(C, A)).toThrow("illegal argument");
    });

    it("should throw an illegal argument error when invalid label is given for to argument", () => {
      expect(() => graph.addEdge(A, C)).toThrow("illegal argument");
    });
  });

  describe("#toArray, debugging method", () => {
    it("should return an array of strings", () => {
      const [A, B, C] = ["A", "B", "C"];

      for (const label of [A, B, C]) graph.addNode(label);
      for (const to of [B, C]) graph.addEdge(A, to);
      for (const to of [A]) graph.addEdge(B, to);

      expect(graph.toArray()).toEqual([
        "A is connected with [B, C]",
        "B is connected with [A]"
      ]);
    });
  });

  describe("#nodesArray, debugging method", () => {
    it("should return an array of nodes' labels", () => {
      const labels = ["A", "B", "C"];

      for (const label of labels) graph.addNode(label);

      expect(graph.nodesArray()).toEqual(labels);
    });
  });

  describe("#edgesArray, debugging method", () => {
    it("should return given label's array of edges's labels for the given label", () => {
      const [A, B, C] = ["A", "B", "C"];

      for (const label of [A, B, C]) graph.addNode(label);
      for (const to of [B, C]) graph.addEdge(A, to);

      expect(graph.edgesArray(A)).toEqual([B, C]);
    });

    it("should throw an illegal argument error when invalid label is given", () => {
      const A = "A";

      expect(() => { graph.edgesArray(A) }).toThrow("illegal argument");
    });
  });
});