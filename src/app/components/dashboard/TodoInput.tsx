import React, { useState, useRef, useEffect } from "react";
import {
  PlusCircle,
  Calendar,
  Tag,
  ChevronDown,
  Star,
  X,
  Clock,
} from "lucide-react";

interface TodoInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleAddTodo: (
    e: React.FormEvent,
    deadline?: Date,
    priority?: number,
    project?: string
  ) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({
  inputValue,
  setInputValue,
  handleAddTodo,
}) => {
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const [priority, setPriority] = useState<number>(4);
  const [project, setProject] = useState<string | null>(null);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProjectDropdown(false);
      }

      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        expanded
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    handleAddTodo(e, deadline || undefined, priority, project || undefined);
    setInputValue("");
    setDeadline(null);
    setPriority(4);
    setProject(null);
    setShowDeadlinePicker(false);
    setShowProjectDropdown(false);
    setExpanded(false);
  };

  const getPriorityColor = (level: number) => {
    switch (level) {
      case 1:
        return "text-red-400 bg-red-500/20";
      case 2:
        return "text-orange-400 bg-orange-500/20";
      case 3:
        return "text-yellow-400 bg-yellow-500/20";
      case 4:
        return "text-gray-400 bg-gray-600/40";
      default:
        return "text-gray-400 bg-gray-600/40";
    }
  };

  const formatDeadline = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <div className="mb-8 transform transition-all duration-300 hover:shadow-lg">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`bg-gray-800/60 backdrop-blur-lg rounded-xl overflow-hidden border ${
          expanded
            ? "border-indigo-500/50 shadow-md shadow-indigo-500/10"
            : "border-gray-700/50"
        } transition-all duration-200`}
      >
        <div className="flex items-center">
          <div
            className={`p-4 ${
              expanded
                ? "bg-indigo-600/30 text-indigo-300"
                : "bg-indigo-500/20 text-indigo-400"
            } transition-colors duration-200`}
          >
            <PlusCircle size={20} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
            onFocus={() => setExpanded(true)}
          />
          <button
            type="submit"
            className={`px-6 py-4 ${
              inputValue.trim()
                ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white"
                : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
            } font-medium hover:opacity-90 transition-all duration-200`}
            disabled={!inputValue.trim()}
          >
            Add
          </button>
        </div>

        {expanded && (
          <div className="flex flex-wrap items-center px-4 pb-4 border-t border-gray-700/30 pt-3 gap-3">
            {/* Priority selector */}
            <div className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-700/50 text-gray-300">
              <span className="text-xs mr-2">Priority:</span>
              {[1, 2, 3, 4].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPriority(level)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    priority === level
                      ? getPriorityColor(level)
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                  title={`Priority ${level}`}
                >
                  <Star
                    size={14}
                    fill={priority === level ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>

            {/* Project selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${
                  project
                    ? "bg-purple-500/20 text-purple-300"
                    : "bg-gray-700/50 hover:bg-gray-700/80 text-gray-300"
                } text-sm transition-colors`}
              >
                <Tag size={14} />
                <span>{project || "Project"}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    showProjectDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProjectDropdown && (
                <div className="absolute z-50 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-visible">
                  {/* Fixed dropdown menu */}
                  <div className="p-2 border-b border-gray-700 text-xs text-gray-400 uppercase">
                    Select Project
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setProject("Personal");
                        setShowProjectDropdown(false);
                      }}
                      className={`flex items-center w-full px-3 py-2 hover:bg-indigo-500/20 text-left text-sm ${
                        project === "Personal"
                          ? "text-indigo-300 bg-indigo-500/10"
                          : "text-white"
                      } transition-colors`}
                    >
                      <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                      Personal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProject("Work");
                        setShowProjectDropdown(false);
                      }}
                      className={`flex items-center w-full px-3 py-2 hover:bg-indigo-500/20 text-left text-sm ${
                        project === "Work"
                          ? "text-indigo-300 bg-indigo-500/10"
                          : "text-white"
                      } transition-colors`}
                    >
                      <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                      Work
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProject("Study");
                        setShowProjectDropdown(false);
                      }}
                      className={`flex items-center w-full px-3 py-2 hover:bg-indigo-500/20 text-left text-sm ${
                        project === "Study"
                          ? "text-indigo-300 bg-indigo-500/10"
                          : "text-white"
                      } transition-colors`}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                      Study
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProject("Health");
                        setShowProjectDropdown(false);
                      }}
                      className={`flex items-center w-full px-3 py-2 hover:bg-indigo-500/20 text-left text-sm ${
                        project === "Health"
                          ? "text-indigo-300 bg-indigo-500/10"
                          : "text-white"
                      } transition-colors`}
                    >
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                      Health
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProject(null);
                        setShowProjectDropdown(false);
                      }}
                      className="flex items-center w-full px-3 py-2 hover:bg-red-500/20 text-left text-sm text-gray-300 transition-colors"
                    >
                      <X size={14} className="mr-2" />
                      None
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Deadline picker toggle */}
            <button
              type="button"
              onClick={() => setShowDeadlinePicker(!showDeadlinePicker)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${
                deadline
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-gray-700/50 hover:bg-gray-700/80 text-gray-300"
              } text-sm transition-colors`}
            >
              <Calendar size={14} />
              <span>
                {deadline ? formatDeadline(deadline) : "Set deadline"}
              </span>
              {deadline && (
                <X
                  size={14}
                  className="ml-1 text-gray-400 hover:text-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeadline(null);
                    setShowDeadlinePicker(false);
                  }}
                />
              )}
            </button>
          </div>
        )}

        {/* Deadline picker */}
        {showDeadlinePicker && (
          <div className="px-4 pb-4 animate-fadeIn">
            <div className="p-3 bg-gray-700/50 rounded-lg border border-gray-600/50">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm text-gray-300">
                  Set deadline:
                </label>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      const today = new Date();
                      today.setHours(23, 59, 0, 0);
                      setDeadline(today);
                    }}
                    className="text-xs px-2 py-1 bg-gray-600/50 hover:bg-gray-600 rounded text-gray-300 flex items-center"
                  >
                    <Clock size={10} className="mr-1" />
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      tomorrow.setHours(23, 59, 0, 0);
                      setDeadline(tomorrow);
                    }}
                    className="text-xs px-2 py-1 bg-gray-600/50 hover:bg-gray-600 rounded text-gray-300"
                  >
                    Tomorrow
                  </button>
                </div>
              </div>
              <input
                type="datetime-local"
                className="bg-gray-600 text-white rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setDeadline(e.target.value ? new Date(e.target.value) : null)
                }
                min={new Date().toISOString().slice(0, 16)}
                value={
                  deadline
                    ? new Date(
                        deadline.getTime() -
                          deadline.getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .slice(0, 16)
                    : ""
                }
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowDeadlinePicker(false)}
                  className="text-xs px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 rounded text-white transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoInput;