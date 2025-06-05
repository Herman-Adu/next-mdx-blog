import { db } from "@/db";

export async function GET() {
  return new Response("Hello", { status: 200 });
}

export async function POST(request: Request) {
  const { slug, title, category } = await request.json();

  try {
    // find the slug of the visited page
    const existingPost = await db.blog.findUnique({
      where: { slug: slug },
    });

    if (existingPost) {
      // blog page exists
      await db.blog.update({
        where: { slug: slug },
        data: {
          view_count: { increment: 1 },
        },
      });
    } else {
      // new blog page - create new row pass in details
      await db.blog.create({
        data: {
          slug: slug,
          title: title,
          category: category,
        },
      });
    }
  } catch (error) {
    console.error("Error updating page view", error);

    return new Response("Failed to post to DB", { status: 500 });
  }

  return new Response("Successfully posted to DB", { status: 200 });
}
