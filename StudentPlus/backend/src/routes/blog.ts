import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
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

  blogRouter.post('/', authMiddleware, async (c) => {
    try {
      const { title, content, photoUrl } = await c.req.json();
      const authorId = c.get("userId");
      const published = new Date(); // Set the current date as the published date
  
      if (!authorId) {
        throw new Error("Author ID is missing or invalid");
      }
  
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const blog = await prisma.post.create({
        data: {
          title,
          content,
          authorId,
          photoUrl: photoUrl || "",
          // published: published,
        },
        include: {
          author: true,
        },
      });

      const formattedBlog = {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        photoUrl: blog.photoUrl,
        likeCount: blog.likeCount,
        commentCount: blog.commentCount,
        author: {
          id: blog.author.id,
          shortCollegeName: blog.author.shortCollegeName,
          anonymousName: blog.author.anonymousName,
        },
        published: published,
      };
  
      return c.json(formattedBlog);
    } catch (error) {
      console.error("Error creating blog post:", error);
      return c.json({ error: "An error occurred while creating the blog post." }, 403);
    }
  });

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

blogRouter.get('/userDetails', authMiddleware, async(c) => {

  try{
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 

    const userDetails = await prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        anonymousName: true,
        fullCollegeName: true,
      }
    });

    return c.json(userDetails);
  }
  catch (error) {
    console.error("Error fetching user details:", error);
    return c.json({ error: "An error occurred while fetching user details." }, 500);
  }
})

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
                published: true,
                author: {
                    select: {
                        id: true,
                        shortCollegeName: true,
                        anonymousName: true,
                        fullCollegeName: true
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

blogRouter.get('/likedPosts', authMiddleware, async (c) => {
  const userId = c.get("userId");
  try {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        where: {
          likes: {
            some: {
              userId: userId
            }
          }
        },
        select: {
          content: true,
          title: true,
          id: true,
          photoUrl: true,
          likeCount: true, 
          commentCount: true,
          published: true,
          author: {
              select: {
                  id: true,
                  shortCollegeName: true,
                  anonymousName: true,
                  fullCollegeName: true
              }
          }
      }
    });
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
                              id: true,
                              anonymousName: true,
                              shortCollegeName: true,
                            }
                          }
                    }
                },
                author: {
                    select: {
                        shortCollegeName: true,
                        anonymousName: true,
                        fullCollegeName: true,
                    }
                }
            }
        });

        if (!blog) {
            return c.json({ error: 'Posts not found' }, 404);
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
          },
          include: {
              user: true, // Include user data
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


blogRouter.delete('/:postId/:commentId', authMiddleware, async (c) => {
  const { postId, commentId } = c.req.param();
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
      // Check if the comment exists and belongs to the post
      const comment = await prisma.comment.findFirst({
          where: {
              id: commentId,
              postId: postId
          },
          select: {
              id: true,
              postId: true
          }
      });

      if (!comment) {
          return c.json({ error: "Comment not found" }, 404);
      }

      // Delete the comment
      await prisma.comment.delete({
          where: { id: commentId }
      });

      // Decrement the comment count of the post
      await prisma.post.update({
          where: { id: postId },
          data: { commentCount: { decrement: 1 } }
      });

      return c.json({ message: "Comment deleted successfully" });
  } catch (error) {
      console.error("Error deleting comment", error);
      return c.json({ error: "An error occurred while deleting this comment" }, 500);
  }
});

blogRouter.delete('/:postId', authMiddleware, async (c) => {
  const { postId } = c.req.param();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  console.log("Attempting to delete post with ID:", postId);

  try {
    // Find the post to ensure it exists
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      include: {
        comments: true,
        likes: true
      }
    });

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    // Delete all comments associated with the post
    await prisma.comment.deleteMany({
      where: {
        postId: postId
      }
    });

    // Delete all likes associated with the post
    await prisma.like.deleteMany({
      where: {
        postId: postId
      }
    });

    // Delete the post
    await prisma.post.delete({
      where: {
        id: postId
      }
    });

    return c.json({ message: "Post and its comments and likes deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return c.json({ error: "An error occurred while deleting the post" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

