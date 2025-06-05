import AlertNotification from "@/components/common/alert-notification";
import FilterCourses from "@/components/common/filter-courses";
import Container from "@/components/global/container";

export default function Courses() {
  return (
    <div>
      <Container>
        <AlertNotification
          data={{
            title: "WORK IN PROGRESS",
            description: "FEATURES ARE YET TO COME!!",
            variant: "destructive",
          }}
          className="w-full rounded-none"
        />
      </Container>
      <Container className="my-2">
        <FilterCourses />
      </Container>
    </div>
  );
}
