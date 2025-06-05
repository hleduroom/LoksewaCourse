export interface Course {
  slug: string;
  title: string;
  description: string;
  services: string;
  thumbnail: string;
  price: string;
  tutor: {
    name: string;
    avatar: string;
    bio: string;
  };
  rating: number;
  students: number;
  totalLectures: number;
  totalDuration: string;
  chapters: {
    title: string;
    duration: string;
  }[];
}
