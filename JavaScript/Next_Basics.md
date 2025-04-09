# NEXT.js Notes
But some important things first.
## Axios
We use axios to make requests to an API, it can be either get,post,put,update or delete request.
generally we use get and post the most.
```javascript
// GET Request
// When you need to fetch some data
const func = async()=>{
    await axios.get('www.url.com/api').then((response)=>{
        console.log(response);
    })
} 
func()

// POST Request
// when you need to save the data at server
const user = {
    name: "karam",
    id:6008
}
const func = async()=>{
    await axios.post('www.url.com/api',user).then((response)=>{
        console.log(response);
    })
} 
func()
// Now in the backend i will 
// receive the user object as in 
// request.data and i can then 
// store it in the DB.
```
This function will make a get and post request at 'www.url.com/api' and the response received from it will be logged on the console.

## Fun Example to try
Place the below code in the index.js of the pages directory in the next app. And try to understand what is happening, its fairly simple
```javascript
import React, { useState } from "react";
import axios from "axios";
export default function Home() {
  const [posts, setPosts] = useState([]);
  axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
    setPosts(response.data.splice(0, 4));
  });
  return (
    <>
      {posts.map((post, index) => {
        return (
          <div
            style={{ margin:"20px"}} // just for better readability
          >
            <div>id:{post.id}</div>
            <div>userId:{post.userId}</div>
            <div>title:{post.title}</div>
            <div>body:{post.body}</div>
          </div>
        );
      })}
    </>
  );
}
```
## Routing in NEXT

### Dynamic Routes
The type in which the url is not hard coded like in the below example '/products/' is the static part while all the other part is dynamic as it can handle anything we throw at it via URL.

### Basic Structure
```
pages/
  ├── products/
  │   └── [id]/
  │       └── [name]/
  │           └── [...slug]/
  │               └── index.js
```

### Concepts Used

1. **Dynamic Route Segments**
   - `[id]` - Single dynamic segment
   - `[name]` - Nested dynamic segment
   - `[...slug]` - Catch-all routes (can capture multiple segments)

2. **Router Object**
   ```javascript
   const router = useRouter()
   ```
   Used to access:
   - Query parameters
   - Route information
   - Navigation methods

3. **Query Parameters**
   ```javascript
   const obj = router.query
   ```
Returns an object containing the key value pairs of all the data we passed via URL for instance if the entered URL is: /products/1/laptop/detail/specs/price
then react.query will return the following object.
```javascript
{
    id : 1,
    name : 'Karam',
    slug : ['detail', 'spec','price']
}
```

## Custom Pages for different error codes

Just make a folder of that code in the pages directory make an index file in it, customize it and it will automatically now navigate to it like :

```
pages/
  ├── products/
  │   └── [id]/
  │       └── [name]/
  │           └── [...slug]/
  │               └── index.js
  ├── 404/
  |   └── index.js 
```

the wrong URL whose page won't exist will render the new our created 404 page.

## Navigation with LINK component
Links are used to render a specific component by changing the URL.

```javascript
<Link href="/product/1">Link</Link>
```
when you will click on this, it will render the product page on the main page by changing the url, which than handles the rerender itself.

### Some Complex use Case Example:

```javascript
const arr = ["marry", "ana"];
return (
  <>
    <div>This is the Admin page!</div>
    {arr.map((person, index) => (
      <Link key={index} href={'/admin/' + person}>{person}</Link>
    ))}
  </>
)
```

This will redirect it to the dynamic links i had created, with dynamic routes, so it will handle it smoothly.

## Navigating Programmatically
The main difference between these 2 is that this is 
imperative (Fine grain control) approach and LINK is the Declarative (better readability) approach functioning of both are same.

```javascript
import { useRouter } from 'next/router'
import React from 'react'

const index = () => {
    const router = useRouter();
    const click=()=>{
        router.push("/test");
    }
  return (
    <>
    <div>so you are {router.query.id}</div>
    <button onClick={click}>Back</button>
    </>
  )
}

export default index
```
onClick it will redirect to the test page and that's it.
While LINK can always be a button, the router.push() technique can be used on any event to redirect either on completion of something or anything while on the other hand you have to click in the LINK to make it work.