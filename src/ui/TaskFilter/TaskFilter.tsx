import { TaskStatus } from "../../model/Task.model";

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
    { label: "Pending", value: TaskStatus.NEW },
  ];

  return (
    <div className="flex space-x-2 mb-4">
      {filters.map(({ label, value }) => (
        <button
          key={label}
          onClick={() => onFilterChange(value)}
          className={`px-3 py-1 rounded transition ${
            activeFilter === value ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};