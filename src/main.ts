import CustomArray from "./01_arrays/array";

const arr: CustomArray = new CustomArray();

[10, 20, 30, 40, 50, 60].forEach((n: number) => {
  arr.insert(n);
  arr.print();
});

console.log(arr.indexOf(60));

[5, 3, 0].forEach((n: number) => {
  arr.removeAt(n);
  arr.print();
});

console.log(arr.indexOf(60));

try {
  arr.removeAt(10);
} catch (error) {
  console.error(error);
}

console.log(arr.max());

console.log(arr.intersect([1, 5, 10, 50, 10, 42, 20]));

arr.print();
arr.reverse();
arr.print();
arr.reverse();
arr.print();

arr.insertAt(42, 1);
arr.print();

arr.insertAt(99, 10);
arr.print();
