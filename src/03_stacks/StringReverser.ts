import Stack from "./Stack";

class StringReverser {
  public reverse(input: string | null | undefined): string {
    if (input === null || input === undefined)
      throw new Error("illegal argument");

    const chars = input.split("");
    const stack = new Stack();
    let output = "";

    chars.forEach((char: string) => stack.push(char));
    while (this.peekable(stack)) output += stack.pop();

    return output;
  }

  private peekable(stack: Stack): boolean {
    try {
      stack.peek();
    } catch {
      return false;
    }

    return true;
  }
}

export default StringReverser;
