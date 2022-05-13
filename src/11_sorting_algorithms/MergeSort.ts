class MergeSort {
    public sort(input: number[]): number[] {
        const output = [...input];
        
        this._sort(output);

        return output;
    }

    private _sort(input: number[]): void {
        if (input.length <= 1) return;

        const middle = Math.floor(input.length / 2);

        const left = new Array(middle);
        for (let i = 0; i < middle; i++) left[i] = input[i];
        
        const right = new Array(input.length - middle);
        for (let i = middle; i < input.length; i++) right[i - middle] = input[i];

        this._sort(left);
        this._sort(right);

        this.merge(left, right, input);
    }

    private merge(left: number[], right: number[], result: number[]): void {
        let i = 0 // left array iteratorion pointer
        let j = 0 // right array iteratorion pointer
        let k = 0 // result array iteratorion pointer

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) result[k++] = left[i++];
            else result[k++] = right[j++];
        }

        while (i < left.length) result[k++] = left[i++];
        while (j < right.length) result[k++] = right[j++];
    }
}

export default MergeSort;