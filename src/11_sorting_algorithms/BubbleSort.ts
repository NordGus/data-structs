class BubbleSort {
    public sort(input: number[]): number[] {
        const output = [...input];
        let sorted = true;

        for (let i = 0; i < output.length; i++) {
            sorted = true

            for (let j = 1; j < output.length - i; j++) {
                if (output[j] > output[j - 1]) continue;

                this.swap(output, j, j - 1);
                sorted = false
            }

            if (sorted) break;
        }

        return output;
    }

    private swap(array: number[], from: number, to: number): void {
        const temp = array[from];
        array[from] = array[to];
        array[to] = temp;
    }
}

export default BubbleSort;