import Stack from "./Stack";

class Expression {
  private exp: string;

  constructor(exp: string) {
    if (typeof exp !== "string") throw new Error("illegal argument");

    this.exp = exp;
  }

  public isBalanced(): boolean {
    const stack = new Stack();
    const input = this.exp.split("");

    for (const char of input) {
      if (this.isOpeningBracket(char)) stack.push(char);
      else if (this.isClosingBracket(char)) {
        if (stack.empty()) return false;

        const top = stack.pop();
        if (!this.bracketMatch(top, char)) return false;
      }
    }

    return stack.empty();
  }

  private isOpeningBracket(char: string): boolean {
    return char === "(" || char === "[" || char === "{" || char === "<";
  }

  private isClosingBracket(char: string): boolean {
    return char === ")" || char === "]" || char === "}" || char === ">";
  }

  private bracketMatch(left: string, right: string) {
    return (
      (left === "(" && right === ")") ||
      (left === "[" && right === "]") ||
      (left === "{" && right === "}") ||
      (left === "<" && right === ">")
    );
  }
}
export default Expression;
