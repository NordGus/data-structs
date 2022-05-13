class BubbleSort {
    public sort(input: number[]): number[] {
        const output = [...input];

        for (let i = 0; i < output.length; i++) {
            for (let j = 1; j < output.length; j++) {
                if (output[j] > output[j - 1]) continue;
                
                const temp = output[j];
                output[j] = output[j - 1];
                output[j - 1] = temp;
            }
        }

        return output;
    }
}

export default BubbleSort;