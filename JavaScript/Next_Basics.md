# NEXT.js Notes

But some important things first.

## Axios

We use axios to make requests to an API, it can be either get,post,put,update or delete request.
generally we use get and post the most.

```javascript
// GET Request
// When you need to fetch some data
const func = async () => {
  await axios.get("www.url.com/api").then((response) => {
    console.log(response);
  });
};
func();

// POST Request
// when you need to save the data at server
const user = {
  name: "karam",
  id: 6008,
};
const func = async () => {
  await axios.post("www.url.com/api", user).then((response) => {
    console.log(response);
  });
};
func();
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
            style={{ margin: "20px" }} // just for better readability
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
   const router = useRouter();
   ```

   Used to access:

   - Query parameters
   - Route information
   - Navigation methods

3. **Query Parameters**
   ```javascript
   const obj = router.query;
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
      <Link key={index} href={"/admin/" + person}>
        {person}
      </Link>
    ))}
  </>
);
```

This will redirect it to the dynamic links i had created, with dynamic routes, so it will handle it smoothly.

## Navigating Programmatically

The main difference between these 2 is that this is
imperative (Fine grain control) approach and LINK is the Declarative (better readability) approach functioning of both are same.

```javascript
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();
  const click = () => {
    router.push("/test");
  };
  return (
    <>
      <div>so you are {router.query.id}</div>
      <button onClick={click}>Back</button>
    </>
  );
};

export default index;
```

onClick it will redirect to the test page and that's it.
While LINK can always be a button, the router.push() technique can be used on any event to redirect either on completion of something or anything while on the other hand you have to click in the LINK to make it work.

## Rendering Techniques

There are majorly 2 types of rendering server and client side rendering where the server side is further divided into SSG, ISR and plain SSR.

```
Rendering
 ├── Client Side Rendering
 ├── Static Site Generation
 ├── Incremental Static Rendering
 ├── Server Side Rendering
```

### 1. Client Side Rendering (CSR)

This is the normal react code we write which simply send bundled JS with empty HTML page to the client device and then render the pages there.

Cons:

- BAD SEO, crawlers can't read data.
- Load on the client side => Slows Renders.

**Example:** Nothing fancy.

```javascript
const App = () => {
  return <div>Hi</div>;
};
```

### 2. Static Site Generation (SSG)

In this type all the pages are pre-rendered at the built time and stored in the server and as soon as the client requests, the prebuilt pages are delivered to them.

Pros:

- Faster Load times
- Reduced Size

Cons:

- Data changes will not be visible until the whole project is rebuilt.
- Don't work for frequently changing pages.

**Example:**
```javascript
import axios from 'axios';

const App = (props) => {
  return (
    <div>
      {props.data.map((item, index) => (
        <div key={index}>
          <div>{item.id}</div>
          <div>{item.name}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const res = await axios.get('url-data');
  return {
    props: {
      data: res.data,
    },
  };
}

export default App;
```
The data from the url's response at the time of built will be stored and will not change until the project is rebuilt in this case.

### 3. Incremental Static Rendering (ISR)

This type of rendering is the very similar to the SSG but with an add on that all the pages are stored after the built on the server has a timeframe after which it gets automatically updated without rebuilding it again.

**Example:** The exact same code of SSG but with just a tiny change in the getStaticProp function's return.

```javascript
import axios from 'axios';

const App = (props) => {
  return (
    <div>
      {props.data.map((item, index) => (
        <div key={index}>
          <div>{item.id}</div>
          <div>{item.name}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const res = await axios.get('url-data');
  return {
    props: {
      data: res.data,
    },
    revalidate: 60 // after every 60 seconds re-fetches the data from the api
  };
}
```

### 4. Server Side Rendering (SSR)

In this type the pages are not pregenerated at built time and saved statically at the server, instead when a request from the client is received by the server, the server generates that page and then sends that page to the client ensuring up-to-date data while reducing the load from client, its not faster than the SSG/ISR but the data is latest.

**Example:** 

```javascript
const App=(props)=>{
  return(
    <>
    <div>{props.data.id}</div>
    <div>{props.data.name}</div>
    <div>{props.data.desc}</div>
    </>
  )
}

export async function getServerSideProps(context){
  // context works like useRouter() here
  // you can't use any static data directly 
  // in the component rather fetch it here 
  // and pass it to the component as prop
  const {id,user} = context.params; 
  // say url was : products/[id]/[user]
  const res = await axios.post('url',{id,user});
  return {
    props:{
      data:res.data
    }
  }
}
```
## Rendering Functions

We majorly use the below 3 functions 

```
Functions
  |- getServerSideProps(context)
  |- getStaticProps()
  |- getStaticPaths()
```
Below is a view of how the rendering functions are used with the rendering techniques.

### getServerSideProps(context)

```javascript
export async function getServerSideProps(context) {
  // Fetch the details of the specific blog post on every request (SSR)
  const {id} = context.params;
  const res = await fetch(`https://api.example.com/posts/${id}`);
  const post = await res.json();

  // Handle post not found
  if (!post) {
    return {
      notFound: true, // Return 404 page if post doesn't exist
    };
  }

  // Redirect to another page if needed (for example, if the post is archived)
  if (post.archived) {
    return {
      redirect: {
        destination: '/archive', // Redirect to an archive page
        permanent: false,         // This is a temporary redirect
      },
    };
  }

  // Return the post data as props
  return {
    props: { post },
  };
}
```
### getStaticProps(context)

This function has same params like getServerSideProps,the only difference is in its execution it runs once while build time for SSG/ISR while getServerSideProps runs with every request from the client.
```javascript
export async function getStaticProps(context) {
  const {id} = context.params;
  const res = await fetch(`https://api.example.com/posts/${id}`);
  const post = await res.json();

  // Handle post not found
  if (!post) {
    return {
      notFound: true, // Return 404 page if post doesn't exist
    };
  }

  if (post.archived) {
    return {
      redirect: {
        destination: '/archive', // Redirect to an archive page
        permanent: false,         // This is a temporary redirect
      },
    };
  }

  // Return the post data as props
  return {
    props: { post },
  };
}
```

### getStaticPaths( )

The purpose of this function is to define the pages out of all the dynamic pages in case of SSG/ISR to pre-render because in dynamic case these techniques pre-render and save those pages and if there are 1000 products if this function is not used they will try to pre-render 1000 pages and save them, which is undesirable we might want to only pre-render top 25 product pages, that where this function helps us to do these kind of things.

```javascript
export async function getStaticPaths() {
  // Fetch a list of posts (e.g., from an API or database)
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  // Generate an array of paths for each post to be pre-rendered
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }, // Dynamic route parameter
  }));

  return {
    paths, // array of params [{params:{id:1},{params:{id:2}}}]
    fallback: 'blocking',  // Block until the page is generated for new paths
    // fallback - true : Allow ungenerated pages to built on demand. need to add loading else it will throw 404 not found.
    // fallback - false : only generate the paths in the paths[],
    // if anything else is accessed it will give a 404 error.
    // fallback - 'blocking' : No need of using loading, it waits until the page is fully generated and then serve it.
  };
}
```

**Conclusion**
| Functions | Static | Dynamic |
|----------|----------|----------|
| SSG    | getServerSideProps(context)     | Nothing Else     |
| ISR    | getStaticProps(context)    | getStaticProps(context) + getStaticPaths( )+fallback    |
| SSR    | getStaticProps(context) + revalidate    | getStaticProps(context) + getStaticPaths( )+fallback     |


