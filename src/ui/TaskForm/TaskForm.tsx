import { useState } from "react";

export const TaskForm = ({ 
  onAddTask 
}: {
  onAddTask: (title: string) => void;
}) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex">
      <input
        type="text"
        placeholder="New task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-grow border rounded-l py-2 px-3"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
        Add
      </button>
    </form>
  );
};