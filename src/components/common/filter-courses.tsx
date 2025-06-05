import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterCourses = () => {
  return (
    <Select>
      <SelectTrigger className="w-full sm:w-auto">
        <SelectValue placeholder="Filter Course" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Courses</SelectLabel>
          <SelectItem value="banking">Banking</SelectItem>
          <SelectItem value="health">Health</SelectItem>
          <SelectItem value="agriculture">Agriculture</SelectItem>
          <SelectItem value="police">Police</SelectItem>
          <SelectItem value="army">Army</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterCourses;
