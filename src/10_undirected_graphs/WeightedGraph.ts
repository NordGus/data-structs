import { IllegalArgumentError } from "../shared/Errors";
import LinkedList from "../shared/SimpleLinkedList";
import Stack from "../shared/SimpleStack";

type Comparator<T> = (a: T, b: T) => boolean;

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

  public getTo(): Node { return this.to; }
  
  public getWeight(): number { return this.weight; }
}

interface QueueNode {
  node: Node;
  priority: number;
  next?: QueueNode;
}

class PriorityQueue {
  protected comparator: Comparator<number>;
  protected first: QueueNode;
  protected size: number

  constructor(comparator: Comparator<number>) {
    this.comparator = comparator;
    this.size = 0;
    this.first = null;
  }

  enqueue(node: Node, priority: number): void {
    const element: QueueNode = { node: node, priority: priority, next: null };
    
    if (this.first === null) {
      this.first = element;
      this.size++;
      return; 
    }

    let prev = null;
    let current = this.first;

    for (; current;) {
      if (this.comparator(element.priority, current.priority)) {
        if (!!prev) prev.next = element;
        element.next = current;
        if (this.first === element.next) this.first = element;
        this.size++;
        return;
      }

      prev = current;
      current = current.next;
    }

    console.log(current);
    
    prev.next = element;
    this.size++;
  }

  dequeue(): Node {
    if (this.isEmpty()) return null;

    const element = this.first
    
    this.first = element.next

    element.next = null;
    this.size--;
    return element.node
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }
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

  public shortestDistance(from: string, to: string): number {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);

    if (!fromNode || !toNode) return -1;

    const visited = new Set<Node>();
    const distances = new Map<Node, number>();
    for (const node of this.nodes.values()) distances.set(node, Infinity);
    distances.set(fromNode, 0);

    const queue = new PriorityQueue((a: number, b: number) => a < b);
    queue.enqueue(fromNode, 0);

    for (; !queue.isEmpty();) {
      const current = queue.dequeue();
      visited.add(current);

      for (const edge of current.edgesArray()) {
        if (visited.has(edge.getTo())) continue;
        
        const newDistance = distances.get(current) + edge.getWeight();
        
        if (newDistance < distances.get(edge.getTo())) {
          distances.set(edge.getTo(), newDistance);
          queue.enqueue(edge.getTo(), newDistance);
        }
      }
    }

    return distances.get(toNode);
  }

  public shortestPath(from: string, to: string): LinkedList<string> {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);

    if (!fromNode || !toNode) return null;

    const visited = new Set<Node>();
    const previosNodes = new Map<Node, Node>();
    const distances = new Map<Node, number>();
    for (const node of this.nodes.values()) distances.set(node, Infinity);
    distances.set(fromNode, 0);

    const queue = new PriorityQueue((a: number, b: number) => a < b);
    queue.enqueue(fromNode, 0);

    for (; !queue.isEmpty();) {
      const current = queue.dequeue();
      visited.add(current);

      for (const edge of current.edgesArray()) {
        if (visited.has(edge.getTo())) continue;
        
        const newDistance = distances.get(current) + edge.getWeight();
        
        if (newDistance < distances.get(edge.getTo())) {
          distances.set(edge.getTo(), newDistance);
          previosNodes.set(edge.getTo(), current);
          queue.enqueue(edge.getTo(), newDistance);
        }
      }
    }

    return this.buildPath(toNode, previosNodes);
  }

  public nodesArray(): string[] { 
    return Array.from(this.nodes.values()).map((node) => node.toString());
  }

  public edgesArray(label: string): string[] { 
    const node = this.nodes.get(label);
    if (!node) throw new IllegalArgumentError();

    return node.edgesArray().map((edge) => edge.toString());
  }

  private buildPath(to: Node, previosNodes: Map<Node, Node>): LinkedList<string> {
    const stack = new Stack<Node>();
    const path = new LinkedList<string>();
    let prev = previosNodes.get(to);
    
    stack.push(to);

    for (; prev;) {
      stack.push(prev);
      prev = previosNodes.get(prev);
    }
    
    for (; !stack.isEmpty();) path.addLast(stack.pop().toString());

    return path;
  }
}

export default WeightedGraph;