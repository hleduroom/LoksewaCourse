interface Props {
  title: string;
  options: string[];
  selected: Set<string>;
  onChange: (value: string) => void;
  suffix?: string;
}

export default function FilterSection({
  title,
  options,
  selected,
  onChange,
  suffix = "",
}: Props) {
  return (
    <div className="mb-6">
      <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-300">
        {title}
      </h4>
      <div className="space-y-1">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400"
          >
            <input
              type="checkbox"
              className="accent-purple-600"
              checked={selected.has(option)}
              onChange={() => onChange(option)}
            />
            <span>
              {option} {suffix}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
