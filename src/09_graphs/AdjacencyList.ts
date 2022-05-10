import LinkedList from "../shared/SimpleLinkedList";
import Node from "./Node";

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

export default AdjacencyList;