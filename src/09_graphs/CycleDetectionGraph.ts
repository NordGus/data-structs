import LinkedList from "../shared/SimpleLinkedList";
import Stack from "../shared/SimpleStack";
import Graph from "./Graph";
import Node from "./Node";

class CycleDetectionGraph extends Graph {
  public hasCycle(): boolean {
    const all = new Set<Node>(this.nodes.values());
    const visiting = new Set<Node>();
    const visited = new Set<Node>();

    for (const current of all.values())
      if (this._hasCycle(current, all, visiting, visited))
        return true;

    return false;
  }

  private _hasCycle(node: Node, all: Set<Node>, visiting: Set<Node>, visited: Set<Node>): boolean {
    all.delete(node);
    visiting.add(node);

    for (const neighbour of this.adjacencyList.get(node).toArray()) {
      if (visited.has(neighbour)) continue;
      if (visiting.has(neighbour)) return true;
      if (this._hasCycle(neighbour, all, visiting, visited)) return true;
    }

    visiting.delete(node);
    visited.add(node);

    return false
  }
}

export default CycleDetectionGraph;