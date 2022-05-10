import { IllegalArgumentError } from "../shared/Errors";
import Queue from "../shared/SimpleQueue";
import Stack from "../shared/SimpleStack";
import AdjacencyList from "./AdjacencyList";
import Node from "./Node";

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

  public traverseDeepFirstRecursive(from: string): string[] {
    const fromNode = this.nodes.get(from);
    if (!fromNode) return [];

    const output = new Set<Node>(); 

    this._traverseDeepFirstRecursive(fromNode, output);
    
    return Array.from(output.values()).map((node) => node.toString());
  }

  private _traverseDeepFirstRecursive(from: Node, set: Set<Node>): void {
    if (!from) return;
    
    set.add(from);
    const neighbors = this.adjacencyList.get(from).toArray();

    for (const neighbor of neighbors)
      this._traverseDeepFirstRecursive(neighbor, set);
  }

  public traverseDeepFirstIterative(from: string): string[] {
    const fromNode = this.nodes.get(from);
    if (!fromNode) return [];
    
    const output = new Set<Node>(); 
    const stack = new Stack<Node>();
    stack.push(fromNode)

    for (; !stack.isEmpty();) {
      const current = stack.pop();
      if (output.has(current)) continue;
      
      output.add(current);
      
      for (const neighbor of this.adjacencyList.get(current).toArray()) 
        if (!output.has(neighbor)) stack.push(neighbor);
    } 
    
    return Array.from(output.values()).map((node) => node.toString());
  }

  public traverseBreathFirst(from: string): string[] {
    const fromNode = this.nodes.get(from);
    if (!fromNode) return [];
    
    const output = new Set<Node>(); 
    const queue = new Queue<Node>();
    queue.enqueue(fromNode)

    for (; !queue.isEmpty();) {
      const current = queue.dequeue();
      if (output.has(current)) continue;
      
      output.add(current);
      
      for (const neighbor of this.adjacencyList.get(current).toArray()) 
        if (!output.has(neighbor)) queue.enqueue(neighbor);
    } 
    
    return Array.from(output.values()).map((node) => node.toString());
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