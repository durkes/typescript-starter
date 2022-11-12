// reference the .ts file

function hello(msg, x) {
    while (x-- > 0) {
        console.log(msg);
    }
}
hello('Hello World', 5);
function pow(x, y) {
    return String(Math.pow(x, y));
}
console.log(pow(2, 2));
var font = 'bold';
console.log(font);
var john = {
    first: 'John',
    last: 'Smith',
    id: 123
};
console.log(john);
var vipJohn = {
    first: 'John',
    last: 'Smith',
    id: 123,
    favoriteColor: 'blue',
    car: 'BMW',
    favoriteNumber: 1
};
console.log(vipJohn);
var arr = [];
arr.push(parseInt('1'));
arr.push(2);
var list = [1, 'john', true];
console.log(list);
var list2 = [];
list2.push(1, 'john', true);
function identity(value) {
    return value;
}
var result = identity({ name: 'TypeScript' });
console.log(result);