import prisma from "@/db";

/* export async function GET() {
  return new Response("Hello", { status: 200 });
} */

export async function GET() {
  try {
    const data = await prisma.blog.findMany({
      take: 10,
      select: { title: true, category: true, slug: true },
      orderBy: [{ view_count: "desc" }],
    });

    return Response.json(data);
  } catch (error) {
    console.error("Database Error...", error);
    throw new Error("Failed to fetch the popular posts");
  }
}

export async function POST(request: Request) {
  const { slug, title, category } = await request.json();

  try {
    // find the slug of the visited page
    const existingPost = await prisma.blog.findUnique({
      where: { slug: slug },
    });

    if (existingPost) {
      // blog page exists
      await prisma.blog.update({
        where: { slug: slug },
        data: {
          view_count: { increment: 1 },
        },
      });
    } else {
      // new blog page - create new row pass in details
      await prisma.blog.create({
        data: {
          slug: slug,
          title: title,
          category: category,
        },
      });
    }
  } catch (error) {
    console.error("Error updating page view", error);

    return new Response("Failed to post to prisma", { status: 500 });
  }

  return new Response("Successfully posted to prisma", { status: 200 });
}
