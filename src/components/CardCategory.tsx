import { formatDate } from "@/app/blog/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface CardCategoryProps {
  title: string;
  summary: string;
  date: string;
}

export default function CardCategory({
  title,
  summary,
  date,
}: CardCategoryProps) {
  //console.log("Title: ", title);
  return (
    <Card className="w-[350px] h-[290px] shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{summary}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">{formatDate(date)}</p>
      </CardFooter>
    </Card>
  );
}
