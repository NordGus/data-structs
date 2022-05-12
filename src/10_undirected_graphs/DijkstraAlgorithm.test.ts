import WeightedGraph from "./WeightedGraph";

describe("Implement Dijkstra's Algorithm on a weighted graph", () => {
  let graph: WeightedGraph;
  const [A, B, C, D, E] = ["A", "B", "C", "D", "E"];
  
  beforeEach(() => {
    graph = new WeightedGraph();
    for (const label of [A, B, C, D, E]) graph.addNode(label);
    
    graph.addEdge(A, B, 3);
    graph.addEdge(A, C, 4);
    graph.addEdge(A, D, 2);

    graph.addEdge(B, D, 6);
    graph.addEdge(B, E, 1);

    graph.addEdge(C, D, 1);

    graph.addEdge(D, E, 5);
  });

  describe("#shortestDistance", () => {
    describe("when from node doesn't exist", () => {
      it("should return -1", () => expect(() => graph.shortestDistance("F", A)).toThrow("illegal argument"));
    });

    describe("when to node doesn't exist", () => {
      it("should return -1", () => expect(() => graph.shortestDistance(A, "F")).toThrow("illegal argument"));
    });

    describe("when both node doesn't exist", () => {
      it("should return -1", () => expect(() => graph.shortestDistance("F", "G")).toThrow("illegal argument"));
    });

    describe("when boths nodes exists", () => {
      it("should return the shortest distance between the given nodes", () => {
        expect(graph.shortestDistance(A, E)).toBe(4);
      });
    }); 
  });

  describe("#shortestPath", () => {
    describe("when from node doesn't exist", () => {
      it("should return an empty list", () => {
        expect(() => graph.shortestPath("F", A)).toThrow("illegal argument");
      });
    });

    describe("when to node doesn't exist", () => {
      it("should return an empty list", () => {
        expect(() => graph.shortestPath(A, "F")).toThrow("illegal argument");
      });
    });

    describe("when both node doesn't exist", () => {
      it("should return an empty list", () => {
        expect(() => graph.shortestPath("F", "G")).toThrow("illegal argument");
      });
    });

    describe("when boths nodes exists", () => {
      it("should return the shortest distance between the given nodes", () => {
        expect(graph.shortestPath(A, E).toArray()).toEqual([A, B, E]);
      });
    }); 
  });
});