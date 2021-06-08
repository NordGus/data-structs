import Expression from "./Expression";

describe("Expression", () => {
  it("throws an illegal argument error when input is not a string", () => {
    let inputs = [null, undefined, 1, 25.0, [""], { echo: "catorce" }];

    inputs.forEach((input: any) => {
      try {
        const exp = new Expression(input);
        const balanced = exp.isBalanced();
      } catch (error) {
        expect(error.message).toBe("illegal argument");
      }
    });
  });

  describe("takes an string and confirm if the pairs and the order of brakets are correct in the string", () => {
    describe("returns true when given a expression", () => {
      it("without brakets", () => {
        let input = "1+2";
        const exp = new Expression(input);
        const balanced = exp.isBalanced();

        expect(balanced).toBeTruthy();
      });

      it("with valid braket pairs and order", () => {
        let input = "(1+2)*[8/42]";
        const exp = new Expression(input);
        const balanced = exp.isBalanced();

        expect(balanced).toBeTruthy();
      });
    });

    describe("returns false when given a expression", () => {
      it("with incomplete pairs", () => {
        let input = "(1+2)*[8/42";
        let exp = new Expression(input);

        expect(exp.isBalanced()).toBeFalsy();

        input = "(1+2*[8/42]";
        exp = new Expression(input);

        expect(exp.isBalanced()).toBeFalsy();
      });

      it("with invalid pairs", () => {
        let input = "(1+2)*[8/42>";
        let exp = new Expression(input);

        expect(exp.isBalanced()).toBeFalsy();

        input = "(1+2}*[8/42]";
        exp = new Expression(input);

        expect(exp.isBalanced()).toBeFalsy();
      });

      it("with out of order pairs", () => {
        let input = "<(1+2)*}8/42{>";
        let exp = new Expression(input);

        expect(exp.isBalanced()).toBeFalsy();

        input = ">(1+2}*[8/42]";
        exp = new Expression(input);

        expect(exp.isBalanced()).toBeFalsy();
      });
    });
  });
});
