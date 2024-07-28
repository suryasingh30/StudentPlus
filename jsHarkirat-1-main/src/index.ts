import { Hono } from 'hono'

const app = new Hono()

// app.get('/', async (c) => {
  
//   const body = await c.req.json()
//   console.log(body);
//   console.log(c.req.header("Authorization"));
//   console.log(c.req.query("param"));
  
//   return c.text('Hello Hono!')
// })

async function authMiddleware(c: any, next: any){
  // c -> context of this request, response
  if(c.req.header("Authentication")){
    // Do Verification
    await next()
  } else{
    return c.text("You dont have access");
  }

}

app.use(authMiddleware)

export default app
