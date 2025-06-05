"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChapterListProps {
  courseId: string;
  chapters: {
    id: string;
    title: string;
    isFree: boolean;
    position: number;
  }[];
}
const ChapterList = ({ courseId, chapters }: ChapterListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {chapters.map((chapter) => (
        <Card key={chapter.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {chapter.title}
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/dashboard/courses/${courseId}/${chapter.id}`}>
                Continue
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ChapterList;
