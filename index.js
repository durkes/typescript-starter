"use strict";
// typescript deep dive book
// https://github.com/basarat/typescript-book
// ESLint for TypeScript in VS Code setup
// https://thesoreon.com/blog/how-to-set-up-eslint-with-typescript-in-vs-code
// compile from CLI: tsc index
// run directly CLI: ts-node index
(function () {
    function hello(msg, x) {
        while (x-- > 0) {
            console.log(msg);
        }
    }
    hello('Hello World', 5);
})();
// specify return value (instead of void above)
(function () {
    function pow(x, y) {
        return String(Math.pow(x, y));
    }
    console.log(pow(2, 2));
})();
// custom type
(function () {
    const font = 'bold';
    console.log(font);
})();
// define object
(function () {
    const john = {
        first: 'John',
        last: 'Smith',
        id: 123
    };
    console.log(john);
})();
// define object with flexibility for custom keys
(function () {
    const vipJohn = {
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
    const arr = [];
    arr.push(parseInt('1'));
    arr.push(2);
})();
// tuples
(function () {
    const list = [1, 'john', true];
    console.log(list);
})();
// ? makes them optional, useful for empty array init
(function () {
    const list = [];
    list.push(1, 'john', true);
})();
// generics (variable type)
(function () {
    function identity(value) {
        return value;
    }
    const result = identity({ name: 'TypeScript' });
    console.log(result);
})();
// generic interfaces
(function () {
    const contactForm = {
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
    function logItems(items) {
        items.forEach(item => item.log());
    }
    function getFieldValue(form, fieldName) {
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
        emailAddress;
        constructor(emailAddress) {
            this.emailAddress = emailAddress;
        }
    }
    class Person extends Contact {
        firstName;
        surname;
        constructor(firstName, surname, emailAddress) {
            super(emailAddress);
            this.firstName = firstName;
            this.surname = surname;
        }
    }
    class Organisation extends Contact {
        name;
        constructor(name, emailAddress) {
            super(emailAddress);
            this.name = name;
        }
    }
    function sayHello(contact) {
        if (contact instanceof Person) {
            console.log('Hello ' + contact.firstName);
        }
        else if (contact instanceof Organisation) {
            console.log('Hello ' + contact.name);
        }
    }
    const bob = new Person('Bob', 'Young', 'bob.young@somewhere.com');
    const redBricks = new Organisation('Red Bricks', 'info.redbricks@somewhere.com');
    sayHello(bob);
    sayHello(redBricks);
})();
// user-defined type guard with a type predicate
(function () {
    function isPerson(contact) {
        return contact.firstName !== undefined;
    }
    function isOrganisation(contact) {
        return contact.name !== undefined;
    }
    function sayHello(contact) {
        if (isPerson(contact)) {
            console.log('Hello ' + contact.firstName);
        }
        else if (isOrganisation(contact)) {
            console.log('Hello ' + contact.name);
        }
    }
    const bob = {
        firstName: 'Bob',
        surname: 'Young'
    };
    const redBricks = {
        name: 'Red Bricks'
    };
    sayHello(bob);
    sayHello(redBricks);
})();
// mapped types
(function () {
    const contactForm = {
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
})();
// utility types
(function () {
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
    };
})();
// deepFreeze utility function
// makes objects immutable at compile and runtime
(function () {
    function deepFreeze(obj) {
        const propNames = Object.getOwnPropertyNames(obj);
        for (const name of propNames) {
            const value = obj[name];
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
    });
})();
// deepImmutable utility type
// combined w/ deepFreeze utility function above
(function () {
    function deepFreeze(obj) {
        const propNames = Object.getOwnPropertyNames(obj);
        for (const name of propNames) {
            const value = obj[name];
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
    });
})();
