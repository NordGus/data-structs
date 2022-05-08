import { IllegalArgumentError } from "../shared/Errors";
import LinkedList from "../shared/SimpleLinkedList";

class Node {
  private label: string;

  constructor(label: string) {
    this.label = label;
  }

  public toString(): string {
    return this.label;
  }
}

class AdjacencyList extends LinkedList<Node> {
  public add(node: Node): void { if (!this.contains(node)) this.addLast(node) }

  public remove(node: Node): Node {
    if (this.isEmpty()) return null;

    let current = this.first;
    let previous = null;

    for (; current;) {
      if (current.value === node || !current.next) break;
      previous = current;
      current = current.next;
    }

    // protection against Node not being in list
    if (current.value !== node) return null;

    this.count--;

    if (this.first === this.last) {
      this.first = this.last = null;
      return current.value
    }

    if (current === this.first) {
      this.first = current.next
      current.next = null;
      return current.value;  
    }

    if (current === this.last) {
      this.last = previous;
      this.last.next = null
      return current.value;
    }
    
    previous.next = current.next
    current.next = null

    return current.value;
  }
}

class Graph {
  protected nodes: Map<string, Node>;
  protected adjacencyList: Map<Node, AdjacencyList>;

  constructor() {
    this.nodes = new Map<string, Node>();
    this.adjacencyList = new Map<Node, AdjacencyList>();
  }

  public addNode(label: string): void {
    if (!this.nodes.has(label)) this.nodes.set(label, new Node(label));
    const node = this.nodes.get(label);
    if (!this.adjacencyList.has(node)) this.adjacencyList.set(node, new AdjacencyList());
  }
  
  public removeNode(label: string): void {
    const node = this.nodes.get(label);
    if (!node) return;

    for (const [n, targets] of this.adjacencyList) {
      if (n === node) continue;
      targets.remove(node);
    }

    this.adjacencyList.delete(node);
    this.nodes.delete(node.toString());
  }

  public addEdge(from: string, to: string): void {
    const fromNode = this.nodes.get(from)
    const toNode = this.nodes.get(to)
    
    if (!fromNode || !toNode) throw new IllegalArgumentError();

    this.adjacencyList.get(fromNode).add(toNode);
  }
  
  public removeEdge(from: string, to: string): void {
    const fromNode = this.nodes.get(from)
    const toNode = this.nodes.get(to)
    
    if (!fromNode || !toNode) return;

    this.adjacencyList.get(fromNode).remove(toNode);
  }
  
  public toArray(): string[] {
    let output = new Array<string>();

    for (const [node, targets] of this.adjacencyList) {
      if (targets.isEmpty()) continue;

      output.push(`${node} is connected with [${targets.toArray().join(", ")}]`)
    }

    return output;
  }

  public nodesArray(): string[] {
    const nodes = Array.from(this.nodes.values());
    const array = new Array<string>(nodes.length);

    for (let i = 0; i < array.length; i++) array[i] = nodes[i].toString();

    return array;
  }

  public edgesArray(label: string): string[] {
    const node = this.nodes.get(label);
    if (!node) throw new IllegalArgumentError();

    const edges = this.adjacencyList.get(node).toArray();
    const array = new Array<string>(edges.length);

    for (let i = 0; i < array.length; i++) array[i] = edges[i].toString();

    return array;
  }
}

export default Graph;