import PrefixFinder from "./PrefixFinder";

describe("PrefixFinder", () => {
   describe("longestCommonPrefix", () => {
      test("return the longest common prefix between two words", () => {
         expect(PrefixFinder.longestCommonPrefix("card", "care")).toBe("car")
         expect(PrefixFinder.longestCommonPrefix("car", "care")).toBe("car")
         expect(PrefixFinder.longestCommonPrefix("car", "care", "cat")).toBe("ca")
         expect(PrefixFinder.longestCommonPrefix("car", "dog")).toBe("")
         expect(PrefixFinder.longestCommonPrefix("car")).toBe("car")
      })
   }) 
});