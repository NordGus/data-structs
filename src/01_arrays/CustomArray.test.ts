import InsertableArray from "./InsertableArray";
import IntersectorArray from "./IntersectorArray";
import MaxArray from "./MaxArray";
import ReversorArray from "./ReversorArray";

describe("CustomArray exercises", () => {
    describe("1- Extend the Array class and add a new method to return the largest number.", () => {
        let array: MaxArray;

        beforeEach(() => array = new MaxArray(5));

        it("should return the largest number contained in the array", () => {
            for (const n of [12, 42, 7, 343]) array.insert(n);
            expect(array.max()).toBe(343);
        });

        it("should return 0 when the array is empty", () => {
            expect(array.max()).toBe(0);
        });
    });

    describe("2- Extend the Array class and add a method to return the common items in this array and another array.", () => {
        let array: IntersectorArray;

        beforeEach(() => {
            array = new IntersectorArray(5);
            for (const n of [12, 42, 7, 343]) array.insert(n);
        });

        it("should return an array of common items between both arrays", () => {
            expect(array.intersect([1, 7, 343])).toEqual([7, 343]);
        });

        it("should return an empty array when there's no common items between both arrays", () => {
            expect(array.intersect([47, 13, 21])).toEqual([]);
        });
    });

    describe("3- Extend the Array class and add a method to reverse the array.", () => {
        let array: ReversorArray;

        beforeEach(() => array = new ReversorArray(5));

        it("should reverse the items in the array", () => {
            for (const n of [12, 42, 7, 343]) array.insert(n);

            array.reverse();
            
            expect(array.toString()).toBe("343, 7, 42, 12");
        });
    });

    describe("4- Extend the Array class and add a new method to insert an item at a given index.", () => {
        let array: InsertableArray;

        beforeEach(() => {
            array = new InsertableArray(5);
            for (const n of [12, 42, 7, 343]) array.insert(n);
        });

        it("should insert the item at the given index, moving the later items", () => {
            array.insertAt(21, 2);
            
            expect(array.toString()).toBe("12, 42, 21, 7, 343");
        });

        it("should insert the item at the given index, filling with 0 the empty positions", () => {
            array.insertAt(21, 7);
            
            expect(array.toString()).toBe("12, 42, 7, 343, 0, 0, 0, 21");
        });

        it("should throw an error when index is negative", () => {
            expect(() => array.insertAt(21, -7)).toThrow("index out of bounds");
        });
    });
});