import StringUtils from "./StringUtils";

describe("Solve the following string manipulation exercises", () => {
    describe("1- Find the number of vowels (English vowels) in a string.", () => {
        const examples = [
            { input: "hello", output: 2 },
            { input: "mathematics", output: 4 },
            { input: "hello world", output: 3 },
            { input: "master chief", output: 4 },
            { input: null, output: 0 },
            { input: "      ", output: 0 },
            { input: "", output: 0 }
        ];

        for (const example of examples) {
            describe(`given "${example.input}"`, () => {
                it(`sould return "${example.output}"`, () => {
                    expect(StringUtils.countVowels(example.input)).toBe(example.output);
                });
            });
        }
    });

    describe("2- Reverse a String.", () => {
        const examples = [
            { input: "hello", output: "olleh" },
            { input: "mathematics", output: "scitamehtam" },
            { input: "hello world", output: "dlrow olleh" },
            { input: "master chief", output: "feihc retsam" },
            { input: null, output: null },
            { input: "      ", output: "      " },
            { input: "", output: "" }
        ];

        for (const example of examples) {
            describe(`given "${example.input}"`, () => {
                it(`sould return "${example.output}"`, () => {
                    expect(StringUtils.reverse(example.input)).toBe(example.output);
                });
            });
        }
    });

    describe("3- Reverse the order of words in a sentence.", () => {
        const examples = [
            { input: "mathematics", output: "mathematics" },
            { input: "master chief", output: "chief master" },
            { input: "Trees are beautiful", output: "beautiful are Trees" },
            { input: null, output: null },
            { input: "      ", output: "" },
            { input: "", output: "" }
        ];

        for (const example of examples) {
            describe(`given "${example.input}"`, () => {
                it(`sould return "${example.output}"`, () => {
                    expect(StringUtils.reverseWords(example.input)).toBe(example.output);
                });
            });
        }
    });

    describe("4- Check if a string is a rotation of another string.", () => {
        const examples = [
            { input: ["ABCD", "DABC"], output: true },
            { input: ["ABCD", "CDAB"], output: true },
            { input: ["ABCD", "BCDA"], output: true },
            { input: ["ABCD", "ABCD"], output: true },
            { input: ["ABCD", "ACBD"], output: false },
            { input: ["ABCD", "DBCA"], output: false }
        ];

        for (const example of examples) {
            describe(`given "${example.input[0]}" and "${example.input[1]}"`, () => {
                it(`sould return "${example.output}"`, () => {
                    expect(StringUtils.isRotations(example.input[0], example.input[1])).toBe(example.output);
                });
            });
        }
    });

    describe("5- Remove duplicate characters in a string.", () => {
        const examples = [
            { input: "Hellooooo!!", output: "Helo!" },
            { input: null, output: "" },
            { input: "      ", output: " " },
            { input: "", output: "" }
        ];

        for (const example of examples) {
            describe(`given "${example.input}"`, () => {
                it(`sould return "${example.output}"`, () => {
                    expect(StringUtils.removeDuplicateCharacters(example.input)).toBe(example.output);
                });
            });
        }
    });

    describe("6- Find the most repeated character in a string.", () => {
        const examples = [
            { input: "Hellooooo!!", output: "o" },
            { input: "      ", output: " " },
        ];

        for (const example of examples) {
            describe(`given "${example.input}"`, () => {
                it(`sould return "${example.output}"`, () => {
                    expect(StringUtils.mostRepeatedChar(example.input)).toBe(example.output);
                });
            });
        }

        describe(`given "null"`, () => {
            it("sould throw an illegal argument error", () => {
                expect(() => StringUtils.mostRepeatedChar(null)).toThrow("illegal argument");
            });
        });

        describe(`given ""`, () => {
            it("sould throw an illegal argument error", () => {
                expect(() => StringUtils.mostRepeatedChar("")).toThrow("illegal argument");
            });
        });
    });

    describe("7- Capitalize the first letter of each word in a sentence. Also, remove any extra spaces between words.", () => {
        const examples = [
            { input: "trees are beautiful", output: "Trees Are Beautiful" },
            { input: "  trees    are        beautiful  ", output: "Trees Are Beautiful" },
            { input: "TODAY IS A GREAT DAY", output: "Today Is A Great Day" },
            { input: "          ", output: "" },
            { input: "", output: "" },
            { input: null, output: "" },
        ];

        for (const example of examples) {
            describe(`given "${example.input}"`, () => {
                it(`sould return "${example.output}"`, () => {
                    expect(StringUtils.capitalize(example.input)).toBe(example.output);
                });
            });
        }
    });

    describe("8- Detect if two strings are anagram of each other.", () => {
        const examples = [
            { input: ["abcd", "adbc"], output: true },
            { input: ["abcd", "cadb"], output: true },
            { input: ["abcd", "abcd"], output: true },
            { input: ["", ""], output: true },
            { input: ["abcd", "abce"], output: false },
            { input: [null, "abce"], output: false },
            { input: ["abcd", null], output: false },
            { input: ["abcd", ""], output: false }
        ];

        for (const example of examples) {
            describe(`given "${example.input[0]}" and "${example.input[1]}"`, () => {
                it(`sould return "${example.output}"`, () => {
                    expect(StringUtils.areAnagrams(example.input[0], example.input[1])).toBe(example.output);
                });
            });
        }
    });

    describe("9- Check if a string is palindrome", () => {
        const examples = [
            { input: "abba", output: true },
            { input: "abcba", output: true },
            { input: "          ", output: true },
            { input: "", output: true },
            { input: null, output: false },
            { input: "abca", output: false },
        ];

        for (const example of examples) {
            describe(`given "${example.input}"`, () => {
                it(`sould return "${example.output}"`, () => {
                    expect(StringUtils.palindrome(example.input)).toBe(example.output);
                });
            });
        }
    });
});