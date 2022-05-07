import Graph from "./Graph";

describe("Graph", () => {
  let graph: Graph;

  beforeEach(() => graph = new Graph())

  describe("#addNode", () => {
    it("should add a new node to the graph with the given label", () => {
      const A = "A";

      graph.addNode(A);
      
      expect(graph.nodesArray()).toEqual([A]);
    });

    it("should add a new adjacency list entry for the given label", () => {
      const A = "A";

      graph.addNode(A);
      
      expect(graph.edgesArray(A)).toEqual([]);
    });
  });

  describe("#addEdge", () => {
    const [A, B, C] = ["A", "B", "C"];

    beforeEach(() => { for (const node of [A, B]) graph.addNode(node) });

    it("should add a new edge between the given nodes", () => {
      graph.addEdge(A, B);
      
      expect(graph.edgesArray(A)).toEqual([B]);
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

      graph.addNode(A);
      graph.addNode(B);
      graph.addNode(C);

      for (const edge of [B, C]) graph.addEdge(A, edge);
      for (const edge of [A]) graph.addEdge(B, edge);

      expect(graph.toArray()).toEqual([
        "A is connected with [B, C]",
        "B is connected with [A]"
      ]);
    });
  });

  describe("#nodesArray, debugging method", () => {
    it("should return an array of nodes' labels", () => {
      const nodes = ["A", "B", "C"];

      for (const node of nodes) graph.addNode(node);

      expect(graph.nodesArray()).toEqual(nodes);
    });
  });

  describe("#edgesArray, debugging method", () => {
    it("should return given label's array of edges's labels for the given label", () => {
      const [A, B, C] = ["A", "B", "C"];

      graph.addNode(A);
      graph.addNode(B);
      graph.addNode(C);

      for (const edge of [B, C]) graph.addEdge(A, edge);

      expect(graph.edgesArray(A)).toEqual([B, C]);
    });

    it("should throw an illegal argument error when invalid label is given", () => {
      const A = "A";

      expect(() => { graph.edgesArray(A) }).toThrow("illegal argument");
    });
  });
});
