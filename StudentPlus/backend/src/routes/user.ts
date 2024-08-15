import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput } from '@suryasingh_30/mask-validate';

const generateRandomName = () => {
  const adjectives = ["Brave", "Swift", "Clever", "Bright", "Bold"];
  const nouns = ["Lion", "Falcon", "Wolf", "Tiger", "Eagle"];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
};

// const handleCors = (c, next) => {
//   c.header('Access-Control-Allow-Origin', '*');
//   c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   if (c.req.method === 'OPTIONS') {
//     return c.status(204).send(); // Handle preflight request
//   }

//   return next();
// };

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

// userRouter.use('*', handleCors); // Apply CORS middleware to all routes

userRouter.get('/colleges', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const colleges = await prisma.college.findMany({
    select: {
      fullName: true,
    },
  });

  return c.json({
    colleges,
  });
});

userRouter.post('/checkUser', async (c) => {
  try{
    const { email } = await c.req.json();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return c.json({ exists: true, message: 'User already exists' }, 200);
    }
    return;
  }catch(error){
    return c.json("something went wrong", 500);
  }
}) 

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  
  // Validate input
  const parsedResult = signupInput.safeParse(body);
  if (!parsedResult.success) {
    c.status(400); // Use 400 for bad request
    return c.json({
      message: "Inputs not correct",
      errors: parsedResult.error.format()
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Check if college exists
    const college = await prisma.college.findUnique({
      where: {
        fullName: body.fullCollegeName,
      },
    });

    if (!college) {
      c.status(404);
      return c.json({ message: 'College Not Found' });
    }

    let shortCollegeName = college.shortName;
    const anonymousName = generateRandomName();
    const mail = body.email;
    const domain = mail.split('@')[1];

    if (shortCollegeName !== domain) {
      c.status(404);
      return c.json({ message: "You don't belong to this college" });
    }

    const subDomain = domain.split('.')[0];
    shortCollegeName = subDomain.toUpperCase();

    // Create user
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        anonymousName: anonymousName,
        fullCollegeName: body.fullCollegeName,
        shortCollegeName: shortCollegeName,
      },
    });

    // Generate JWT
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);

  } catch (e) {
    console.error(e);
    c.status(500); // Use 500 for internal server error
    return c.json({
      message: 'An error occurred during signup',
    });
  }
});


userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403); // Unauthorized access
      return c.json({
        message: 'Incorrect credentials',
      });
    }

    // Generate JWT
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);

  } catch (e) {
    console.error(e);
    c.status(500); // Use 500 for internal server error
    return c.json({
      message: 'An error occurred during signin',
    });
  }
});

