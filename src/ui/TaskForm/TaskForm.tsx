import { useState } from "react";

export const TaskForm = ({ 
  onAddTask 
}: {
  onAddTask: (title: string) => void;
}) => {
  const [newTask, setNewTask] = useState<string>("");
  const [error, setError] = useState<string>("");
  // initially i implemented touched here but as this form is simple i think it reflects
  // a cleaner approach if we only show errors if the user attempts to submit
  // this not a regular validation pattern
  const [submitAttempted, setSubmitAttempted] = useState<boolean>(false);

  const validateTask = (value: string): boolean => {
    if (!value.trim()) {
      setError("Task title is required");
      return false;
    }
    
    if (value.trim().length < 3) {
      setError("Task title must be at least 3 characters");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    const isValid = validateTask(newTask);
    if (isValid) {
      onAddTask(newTask);
      setNewTask("");
      setSubmitAttempted(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTask(value);
    
    if (submitAttempted) {
      validateTask(value);
    }
  };

  const errorMessage = submitAttempted && error ? (
    <div id="task-error" className="text-danger-500 text-sm mt-1 font-medium">
      {error}
    </div>
  ) : null;

  return (
    <form onSubmit={handleSubmit} className="mb-4" noValidate>
      <div className="flex">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
          className={`form-input flex-grow rounded-l ${submitAttempted && error ? "border-danger-500 bg-danger-50" : "border-secondary-300"}`}
          aria-invalid={!!error}
          aria-describedby={error ? "task-error" : undefined}
        />
        <button 
          type="submit" 
          className="btn-primary rounded-l-none"
        >
          Add
        </button>
      </div>
      {errorMessage}
    </form>
  );
};