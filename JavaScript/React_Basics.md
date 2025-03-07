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

## 