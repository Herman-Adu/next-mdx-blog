import { getBlogPosts } from "../utils";
import AtricleCard from "@/components/article-card";

interface RelatedPostsProps {
  category: string;
  title: string;
}

export default function RelatedPosts({ category, title }: RelatedPostsProps) {
  const posts = getBlogPosts();

  // check if there will be more that one Related posts after filtering
  const filteredPosts = posts.filter(
    (post) =>
      post.metadata.category === category && post.metadata.title !== title
  );

  return (
    <>
      <div className="prose">
        <h1>Related Posts</h1>
      </div>

      {/* sort, filter, slice and map through the posts to build articles cards */}
      <div>
        {filteredPosts.length > 1 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {posts
              .sort((a, b) => {
                if (
                  new Date(a.metadata.publishedAt) >
                  new Date(b.metadata.publishedAt)
                ) {
                  return -1;
                } else {
                  return 1;
                }
              })
              .filter(
                (post) =>
                  post.metadata.category === category &&
                  post.metadata.title !== title
              )
              .slice(0, 3)
              .map((post) => (
                <AtricleCard key={post.slug} post={post} />
              ))}
          </div>
        ) : (
          <div className="prose">
            <h2>There are no simular post to show at this time</h2>
          </div>
        )}
      </div>
    </>
  );
}
