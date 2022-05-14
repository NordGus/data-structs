import QuickSort from "../11_sorting_algorithms/QuickSort";

class Search {
    public linearSearch(input: number[], target: number): number {
        for (let i = 0; i < input.length; i++) {
            if (input[i] === target) return i;
        }

        return -1;
    }

    public binarySearchRec(input: number[], target: number): number {
        return this._binarySearchRec(input, 0, input.length - 1, target);
    }

    private _binarySearchRec(array: number[], left: number, rigth: number, target: number): number {
        if (rigth < left) return -1;

        const middle = Math.floor((rigth + left) / 2);

        if (array[middle] === target) return middle;
        if (array[middle] >= target) return this._binarySearchRec(array, left, middle - 1, target);
        return this._binarySearchRec(array, middle + 1, rigth, target);
    }

    public binarySearch(input: number[], target: number): number {
        let left = 0;
        let rigth = input.length - 1;
        
        while (rigth >= left) {
            const middle = Math.floor((rigth + left) / 2);

            if (input[middle] === target) return middle;
            if (input[middle] >= target) rigth = middle - 1;
            else left = middle + 1;
        }

        return -1
    }
}

export default Search;