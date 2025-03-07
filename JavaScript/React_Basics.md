# React Hooks
Pieces of code that help usa achieve dynamic rendering in react.
## 1. useState( )
One can say advance form of variables.
```javascript
const [state, setState] = useState(<initial_value>);
```
### Why not use a simple variable instead of this?
- A simple variable will reset after every render while state will not and retain its value.
- When a variable changes it can be seen updating in the console.log( ) but it doesn't change the UI because it doesn't causes a rerender, while whenever a state changes the UI gets rerendered.

## 2. useEffect( )
Once render happens then useEffect runs the lines inside it in affect of that change which caused the rerender.
```javascript
useEffect(()=>{
    // line of code that will be run by useEffect
},[<dependencies>]);
```
### 2.1 Important point to note:
- useEffect will run at least one time no matter what, you render first time it will run or rerender happens still it will run, 
- But how many times it will run can be controlled by using the second parameter of useEffect which is the dependency array
### 2.2 Types of Usage
There are 3 major ways how you can use useEffect.
```javascript
// Type 1
 useEffect(()=>{console.log("hi!")});
```
- This will run every time a render occurs due to state change or whatever reason.
- Note that there is no dependency array only a callback.

```javascript
// Type 2
 useEffect(()=>{console.log("hi!")},[]);
```
- This will run only one time when the initial render will happen.
  
```javascript
// Type 3
 export function App() {
  let [count,setCount] = useState(0);
   useEffect(() => {
    console.log(`The page has been updated! Count is:${count}`);
  },[count]);

  return (
    <div>
    {a}
      <p>Count: {count}</p>
      <button onClick={()=>setCount(count + 1)}>Increase</button>
    </div>
  );
}
```
- This will run (every time count changes +1)
- 1 for the initial render which will show the button and the rest, will be rerenders when button click will change the state and useEffect will run.

![alt text](image.png)

## useContext
To make states,variables or callbacks become global, we use this hook. In order to avoid prop drilling (passing the prop from parent to granchild node like the below example)
```javascript
function App() {
  const user = "Karam";
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <p>Hello, {user}!</p>;
}
// and this become annoying after some time 
```
**Solution**
- Make them global so that all the childs can access it
- But making global variables is a bad programming practice !
- It is global but to a limited extent means available to limited components. Let me explain what gibberish, I am talking about.
  
**Syntax**
```javascript
import React, { useState, useContext, createContext } from "react";

// 1️⃣ Create a Context
const UserContext = createContext(); // Your Global Bank to store props

function App() {
  const [fname, setFname] = useState("Karam");
  const [lname, setLname] = useState("Abbas");
  return (
    // 2️⃣ Provide the Context value to all children
    <UserContext.Provider value={{fname,lname}}>
      <Parent />
    </UserContext.Provider>
    //Puts limit on who can access the context(the global bank)
    // And the value prop accepts an object which contains the props you want to make global
    // For one thing         value = {state}
    // For multiple things   value = {{state1,state2}}
  );
}

function Parent() {
  return <Child />;
}

function Child() {
  // 3️⃣ Use the Context value directly
  const user = useContext(UserContext);
  return <p>Hello, {user}!</p>;
  //This is how child can access the props we just made global.
}

export default App;
```

**Important Concept**
State Uplifting is simple, declaring the states in the parent component and then passing it down to child by means of props.




# Complete the remaining of the hooks.......



# Quick Summary

![alt text](image-1.png)