import StringReverser from "./StringReverser";

describe("StringReverser", () => {
  it("can reverse a string", () => {
    const input = "abcd";
    const reverser = new StringReverser();
    const output = reverser.reverse(input);

    expect(output).toBe("dcba");
  });

  it("can reverse an empty string", () => {
    const input = "";
    const reverser = new StringReverser();
    const output = reverser.reverse(input);

    expect(output).toBe("");
  });

  it("throws an error if input is null", () => {
    const input: null = null;
    const reverser = new StringReverser();

    try {
      const output = reverser.reverse(input);
    } catch (error) {
      expect(error.message).toBe("illegal argument");
    }
  });
});
