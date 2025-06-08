import Link from "next/link";
import { formatDate } from "../app/blog/utils";

import {
  Card,
  //CardAction,
  CardContent,
  //CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AtricleCardProps {
  post: {
    metadata: {
      [key: string]: React.ReactNode | string;
    };
    slug: string;
    content: string;
  };
}

export default function AtricleCard({ post }: AtricleCardProps) {
  //console.log("Article Card: ", post.metadata.title);

  return (
    <>
      <Card key={post.slug}>
        <CardHeader>
          <CardTitle className="h-10">
            <Link href={`/blog/${post.metadata.category}/${post.slug}`}>
              <h3 className="font-bold py-2 leading-5 hover:text-orange-400">
                {post.metadata.title}
              </h3>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start justify-evenly h-full">
          <div className="flex-1">
            <p className="line-clamp-3">{post.metadata.summary}</p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.metadata.publishedAt as string)}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
