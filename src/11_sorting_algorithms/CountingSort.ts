class CountingSort {
    public sort(input: number[], max: number): number[] {
        if (input.length < 2) return [...input];
        
        const output = [...input];
        const counts = new Array<number>(max + 1).fill(0);
        let k = 0;

        for (const item of output) counts[item]++;
        
        for (let i = 0; i < counts.length; i++)
            for (let j = 0; j < counts[i]; j++) output[k++] = i;

        return output;
    }
}

export default CountingSort;