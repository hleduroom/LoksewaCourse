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

interface CoursesListProps {
  courses: {
    id: string;
    title: string;
    description: string | null;
    isPublished: boolean;
    content: string | null;
    thumbnailUrl: string | null;
    price: string | null;
    createdAt: Date | null;
  }[];
}
const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      {courses.map((course) => (
        <Card key={course.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {course.title}
              <Badge variant={course.isPublished ? "default" : "destructive"}>
                {course.isPublished ? "Published" : "Not Published"}
              </Badge>
            </CardTitle>
            <CardDescription>
              {course.createdAt?.toDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CustomImage url={course.thumbnailUrl} />
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/admin/courses/${course.id}`}>Edit Course</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CoursesList;
