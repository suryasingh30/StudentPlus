import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

app.use(cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

// app.use(cors({
//   origin: '*', // or specify the allowed origin
//   allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization']
// }));


app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
