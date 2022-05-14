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

    public ternarySearch(input: number[], target: number): number {
        return this._ternarySearch(input, 0, input.length - 1, target);
    }

    private _ternarySearch(array: number[], left: number, rigth: number, target: number): number {
        if (rigth < left) return -1;

        const partitionSize = Math.floor((rigth - left) / 3);
        const middle1 = left + partitionSize;
        const middle2 = rigth - partitionSize;
        const mid1 = array[middle1];
        const mid2 = array[middle2];

        if (target === mid1) return middle1;
        if (target === mid2) return middle2;
        
        if (target > mid2) return this._ternarySearch(array, middle2 + 1, rigth, target);
        if (target < mid1) return this._ternarySearch(array, left, middle1 - 1, target);
        
        return this._ternarySearch(array, middle1 + 1, middle2 - 1, target);
    }

    public jumpSearch(input: number[], target: number): number {
        const blockSize = Math.floor(Math.sqrt(input.length));
        let start = 0;
        let next = blockSize;
        
        while (start < input.length && input[next - 1] < target) {
            start = next
            next += blockSize;
            
            if (next > input.length) next = input.length;
        }

        for (let i = start; i < next; i++) if (input[i] === target) return i;

        return -1;
    }

    public exponentialSearch(input: number[], target: number): number {
        let boundry = 1;

        while (boundry < input.length && input[boundry] < target) boundry += boundry;
        
        return this._binarySearchRec(input, Math.floor(boundry / 2), Math.min(boundry, input.length - 1), target);
    }
}

export default Search;