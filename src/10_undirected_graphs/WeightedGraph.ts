import { IllegalArgumentError } from "../shared/Errors";

class Node {
  private label: string;
  private edges: Map<Node, Edge>;

  constructor(label: string) {
    this.label = label;
    this.edges = new Map<Node, Edge>();
  }

  public addEdge(to: Node, weight: number): void {
    let edge = this.edges.get(to)
    
    if (!edge) {
      this.edges.set(to, new Edge(this, to, weight));
      return;
    }
    
    this.edges.set(to, new Edge(this, to, weight));
    edge.clear();
  }

  public removeEdge(to: Node): void {
    const edge = this.edges.get(to)

    if (!edge) return;

    edge.clear()
    this.edges.delete(to)
  }

  public clearEdges(): void {
    for (const edge of this.edges.values()) edge.clear();
    this.edges.clear();
  }

  public toString(): string {
    return this.label;
  }

  public edgesArray(): Edge[] {
    return Array.from(this.edges.values());
  }
}

class Edge {
  private from: Node;
  private to: Node;
  private weight: number;

  constructor(from: Node, to: Node, weight: number = 0) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }

  public toString(): string {
    return `${this.from} -${this.weight}-> ${this.to}`;
  }

  public equal(edge: Edge): boolean {
    return this.from === edge.from && this.to === edge.to;
  }

  public updateWeight(edge: Edge): void { 
    if (this.weight === edge.weight) return;
    
    this.weight = edge.weight 
  }

  public clear(): void { this.from = this.to = null }
}

class WeightedGraph {
  protected nodes: Map<string, Node>;

  constructor() {
    this.nodes = new Map<string, Node>();
  }

  public addNode(label: string): void {
    if (!this.nodes.has(label)) this.nodes.set(label, new Node(label));
  }

  public removeNode(label: string): void {
    const deletedNode = this.nodes.get(label)

    if (!deletedNode) return;
    this.nodes.delete(label);
    deletedNode.clearEdges();

    for (const node of this.nodes.values()) node.removeEdge(deletedNode);
  }

  public addEdge(from: string, to: string, weight: number): void {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);

    if (!fromNode || !toNode) throw new IllegalArgumentError;

    fromNode.addEdge(toNode, weight);
    toNode.addEdge(fromNode, weight);
  }

  public removeEdge(from: string, to: string): void {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);

    if (!fromNode || !toNode) return;

    fromNode.removeEdge(toNode);
    toNode.removeEdge(fromNode);
  }

  public nodesArray(): string[] { 
    return Array.from(this.nodes.values()).map((node) => node.toString());
  }

  public edgesArray(label: string): string[] { 
    const node = this.nodes.get(label);
    if (!node) throw new IllegalArgumentError();

    return node.edgesArray().map((edge) => edge.toString());
  }
}

export default WeightedGraph;