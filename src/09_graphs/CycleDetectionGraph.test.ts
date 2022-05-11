import CycleDetectionGraph from "./CycleDetectionGraph";

describe("Implement a Cycle Detection Algoritm", () => {
  describe("CycleDetectionGraph", () => {
    let graph: CycleDetectionGraph;

    beforeEach(() => graph = new CycleDetectionGraph());

    describe("#detectCycle", () => {
      const [A, B, C, D] = ["A", "B", "C", "D"] 

      describe("when graph doesn't have a cycle", () => {
        it("should return false", () => {
          for (const label of [A, B, C, D]) graph.addNode(label);
          for (const to of [B, C]) graph.addEdge(A, to);
          graph.addEdge(B, C);
          graph.addEdge(D, A);

          expect(graph.hasCycle()).toBeFalsy();
        });

        it("should return false", () => {
          for (const label of [A, B, C]) graph.addNode(label);
          graph.addEdge(A, B);
          graph.addEdge(A, C);
          graph.addEdge(B, C);

          expect(graph.hasCycle()).toBeFalsy();
        });
      });

      describe("when graph have a cycle", () => {
        it("should return true", () => {
          for (const label of [A, B, C, D]) graph.addNode(label);
          graph.addEdge(A, B);
          graph.addEdge(B, C);
          graph.addEdge(C, A);
          graph.addEdge(D, A);

          expect(graph.hasCycle()).toBeTruthy()
        });

        it("should return true", () => {
          for (const label of [A, B, C]) graph.addNode(label);
          graph.addEdge(A, B);
          graph.addEdge(B, C);
          graph.addEdge(C, A);

          expect(graph.hasCycle()).toBeTruthy()
        });
      });
    });
  });
});
