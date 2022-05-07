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
    public add(node: Node): void { this.addLast(node) }
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
  
  public removeNode(label: string): string {
    return ""
  }

  public addEdge(from: string, to: string): void {
    const fromNode = this.nodes.get(from)
    const toNode = this.nodes.get(to)
    
    if (!fromNode || !toNode) throw new IllegalArgumentError();

    this.adjacencyList.get(fromNode).add(toNode);
  }
  
  public removeEdge(from: string, to: string): boolean {
    return false;
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