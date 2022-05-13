class InsertionSort {
    public sort(input: number[]): number[] {
        const output = [...input];

        for (let i = 1; i < output.length; i++) {
            const current = output[i];
            let j = i - 1;
            
            while (j >= 0 && output[j] > current) {
                output[j + 1] = output[j];
                j--;
            }

            output[j + 1] = current;
        }

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

export default InsertionSort;