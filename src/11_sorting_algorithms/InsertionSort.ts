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
}

export default InsertionSort;