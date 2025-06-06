import { POSTS } from "@/lib/constants";
import { getBlogPosts } from "./blog/utils";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default async function sitemap() {
  //get the url and lastModified of every blog
  const post = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.metadata.category}/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  //get the url and lastModified of every category
  const routes = POSTS.map((route) => ({
    url: `${baseUrl}${route.href}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...post, ...routes];
}
