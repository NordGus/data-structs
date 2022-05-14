import LinkedList from "../shared/SimpleLinkedList";
import QuickSort from "./QuickSort";

class BucketSort {
    private sorter: QuickSort;

    constructor() {
        this.sorter = new QuickSort();
    }

    public sort(input: number[]): number[] {
        if (input.length < 2) return [...input];

        const output = [...input];
        const buckets = this.createBuckets(output);
        let i = 0; // output iteration pointer

        this.sortBuckets(buckets);

        for (const bucket of buckets)
            while (!bucket.isEmpty()) output[i++] = bucket.removeFirst();

        return output;
    }

    private createBuckets(array: number[]): LinkedList<number>[] {
        const buckets = new Array<LinkedList<number>>(Math.floor(array.length / 2))
        
        buckets.fill(new LinkedList<number>());

        for (const item of array)
            buckets[item % buckets.length].addLast(item);

        return buckets;
    }

    private sortBuckets(buckets: LinkedList<number>[]): void {
        for (const bucket of buckets)
            for (const item of this.sorter.sort(bucket.toArray())) {
                bucket.removeFirst();
                bucket.addLast(item);
            }
    }
}

export default BucketSort;