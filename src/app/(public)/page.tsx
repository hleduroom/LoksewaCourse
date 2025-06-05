import EBooksPage from "@/components/book/book";
import Divider from "@/components/common/divider";
import HomePageTop from "@/components/homepage/hoempagetop";
import CategoryGrid from "@/components/homepage/homepagecourse";
import CoursePageHome from "@/components/video/CoursesPageHome";

export default async function Home() {
  return (
    <div className="dark:bg-gray-900">
      <HomePageTop />
      <Divider />
      <CategoryGrid />
      <Divider />
      <div className="rounded-xl bg-white p-2 dark:bg-gray-900">
        <h2 className="mb-5 text-center text-2xl font-bold md:text-3xl">
          🎓 Master Loksewa with Expert-Led Video Courses
        </h2>
        <p className="mx-auto max-w-3xl text-center text-lg text-gray-700 dark:text-gray-300">
          अनुभवी प्रशिक्षकहरूबाट तयार पारिएको{" "}
          <span className="font-medium text-blue-600 dark:text-blue-400">
            HD भिडियो पाठ्यक्रम
          </span>{" "}
          — जुनसुकै समय, जुनसुकै स्थानमा पढ्न सुरु गर्नुहोस्। तयारीलाई
          बनाउनुहोस् स्मार्ट, प्रभावकारी र आत्मविश्वासपूर्ण।
        </p>
      </div>

      <CoursePageHome />
      <Divider />

      <EBooksPage />
    </div>
  );
}
