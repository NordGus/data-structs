class SelectionSort {
    public sort(input: number[]): number[] {
        const output = [...input];
        
        for (let i = 0; i < output.length; i++)
            this.swap(output, i, this.findMinIndex(output, i)); 

        return output;
    }

    private swap(array: number[], from: number, to: number): void {
        const temp = array[from];
        array[from] = array[to];
        array[to] = temp;
    }

    private findMinIndex(array: number[], from: number): number {
        let minIndex = from;

        for (let i = from; i < array.length; i++)
            if (array[i] < array[minIndex])
                minIndex = i;

        return minIndex
    }
}

export default SelectionSort;