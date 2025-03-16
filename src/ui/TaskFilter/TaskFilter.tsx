import { TaskStatus } from "#model";

export const TaskFilter = ({ 
  activeFilter, 
  onFilterChange 
}: {
  activeFilter: TaskStatus | null;
  onFilterChange: (filter: TaskStatus | null) => void;
}) => {
  const filters = [
    { label: "All", value: null },
    { label: "Completed", value: TaskStatus.COMPLETED },
    { label: "In Progress", value: TaskStatus.IN_PROGRESS },
    { label: "New", value: TaskStatus.NEW },
  ];

  return (
    <div className="flex space-x-2 mb-4">
      {filters.map(({ label, value }) => (
        <button
        key={label}
        onClick={() => onFilterChange(value)}
        className={`px-3 py-1 rounded transition text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-primary-300 ${
          activeFilter === value 
            ? "bg-primary-300 text-primary-600 font-medium" 
            : "text-secondary-700 hover:bg-secondary-100"
        }`}
      >
        {label}
      </button>
      ))}
    </div>
  );
};