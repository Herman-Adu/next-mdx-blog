import { notFound } from "next/navigation";
import { formatDate, getBlogPosts } from "../../utils";
import Header from "@/components/Header";
import Container from "@/components/Container";
import { BreadcrumbWithCustomSeparator } from "@/components/Breadcrumb";
import { CustomMDX } from "@/components/mdx";
import ReportViews from "@/components/ReportViews";
import { baseUrl } from "@/app/sitemap";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.metadata.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  // get slug from paraams
  const { slug } = await params;

  //get the blog if its slug matches the slug in the params
  const post = getBlogPosts().find((post) => post.slug === slug);

  //check we got back a blog
  if (!post) {
    return;
  }

  //destructure metadata from the post object
  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  // get image
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  // return object below with metadata
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post?.metadata.category}/${post?.slug}}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SinglePostPage({ params }: { params: Params }) {
  const { slug } = await params;

  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ReportViews
        slug={post.slug}
        title={post.metadata.title}
        category={post.metadata.category}
      />
      <Header>
        <Container>
          <BreadcrumbWithCustomSeparator
            category={post.metadata.category}
            slug={slug}
          />

          <h1 className="title font-semibold text-2xl tracking-tighter mt-4">
            {post.metadata.title}
          </h1>

          <div className="flex justify-between items-center mt-2 mb-4 text-sm">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </div>
        </Container>
      </Header>

      <Container>
        <article className="prose">
          <CustomMDX source={post.content} />
        </article>
      </Container>
    </>
  );
}
