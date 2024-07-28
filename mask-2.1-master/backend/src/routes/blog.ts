import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, verify } from "hono/jwt";
import { Context } from 'hono';

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables: {
        userId: string;
    }
  }>;

  
  export const authMiddleware = async (c: Context, next: () => Promise<void>) => {
    const authHeader = c.req.header("authorization") || "";
  
    try {
      const user = await verify(authHeader, c.env.JWT_SECRET);
      if (user) {
        c.set("userId", user.id);
        await next();
      } else {
        c.status(403);
        return c.json({
          message: "You are not logged in"
        });
      }
    } catch (e) {
      c.status(403);
      return c.json({
        message: "You are not logged in"
      });
    }
  };
  

blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    const authorId = c.get("userId");
    if (!authorId) {
        throw new Error("Author ID is missing or invalid");
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())  

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
            photoUrl: body.photoUrl || null
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {

    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())  

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            authorId: "1"
        }
    })

    return c.json({
        id: blog.id
    })
})

// d661f42a-2dd1-4a3a-8c66-8b8464c3e543
// todo: add pagination
blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        // Fetch the blogs with the necessary details
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                photoUrl: true,
                likeCount: true, 
                commentCount: true,
                author: {
                    select: {
                        shortCollegeName: true,
                        anonymousName: true
                    }
                }
            }
        });

        // Log the response to ensure it's correct
        // console.log('Blogs fetched:', blogs);

        // Return the blogs as JSON response
        return c.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return c.json({ error: "An error occurred while fetching blogs." }, 500);
    }
});


blogRouter.get('/:id', async (c) => {
    const { id } = c.req.param();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                content: true,
                photoUrl: true,
                published: true,
                authorId: true,
                likeCount: true,
                commentCount: true,
                comments: {
                  where: {postId: id},
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        userId: true,
                          user: {
                            select: {
                              anonymousName: true,
                              shortCollegeName: true,
                            }
                          }
                    }
                },
                author: {
                    select: {
                        shortCollegeName: true,
                        anonymousName: true
                    }
                }
            }
        });

        if (!blog) {
            return c.json({ error: 'Blog not found' }, 404);
        }

        return c.json({ blog });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return c.json({ error: "An error occurred while fetching the blog." }, 500);
    }
});


blogRouter.post('/:id/like', authMiddleware, async (c) => {
    const { id } = c.req.param();
    const userId = c.get('userId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId: id,
      },
    });
  
    let likeCount;
    if (!existingLike) {
      await prisma.like.create({
        data: {
          userId,
          postId: id,
        },
      });
  
      const post = await prisma.post.update({
        where: { id },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      });
  
      likeCount = post.likeCount;
    } else {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
  
      const post = await prisma.post.update({
        where: { id },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      });
  
      likeCount = post.likeCount;
    }
  
    return c.json({ likeCount });
  });
  

// Check if the user has liked a post
blogRouter.get('/:id/liked', authMiddleware, async (c) => {
    const {id} = c.req.param();
    const userId = c.get("userId"); // assuming you have a middleware that sets req.user
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    try {
        const existingLike = await prisma.like.findFirst({
            where: {
                userId,
                postId: id,
            },
        });

        if (existingLike) {
            return c.json({ liked: true });
        } else {
            return c.json({ liked: false });
        }
    } catch (error) {
        console.error("Error checking like status:", error);
        c.json({ error: "An error occurred while checking like status" }, 500);
    }
});

blogRouter.post('/:id/comment', authMiddleware, async (c) => {
    const { id: postId } = c.req.param();
    const userId = c.get("userId");
    const { content } = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                userId
            }
        });

        await prisma.post.update({
            where: { id: postId },
            data: {
                commentCount: {
                    increment: 1
                }
            }
        });

        return c.json({ comment });
    } catch (error) {
        console.error("Error creating comment:", error);
        return c.json({ error: "An error occurred while creating the comment." }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

export default blogRouter;



