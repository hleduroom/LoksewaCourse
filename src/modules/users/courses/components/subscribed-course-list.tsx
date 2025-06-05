import Link from "next/link";
import React from "react";

import CustomImage from "@/components/global/custom-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SubscribedCourseListProps {
  courses: {
    id: string;
    title: string;
    description: string | null;
    thumbnailUrl: string | null;
    chaptersCount: number;
  }[];
}
const SubscribedCourseList = ({ courses }: SubscribedCourseListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      {courses.map((course) => (
        <Card key={course.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {course.title}
              <Badge>{course.chaptersCount}</Badge>
            </CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomImage url={course.thumbnailUrl} />
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/dashboard/courses/${course.id}`}>Continue</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubscribedCourseList;
