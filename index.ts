// typescript deep dive book
// https://github.com/basarat/typescript-book

// ESLint for TypeScript in VS Code setup
// https://thesoreon.com/blog/how-to-set-up-eslint-with-typescript-in-vs-code

// compile from CLI: tsc index
// run directly CLI: ts-node index


function hello(msg: string, x: number): void {
    while (x-- > 0) {
        console.log(msg);
    }
}

hello('Hello World', 5);


// specify return value (instead of void above)
function pow(x: number, y: number): string {
    return String(Math.pow(x, y));
}

console.log(pow(2, 2));


// custom type
type Style = 'bold' | 'italic';
let font: Style = 'bold';

console.log(font);


// define object
interface Employee {
    first: string,
    last: string,
    id: number
}

const john: Employee = {
    first: 'John',
    last: 'Smith',
    id: 123
};

console.log(john);


// define object with flexibility for custom keys
interface VIP {
    first: string,
    last: string,
    id: number,
    [key: string]: any
}

const vipJohn: VIP = {
    first: 'John',
    last: 'Smith',
    id: 123,
    favoriteColor: 'blue',
    car: 'BMW',
    favoriteNumber: 1
};

console.log(vipJohn);


// strict arrays
const arr: number[] = [];
arr.push(parseInt('1'));
arr.push(2);


// tuples
type MyList = [number, string, boolean];
const list: MyList = [1, 'john', true];
console.log(list);

// ? makes them optional, useful for empty array init
type MyList2 = [number?, string?, boolean?];
const list2: MyList2 = [];
list2.push(1, 'john', true);


// generics (variable type)
type ProgrammingLanguage = {
    name: string;
};

function identity<T>(value: T): T {
    return value;
}

const result = identity<ProgrammingLanguage>({ name: 'TypeScript' });
console.log(result);