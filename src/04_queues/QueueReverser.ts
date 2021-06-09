import Stack from "../03_stacks/Stack";
import Queue from "./Queue";

class QueueReverser {
  private stack: Stack;

  constructor() {
    this.stack = new Stack();
  }

  reverse(queue: Queue): void {
    while (!queue.isEmpty()) this.stack.push(queue.remove());
    while (!this.stack.empty()) queue.add(this.stack.pop());
  }
}

export default QueueReverser;
