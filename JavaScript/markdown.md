# Basics, Arrays, Functions

## 1. Strict Mode

```javascript
"use strict";
```

**Explanation:** Enforces stricter parsing and error handling in JavaScript.

## 2. Function Definition and Execution

```javascript
function sayHi()
{
    console.log("Say Hello to people");
}
sayHi();
```

**Output:**

```
Say Hello to people
```

**Explanation:** Defines and calls the function `sayHi` which prints a message.

## 3. String Concatenation

```javascript
console.log("hi" + "hello");
```

**Output:**

```
hihello
```

**Explanation:** Uses the `+` operator to concatenate two strings.

## 4. Variable Scope

let, const are the modern js variables and are locally scoped
var is a old js variable and is globally scoped.

```javascript
let h = null;
h = 3;
{
    const s = 3;
    let g = 4;
    h = 8;
    var a = 10;
}
console.log(s):
console.log(g);
console.log(h);
console.log(a);
```
**Output:**

```
undefined
undefined
8
10
```


**Error:** `g` , `s` are not defined outside the block.

## 5. Template Literals

```javascript
console.log(`2+2 is: ${2+2}`);
const x = 4;
const y = 9;
console.log(`${x} plus ${y} is ${x+y}`);
```

**Output:**

```
2+2 is: 4
4 plus 9 is 13
```

## 6. Type Conversion

```javascript
console.log("2 + 2 is: " + ( 2 + 2 ));
console.log("2 + 2 is: " + 2 + 2);
```

**Output:**

```
2 + 2 is: 4
2 + 2 is: 22
```

**Explanation:** Converts the string "9" to a number.

## 7. User Input (Node.js)
For IDE, first install the npm package prompt-sync using the below command on the terminal
```bash
npm install prompt-sync
```
now the below code will work in IDE
```javascript
const ps = require("prompt-sync");
const prompt = ps();
const input = Number(prompt("Enter a number"));
console.log(input);
console.log(typeof(input));
```
For browser the below code will work just fine
```javascript
const input = Number(prompt("Enter a number: "));
console.log(input);
console.log(typeof(input));
```

**Output (Example Input: 5):**

```
5
number
```

**Explanation:** Uses `prompt-sync` to take user input and converts it to a number.

## 8. Boolean Conversion
Fun Fact!
```javascript
console.log(Boolean(""));
console.log(Boolean(" "));
console.log(Number(Boolean("")));
console.log(Number(Boolean(" ")));
```

**Output:**

```
false
true
0
1
```

**Explanation:** Empty strings are falsy.

## 9. Loose Equality

```javascript
console.log("0" == 0);
```

**Output:**

```
true
```

**Explanation:** JavaScript performs type conversion when using `==`.Incase of comparison with `Number` all the datatypes will be converted into `Number` and then comparison will take place.

But incase of concatination the if there is a `String` then everything will be converted into `String` and concatinated with it.

## 10. Scientific Notation

```javascript
console.log(3.1e-3);
let value = 3.1 * (10**-3);
console.log(value.toFixed(4));
```

**Output:**

```
0.0031
0.0031
```

## 11. Infinity

```javascript
console.log(2/0);
```

**Output:**

```
Infinity
```

## 12. Nullish Coalescing Assignment

```javascript
let a = 11;
let b = 9;
a ??= b;
console.log(a);
a = null;
a ??= b;
console.log(a);
```

**Output:**

```
11
9
```
**Explanation:** If `a` is `null` or `undefined`, then the value of `b` will be stored in `a` but if there is some value in `a` say `0,'a'` or anything like that then `a` will be retain its value.


## 13. Arrow Functions

```javascript
let assign1 = name => "Say " + name;
console.log(assign1("Hira"));
```

**Output:**

```
Say Hira
```

## 14. Arrow Function Sum

```javascript
let sum = (x,y) => x + y;
console.log(sum(2,3));

let sum = (x,y) => y;
console.log(sum(2));

let sum = (x,y) => x;
console.log(sum(2));

```

**Output:**

```
5
undefined
2
```

## 15. Arrays and Loops

```javascript
const movies = [
    "Zootopia",
    "The legend of maula jutt",
    "top gun maverick"
];
for (let m of movies)
{
    console.log(m);
}
```

**Output:**

```
Zootopia
The legend of maula jutt
top gun maverick
```

## 16. Modifying Arrays

```javascript
movies.unshift("New Jersey");
console.log(movies);
movies.splice(0,2);
console.log(movies);
```

**Output:**

```
[ 'New Jersey', 'Zootopia', 'The legend of maula jutt', 'top gun maverick' ]
[ 'The legend of maula jutt', 'top gun maverick' ]
```
**Explanation:** `unshift` adds the element at position 0 in the array.
`Splice(start index, number of elements to remove)`, this method will remove the elements from the array and return them and the rest will be remain in the original array. 
## 17. forEach Method

```javascript
movies.forEach(function (name, index) {
    console.log("For Each Method at index " + index + " is: " + name);
});
```

**Output:**

```
For Each Method at index 0 is: The legend of maula jutt
For Each Method at index 1 is: top gun maverick
```

## 18. Random Numbers and Looping

```javascript
let a = Math.floor(Math.random());
while (a !== 10) {
    console.log(++a);
}
console.log(a);
```
**Output:**
```
1
2
3
4
5
6
7
8
9
10
10
```

**Explanation:** `Math.random()`return random values within range 0.0-1.0 `Math.floor()` takes the floor of this float value which always comes 0.
++a increment before use
a++ increment after use

---

# Array methods & Strings

## Strings in JavaScript

### String Properties & Methods

#### 1. `.length` Property
```javascript
console.log("Aliya".length); // Output: 5
```
- The `.length` property returns the number of characters in the string.

#### 2. `.toUpperCase()` Method
```javascript
console.log("HiraButt".toUpperCase()); // Output: "HIRABUTT"
```
- Converts all characters in the string to uppercase.

#### 3. String Comparison
```javascript
const word = "koala";
console.log(word === "koala");    // Output: true
console.log(word === "kangaroo"); // Output: false
console.log("Hira".toLowerCase() === "hira"); // Output: true
```
- Compares two strings for equality (case-sensitive unless `.toLowerCase()` is used).

#### 4. Iterating Over a String
Using `for...of` loop:
```javascript
const namee = "sarah";
for (let character of namee) {
    console.log(character);
}
```
**Output:**
```
s
a
r
a
h
```

Using `Array.from()`:
```javascript
const namearr = Array.from(namee);
console.log(namearr);
namearr.forEach(m => console.log(m));
```
**Output:**
```
['s','a','r','a','h']
s
a
r
a
h
```

#### 5. Splitting a String into an Array
```javascript
const list = "mon,tues,wed,";
const listarr = list.split(",");
console.log(listarr.length);
console.log(listarr); 
listarr.forEach(l => console.log(l));
```
**Output:**
```
4
["mon","tues","wed",""]
mon
tues
wed
           //last character
```
(Note: There is an empty string in the array due to the comma after `wed`.)

## Array Methods

### 1. `.find()` Method
```javascript
const arrOfobjs = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
const found = arrOfobjs.find(function (item) {
    return item.id === 'b';
});
console.log(found);
```
**Output:**
```javascript
{ id: 'b' }
```
- `.find()` returns the first object that matches the condition (id === 'b').

### 2. `.some()` Method
```javascript
const anyNegative = [12, -2, 45].some((item) => item < 0);
console.log(anyNegative);
```
**Output:**
```javascript
true
```
- `.some()` checks if at least one element meets the condition (`item < 0`).

### 3. `.filter()` Method
```javascript
const student = [
    { name: 'Ayush', grade: 90 },
    { name: 'Hira', grade: 50 },
    { name: 'Ahmad', grade: 80 }
];
const filteredStudent = student.filter(item => item.grade > 70);
console.log(filteredStudent);
```
**Output:**
```javascript
[ { name: 'Ayush', grade: 90 }, { name: 'Ahmad', grade: 80 } ]
```
- `.filter()` returns an array containing elements that satisfy the condition (`grade > 70`).

### 4. `.map()` Method
```javascript
const squared = [2, 3, 4].map(item => item ** 2);
console.log(squared);
```
**Output:**
```javascript
[4, 9, 16]
```
- `.map()` applies a function to each element and returns a new array containing the results obtained from applying the function to each element.

### 5. `.reduce()` Method
```javascript
const animals=['dog','cat','dog','cow','cow'];
const animalcount=animals.reduce(function(accumulator, element) {
    if (accumulator[element] === undefined) {
        accumulator[element] = 1;
    } else {
        accumulator[element]++;
    }
    return accumulator;
}, {});
console.log(animalcount);
```
**Output:**
```javascript
{ dog: 2, cat: 1, cow: 2 }
```
- `.reduce()` iterates through the array, counting occurrences of each element.

### 6. Using a `for...of` loop:
The `for...of` loop iterates over **values** of an iterable (arrays, strings etc).
```javascript
const animals=['dog','cat','dog','cow','cow'];
var obj2 = {};
console.log(obj2);
for (x of animals) {
    if (obj2[x] > 0) {
        obj2[x]++;
    } else {
        obj2[x] = 1;
    }
    console.log(obj2);
}
```
**Output:**
```javascript
{ dog: 1 }
{ dog: 1, cat: 1 }
{ dog: 2, cat: 1 }
{ dog: 2, cat: 1, cow: 1 }
{ dog: 2, cat: 1, cow: 2 }
```


## 7. The `for...in` Loop
The `for...in` loop iterates over the **keys (property names)** of an object.

**Example:** 
```javascript
const student = {
    name: "Ali",
    age: 20,
    grade: "A"
};

for (let key in student) {
    console.log(key + ": " + student[key]);
}
```
**Output:**
```
name: Ali
age: 20
grade: A
```

## Key Differences
| Loop Type  | Iterates Over | Best For |
|------------|--------------|----------|
| `for...in` | Object keys (enumerable properties) | Objects |
| `for...of` | Values of an iterable (arrays, strings) | Arrays and iterable structures |

---
# Spread, Rest and Destructuring 

## 1. Spread Operator (`...`)
Expands arrays/objects into individual elements.

### Example
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2];
console.log(merged);
```
**Output:**
```
[1, 2, 3, 4]
```


## 2. Rest Parameter (`...`)
Collects multiple arguments into an array. Also used for destructuring.

### Example
```javascript
function display(...nums) {
    console.log(nums);
}
display(1, 2, 3, 4);

const a = [1,2,3,4];
const [b,c,...rest] = a
console.log(b)
console.log(c)
console.log(rest)
```
**Output:**
```
10
1
2
[3,4]
```

## 3. Destructuring
Extracts values from arrays or objects into variables.

### Example
```javascript
const user = { name: "Ali", age: 25 };
const { name, age } = user;
console.log(name);
console.log(age);

const a = [1,2,3,4];
const [b,c,...rest] = a
console.log(b)
console.log(c)
console.log(rest)
```
**Output:**
```
Ali 
25
1
2
[3,4]
```
---
# Imperative vs Declarative Coding

## 1. Imperative Coding
- **Defines how** to achieve a task step-by-step.
- Uses loops(for,for...of,for...in), conditions, and assignments.
- More control but verbose.
- Focuses on fine grain control.

### Example (Imperative - Using `for` loop)
```javascript
const numbers = [1, 2, 3, 4, 5];
const squared = [];

for (let i of numbers) {
    squared.push(i**2);
}

console.log(squared); // [1, 4, 9, 16, 25]
```

## 2. Declarative Coding
- **Defines what** to achieve without step-by-step instructions.
- Uses built-in methods (e.g., `map`, `filter`).
- More readable and concise.
- Focuses on functionality.
  
### Example (Declarative - Using `map()`)
```javascript
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(num => num * num);

console.log(squared); // [1, 4, 9, 16, 25]
```

## 🔍 Key Differences
| Aspect         | Imperative | Declarative |
|---------------|-----------|-------------|
| **Definition** | How to do it | What to do |
| **Control**    | Manual (loops, variables) | Abstracted (built-in methods) |
| **Readability** | More detailed | More concise |
| **Examples**  | `for`, `while`, `if-else` | `map`, `filter`, `reduce`|

✅ **Best practice**: Prefer **declarative style** for cleaner, maintainable code!

