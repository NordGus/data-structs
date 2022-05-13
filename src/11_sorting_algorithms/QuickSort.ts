class QuickSort {
    public sort(input: number[]): number[] {
        const output = [...input];
        
        this._sort(output, 0, output.length - 1);

        return output;
    }

    private partition(array: number[], start: number, end: number): number {
        let pivot = array[end];
        var boundry = start - 1;
        for (let i = start; i <= end; i++)
            if (array[i] <= pivot)
                this.swap(array, i, ++boundry); 

        return boundry;
    }

    private _sort(input: number[], start: number, end: number): void {
        if (start >= end) return;

        const boundry = this.partition(input, start, end);
        this._sort(input, start, boundry - 1);
        this._sort(input, boundry + 1, end);
    }

    private swap(array: number[], from: number, to: number): void {
        const temp = array[from];
        array[from] = array[to];
        array[to] = temp;
    }
}

export default QuickSort;