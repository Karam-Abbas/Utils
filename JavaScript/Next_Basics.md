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


