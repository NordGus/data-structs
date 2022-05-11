import LinkedList from "../shared/SimpleLinkedList";
import Stack from "../shared/SimpleStack";
import Graph from "./Graph";
import Node from "./Node";

class TopologicalSortGraph extends Graph {
  public sort(): LinkedList<string> {
    const visited = new Set<Node>();
    const stack = new Stack<Node>();
    const sorted = new LinkedList<string>();

    for (const node of this.nodes.values()) this._sort(node, visited, stack);

    for (; !stack.isEmpty();) sorted.addLast(stack.pop().toString());

    return sorted;
  }

  private _sort(root: Node, visited: Set<Node>, stack: Stack<Node>): void {
    if (visited.has(root)) return;

    visited.add(root);

    for (const node of this.adjacencyList.get(root).toArray())
      if (!visited.has(node))
        this._sort(node, visited, stack);
    
    stack.push(root);
  }
}

export default TopologicalSortGraph;