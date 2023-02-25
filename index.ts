// typescript deep dive book
// https://github.com/basarat/typescript-book

// ESLint for TypeScript in VS Code setup
// https://thesoreon.com/blog/how-to-set-up-eslint-with-typescript-in-vs-code

// compile from CLI: tsc index
// run directly CLI: ts-node index

(function () {
    function hello(msg: string, x: number): void {
        while (x-- > 0) {
            console.log(msg);
        }
    }

    hello('Hello World', 5);
})();


// specify return value (instead of void above)
(function () {
    function pow(x: number, y: number): string {
        return String(Math.pow(x, y));
    }

    console.log(pow(2, 2));
})();


// custom type
(function () {
    type Style = 'bold' | 'italic';
    const font: Style = 'bold';

    console.log(font);
})();


// define object
(function () {
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
})();


// define object with flexibility for custom keys
(function () {
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
})();


// strict arrays
(function () {
    const arr: number[] = [];
    arr.push(parseInt('1'));
    arr.push(2);
})();


// tuples
(function () {
    type MyList = [number, string, boolean];
    const list: MyList = [1, 'john', true];
    console.log(list);
})();


// ? makes them optional, useful for empty array init
(function () {
    type MyList = [number?, string?, boolean?];
    const list: MyList = [];
    list.push(1, 'john', true);
})();


// generics (variable type)
(function () {
    type ProgrammingLanguage = {
        name: string;
    };

    function identity<T>(value: T): T {
        return value;
    }

    const result = identity<ProgrammingLanguage>({ name: 'TypeScript' });
    console.log(result);
})();


// generic interfaces
(function () {
    interface Form<T> {
        errors: {
            [K in keyof T]?: string;
        };
        values: T;
    }
    // same, but as type
    // type Form<T> = {
    //     errors: { [K in keyof T]?: string };
    //     values: T;
    // };

    interface Contact {
        name: string;
        email: string;
    }

    const contactForm: Form<Contact> = {
        errors: {
            email: 'This must be a valid email address'
        },
        values: {
            name: 'Bob',
            email: 'bob@someemail.com',
        },
    };

    console.log(contactForm);
})();


// generic parameter constraints
(function () {
    interface Logable {
        log: () => void;
    }
    function logItems<T extends Logable>(items: T[]): void {
        items.forEach(item => item.log());
    }

    interface Form<T> {
        values: T;
    }
    function getFieldValue<T, K extends keyof T>(
        form: Form<T>, fieldName: K) {
        return form.values[fieldName];
    }

    const contactForm = {
        values: {
            name: 'Bob',
            email: 'bob@someemail.com',
            phone: 8005551212
        },
    };
    console.log(getFieldValue(contactForm, 'name'));
    console.log(getFieldValue(contactForm, 'phone'));
})();


// class w/ instanceof type guard
(function () {
    class Contact {
        constructor(public emailAddress: string) { }
    }
    class Person extends Contact {
        constructor(
            public firstName: string,
            public surname: string,
            emailAddress: string
        ) {
            super(emailAddress);
        }
    }
    class Organisation extends Contact {
        constructor(public name: string, emailAddress: string) {
            super(emailAddress);
        }
    }

    function sayHello(contact: Contact) {
        if (contact instanceof Person) {
            console.log('Hello ' + contact.firstName);
        }
        else if (contact instanceof Organisation) {
            console.log('Hello ' + contact.name);
        }
    }

    const bob = new Person('Bob', 'Young', 'bob.young@somewhere.com');
    const redBricks = new Organisation(
        'Red Bricks',
        'info.redbricks@somewhere.com'
    );

    sayHello(bob);
    sayHello(redBricks);
})();


// user-defined type guard with a type predicate
(function () {
    interface Person {
        firstName: string;
        surname: string;
    }
    interface Organisation {
        name: string;
    }
    type Contact = Person | Organisation;

    function isPerson(contact: Contact): contact is Person {
        return (contact as Person).firstName !== undefined;
    }

    function isOrganisation(contact: Contact): contact is Organisation {
        return (contact as Organisation).name !== undefined;
    }

    function sayHello(contact: Contact) {
        if (isPerson(contact)) {
            console.log('Hello ' + contact.firstName);
        }
        else if (isOrganisation(contact)) {
            console.log('Hello ' + contact.name);
        }
    }

    const bob: Person = {
        firstName: 'Bob',
        surname: 'Young'
    };

    const redBricks: Organisation = {
        name: 'Red Bricks'
    };

    sayHello(bob);
    sayHello(redBricks);
})();


// mapped types
(function () {
    interface Form<T> {
        values: T;
        errors: { [K in keyof T]?: T[K] };
    }

    const contactForm: Form<{ name: string; email: string }> = {
        values: {
            name: 'Bob',
            email: 'bob@someemail.com'
        },
        errors: {
            email: 'Invalid email address'
        }
    };
    console.log(contactForm);
})();


// conditional types
(function () {
    type Animal = {
        name: string;
        legs: number
    }
    type Check = Animal extends { name: string } ? 'yes' : 'no'; // yes
})();


// utility types
(function () {
    type NullableProps<T> = {
        [P in keyof T]: null extends T[P] ? P : never
    }[keyof T];
    // check whether type contains null: null extends T[P]
    // if true, return prop name, which is P
    // if false, return never to remove this from the constructed type
})();


// const assertion
(function () {
    const bill = {
        name: 'Bill',
        profile: {
            level: 1,
        },
        scores: [90, 65, 80],
    } as const;

    // above is same as
    type bill = {
        readonly name: 'Bill';
        readonly profile: {
            readonly level: 1;
        };
        readonly scores: readonly [90, 65, 80];
    }
})();


// deepFreeze utility function
// makes objects immutable at compile and runtime
(function () {
    function deepFreeze<T>(obj: T) {
        const propNames = Object.getOwnPropertyNames(obj);
        for (const name of propNames) {
            const value = (obj as any)[name];
            if (value && typeof value === 'object') {
                deepFreeze(value);
            }
        }
        return Object.freeze(obj);
    }

    const bill = deepFreeze({
        name: 'Bill',
        profile: {
            level: 1,
        },
        scores: [90, 65, 80],
    } as const);
})();


// deepImmutable utility type
// combined w/ deepFreeze utility function above
(function () {
    function deepFreeze<T>(obj: T) {
        const propNames = Object.getOwnPropertyNames(obj);
        for (const name of propNames) {
            const value = (obj as any)[name];
            if (value && typeof value === 'object') {
                deepFreeze(value);
            }
        }
        return Object.freeze(obj);
    }

    type Immutable<T> = {
        readonly [K in keyof T]: Immutable<T[K]>;
    };

    type Person = {
        name: string;
        profile: {
            level: number;
        };
        scores: number[];
    };

    const bill: Immutable<Person> = deepFreeze({
        name: 'Bill',
        profile: {
            level: 1,
        },
        scores: [90, 65, 80],
    });
})();