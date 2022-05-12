import WeightedGraph from "./WeightedGraph";

describe("WeightedGraph", () => {
  let graph: WeightedGraph;

  beforeEach(() => graph = new WeightedGraph());

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
      graph.addNode(A);
      graph.addNode(B);
      graph.addEdge(A, B, 42)
    });

    describe("when given label doesn't exists on the graph", () => {
      beforeEach(() => graph.removeNode(C));

      it("shouldn't remove the node from the graph", () => {
        expect(graph.nodesArray()).toEqual([A, B]);
      });
  
      it("shouldn't change the adjacency lists entries", () => {
        expect(graph.edgesArray(A)).toEqual(["A -42-> B"]);
        expect(graph.edgesArray(B)).toEqual(["B -42-> A"]);
      });
    });

    describe("when given label exists on the graph", () => {
      beforeEach(() => graph.removeNode(A));

      it("should remove the given label from the graph", () => {
        expect(graph.nodesArray()).toEqual([B]);
      });

      it("should remove the edges between the nodes", () => {
        expect(() => graph.edgesArray(A)).toThrow("illegal argument");
        expect(graph.edgesArray(B)).toEqual([]);
      });
    });
  });

  describe("#addEdge", () => {
    const [A, B, C] = ["A", "B", "C"];

    beforeEach(() => { for (const label of [A, B]) graph.addNode(label) });

    describe("when edge doesn't exist between the given nodes", () => {
      it("should add a new edge between the given nodes", () => {
        graph.addEdge(A, B, 2);
        
        expect(graph.edgesArray(A)).toEqual(["A -2-> B"]);
        expect(graph.edgesArray(B)).toEqual(["B -2-> A"]);
      });
    });

    describe("when edge exist between the given nodes", () => {
      beforeEach(() => graph.addEdge(A, B, 2));

      it("shouldn't add a new edge", () => {
        graph.addEdge(A, B, 2);
        
        expect(graph.edgesArray(A)).toEqual(["A -2-> B"]);
        expect(graph.edgesArray(B)).toEqual(["B -2-> A"]);
      });

      it("should update edge weight when is different", () => {
        graph.addEdge(A, B, 42);
        
        expect(graph.edgesArray(A)).toEqual(["A -42-> B"]);
        expect(graph.edgesArray(B)).toEqual(["B -42-> A"]);
      });

      it("shouldn't update edge weight when is not different", () => {
        graph.addEdge(A, B, 2);
        
        expect(graph.edgesArray(A)).toEqual(["A -2-> B"]);
        expect(graph.edgesArray(B)).toEqual(["B -2-> A"]);
      });
    });

    it("should throw an illegal argument error when invalid label is given for from argument", () => {
      expect(() => graph.addEdge(C, A, 42)).toThrow("illegal argument");
    });

    it("should throw an illegal argument error when invalid label is given for to argument", () => {
      expect(() => graph.addEdge(A, C, 42)).toThrow("illegal argument");
    });
  });

  describe("#removeEdge", () => {
    const [A, B, C] = ["A", "B", "C"];

    beforeEach(() => { 
      for (const label of [A, B, C]) graph.addNode(label)
      graph.addEdge(A, B, 2);
    });

    describe("when edge doesn't exist between the given nodes", () => {
      it("shouldn't change the adjacency list", () => {
        graph.removeEdge(A, C);
        
        expect(graph.edgesArray(A)).toEqual(["A -2-> B"]);
        expect(graph.edgesArray(C)).toEqual([]);
      });
    });

    describe("when edge exist between the given nodes", () => {
      beforeEach(() => graph.addEdge(A, C, 42));

      it("should remove the edges between nodes", () => {
        graph.removeEdge(A, C);
        
        expect(graph.edgesArray(A)).toEqual(["A -2-> B"]);
        expect(graph.edgesArray(C)).toEqual([]);
      });
    });

    describe("when one node doesn't exist", () => {
      it("shouldn't change the adjacency list", () => {
        graph.removeEdge(A, "D");
        
        expect(graph.edgesArray(A)).toEqual(["A -2-> B"]);
        expect(graph.edgesArray(B)).toEqual(["B -2-> A"]);
        expect(graph.edgesArray(C)).toEqual([]);
      });
    });
  });

  describe("Implement Dijkstra's Algorithm on a weighted graph", () => {
    const [A, B, C, D, E] = ["A", "B", "C", "D", "E"];
    
    beforeEach(() => {
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

  describe("#hasCicle", () => {
    const [A, B, C] = ["A", "B", "C"]

    beforeEach(() => { for (const label of [A, B, C]) graph.addNode(label) });

    describe("when graph doesn't have cycle", () => {
      it("should return false", () => {
        graph.addEdge(A, B, 1);
        graph.addEdge(B, C, 1);

        expect(graph.hasCycle()).toBeFalsy();
      });
    });

    describe("when graph have cycle", () => {
      it("should return true", () => {
        graph.addEdge(A, B, 1);
        graph.addEdge(B, C, 1);
        graph.addEdge(A, C, 1);
        
        expect(graph.hasCycle()).toBeTruthy();
      });
    });
  });

  describe("Implement Prim's algorithm on a weighted graph", () => {
    const [A, B, C, D] = ["A", "B", "C", "D"];

    describe("#minSpanningTree", () => {
      let tree: WeightedGraph;

      describe("when graph has no nodes", () => {
        beforeEach(() => tree = graph.minSpanningTree());

        it("should return an empty minimum spanning tree", () => {
          expect(tree).toEqual(new WeightedGraph());
        });
      });

      describe("when graph has no edges", () => {
        beforeEach(() => {
          for (const label of [A, B, C, D]) graph.addNode(label);
          tree = graph.minSpanningTree();
        });

        it("should return an empty minimum spanning tree", () => {
          expect(tree).toEqual(new WeightedGraph());
        });
      });

      describe("returned minimum spannig tree", () => {
        beforeEach(() => { 
          for (const label of [A, B, C, D]) graph.addNode(label);
          graph.addEdge(A, B, 3);
          graph.addEdge(A, C, 1);
          graph.addEdge(B, C, 2);
          graph.addEdge(B, D, 4);
          graph.addEdge(C, D, 5);
          tree = graph.minSpanningTree();
        });

        it("should containing the same nodes as weighted graph", () => {
          expect(tree.nodesArray().sort()).toEqual(graph.nodesArray().sort());
        });
  
        it("should have less edges as weighted graph", () => {
          let treeEdgesCount = 0;
          let graphEdgesCount = 0;

          for (const label of [A, B, C, D]) {
            treeEdgesCount += tree.edgesArray(label).length;
            graphEdgesCount += graph.edgesArray(label).length;
          }

          expect(treeEdgesCount).toBeLessThan(graphEdgesCount);
        });

        it("should have N - 1 edges (N = amount of Nodes)", () => {
          let treeEdgesCount = 0;

          for (const label of [A, B, C, D]) treeEdgesCount += tree.edgesArray(label).length;

          // expected value is multiplied by 2 because each each is stored twice on an undirected graph.
          expect(treeEdgesCount).toBe((tree.nodesArray().length - 1) * 2);
        });
      });
    }) 
  });

  describe("Debugging methods", () => {
    describe("#nodesArray", () => {
      it("should return an array of nodes' labels", () => {
        const [A, B, C] = ["A", "B", "C"];
  
        for (const label of [A, B, C]) graph.addNode(label);
  
        expect(graph.nodesArray()).toEqual([A, B, C]);
      });
    });

    describe("#edgesArray", () => {
      it("should return given label's array of edges's labels for the given label", () => {
        const [A, B, C] = ["A", "B", "C"];
  
        for (const label of [A, B, C]) graph.addNode(label);
        for (const to of [B, C]) graph.addEdge(A, to, 42);
  
        expect(graph.edgesArray(A)).toEqual(["A -42-> B", "A -42-> C"]);
      });
  
      it("should throw an illegal argument error when invalid label is given", () => {
        const A = "A";
  
        expect(() => { graph.edgesArray(A) }).toThrow("illegal argument");
      });
    });
  });
});
