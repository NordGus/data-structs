import Stack from "./Stack";

class Expression {
  private exp: string;
  private leftBrackets: string[];
  private rightBrackets: string[];

  constructor(exp: string) {
    if (typeof exp !== "string") throw new Error("illegal argument");

    this.exp = exp;
    this.leftBrackets = new Array("(", "[", "{", "<");
    this.rightBrackets = new Array(")", "]", "}", ">");
  }

  public isBalanced(): boolean {
    const stack = new Stack();
    const input = this.exp.split("");

    for (const char of input) {
      if (this.isOpeningBracket(char)) {
        stack.push(char);
      } else if (this.isClosingBracket(char)) {
        if (stack.empty()) return false;

        const top = stack.pop();
        if (!this.bracketMatch(top, char)) return false;
      }
    }

    return stack.empty();
  }

  private isOpeningBracket(char: string): boolean {
    return this.leftBrackets.includes(char);
  }

  private isClosingBracket(char: string): boolean {
    return this.rightBrackets.includes(char);
  }

  private bracketMatch(left: string, right: string) {
    return (
      this.leftBrackets.indexOf(left) === this.rightBrackets.indexOf(right)
    );
  }
}
export default Expression;
