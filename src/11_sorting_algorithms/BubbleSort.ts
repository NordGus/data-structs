class BubbleSort {
    public sort(input: number[]): number[] {
        const output = [...input];
        let sorted = true;

        for (let i = 0; i < output.length; i++) {
            sorted = true

            for (let j = 1; j < output.length - i; j++) {
                if (output[j] > output[j - 1]) continue;
                
                const temp = output[j];
                output[j] = output[j - 1];
                output[j - 1] = temp;
                sorted = false
            }

            if (sorted) break;
        }

        return output;
    }
}

export default BubbleSort;