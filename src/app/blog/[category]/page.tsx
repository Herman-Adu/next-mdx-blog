import { notFound } from "next/navigation";
import { getBlogPosts } from "../utils";
import Link from "next/link";
import Container from "@/components/Container";
import CardCategory from "@/components/CardCategory";
import Header from "@/components/Header";

type Params = Promise<{ category: string }>;

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    category: post.metadata.category,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category } = await params;

  return {
    title: category.toLocaleUpperCase(),
    description: `All articles regarding ${category}`,
  };
}

export default async function CategoriesPage({ params }: { params: Params }) {
  const { category } = await params;

  const posts = getBlogPosts().filter(
    (post) => post.metadata.category === category
  );

  if (!posts.length) {
    notFound();
  }

  return (
    <>
      <Header>
        <Container>
          <h1 className="title font-semibold text-2xl tracking-wider mt-4 uppercase">
            {category}
          </h1>
        </Container>
      </Header>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {posts
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) >
                new Date(b.metadata.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post) => (
              <Link
                href={`/blog/${post.metadata.category}/${post.slug}`}
                key={post.slug}
              >
                <CardCategory
                  title={post.metadata.title}
                  summary={post.metadata.summary}
                  date={post.metadata.publishedAt}
                />
              </Link>
            ))}
        </div>
      </Container>
    </>
  );
}
