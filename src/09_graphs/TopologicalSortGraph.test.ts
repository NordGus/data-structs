import TopologicalSortGraph from "./TopologicalSortGraph";

describe("Implement a Topological Sort Algoritm", () => {
  describe("TopologicalSortGraph", () => {
    let graph: TopologicalSortGraph;

    beforeEach(() => graph = new TopologicalSortGraph());

    describe("#sort", () => {
      const [X, A, B, P] = ["X", "A", "B", "P"]

      beforeEach(() => {
        for (const label of [X, A, B, P]) graph.addNode(label);
        for (const to of [A, B]) graph.addEdge(X, to);
        for (const from of [A, B]) graph.addEdge(from, P);
      }); 

      it("should return the execution order for the graph", () => {
        expect(graph.sort().toArray()).toEqual([X, B, A, P]);
      });
    });
  });
});