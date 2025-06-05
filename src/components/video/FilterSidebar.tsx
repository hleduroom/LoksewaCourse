import FilterSection from "./FilterSection";

interface Filters {
  price: Set<string>;
  rating: Set<string>;
  services: Set<string>;
}

interface Props {
  filters: Filters;
  toggleFilter: (type: keyof Filters, value: string) => void;
  services: string[];
}

export default function FilterSidebar({
  filters,
  toggleFilter,
  services,
}: Props) {
  return (
    <aside className="hidden w-72 md:block flex-shrink-0">
      <div className="sticky top-6 max-h-[85vh] overflow-y-auto rounded-xl border border-gray-200 bg-gray-100 p-5 shadow-md transition-all duration-300 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Filter By
        </h2>

        {/* Filter Sections */}
        <div className="space-y-6">
          <FilterSection
            title="Price"
            options={["Free", "Paid"]}
            selected={filters.price}
            onChange={(val) => toggleFilter("price", val)}
          />

          <FilterSection
            title="Rating"
            options={["4", "4.5"]}
            selected={filters.rating}
            onChange={(val) => toggleFilter("rating", val)}
            suffix="& up"
          />

          <FilterSection
            title="Services"
            options={services}
            selected={filters.services}
            onChange={(val) => toggleFilter("services", val)}
          />
        </div>
      </div>
    </aside>
  );
}
