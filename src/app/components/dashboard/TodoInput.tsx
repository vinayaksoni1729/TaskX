import React, { useState, useRef, useEffect } from "react";
import {
  PlusCircle,
  Calendar,
  Tag,
  ChevronDown,
  Star,
  X,
  Clock,
  Check,
  Terminal
} from "lucide-react";
import * as chrono from "chrono-node";

interface TodoInputProps {
  showTaskInput: boolean;
  setShowTaskInput: (show: boolean) => void;
  handleAddTodo: (taskTitle: string, deadline: string, recurring?: string) => void;
}

// Define the interface for our parsed preview
interface ParsedPreview {
  title: string;
  date: string;
  recurring?: string;
}

const TodoInput: React.FC<TodoInputProps> = ({
  showTaskInput,
  setShowTaskInput,
  handleAddTodo,
}) => {
  const [nlpMode, setNlpMode] = useState<boolean>(true);
  const [userInput, setUserInput] = useState("");
  const [parsedPreview, setParsedPreview] = useState<ParsedPreview | null>(null);
  
  // State for traditional input mode
  const [inputValue, setInputValue] = useState("");
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

  // Recognizing recurring task patterns
  const recurringPatterns: { [key: string]: string } = {
    "every day": "daily",
    "everyday": "daily",
    "daily": "daily",
    "every week": "weekly",
    "weekly": "weekly",
    "every month": "monthly",
    "monthly": "monthly",
    "every year": "yearly",
    "yearly": "yearly",
    "every monday": "weekly",
    "every tuesday": "weekly",
    "every wednesday": "weekly",
    "every thursday": "weekly",
    "every friday": "weekly",
    "every saturday": "weekly",
    "every sunday": "weekly",
  };

  // Update preview as user types
  const updatePreview = (input: string) => {
    if (!input.trim()) {
      setParsedPreview(null);
      return;
    }

    // Process input to detect task and date
    const processedInput = processInput(input);
    setParsedPreview(processedInput);
  };

  const processInput = (input: string): ParsedPreview => {
    let detectedRecurring = "";
    let textWithoutRecurring = input;
  
    for (const pattern in recurringPatterns) {
      if (input.toLowerCase().includes(pattern)) {
        detectedRecurring = recurringPatterns[pattern];
        textWithoutRecurring = input.toLowerCase().replace(pattern, "").trim();
        break;
      }
    }
  
    const refDate = new Date();
    const parsedResults = chrono.parse(textWithoutRecurring, refDate);
  
    if (parsedResults.length === 0) {
      return { title: input, date: "", recurring: detectedRecurring };
    }
  
    const dateResult = parsedResults[0];
    const dateText = dateResult.text;
    let parsedDate = dateResult.start.date();
  
    // Ensure correct weekday parsing
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const lowerInput = textWithoutRecurring.toLowerCase();
    const weekdays = [
      { name: "sunday", index: 0 },
      { name: "monday", index: 1 },
      { name: "tuesday", index: 2 },
      { name: "wednesday", index: 3 },
      { name: "thursday", index: 4 },
      { name: "friday", index: 5 },
      { name: "saturday", index: 6 },
    ];
  
    for (const day of weekdays) {
      if (lowerInput.includes(day.name)) {
        let daysToAdd = (day.index - dayOfWeek + 7) % 7;
  
        // Ensure we never go backwards in time
        if (daysToAdd === 0 && parsedDate < today) {
          daysToAdd = 7; // Move to next week's occurrence
        }
  
        parsedDate = new Date(today);
        parsedDate.setDate(today.getDate() + daysToAdd);
  
        // Preserve the parsed time (e.g., 3 PM stays 3 PM)
        parsedDate.setHours(
          dateResult.start.get("hour") ?? 9, // Default to 9 AM if no time is given
          dateResult.start.get("minute") ?? 0,
          0,
          0
        );
        break;
      }
    }
  
    const formattedDate = parsedDate.toISOString();
    let taskTitle = textWithoutRecurring.replace(dateText, "").trim();
  
    return {
      title: taskTitle,
      date: formattedDate,
      recurring: detectedRecurring || undefined,
    };
  };

  const handleSubmitTraditional = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    handleAddTodo(inputValue, deadline ? deadline.toISOString() : "", project || undefined);
    setInputValue("");
    setDeadline(null);
    setPriority(4);
    setProject(null);
    setShowDeadlinePicker(false);
    setShowProjectDropdown(false);
    setExpanded(false);
    setShowTaskInput(false);
  };

  const handleSubmitNLP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const processed = processInput(userInput);
    
    if (!processed.title) return;

    handleAddTodo(processed.title, processed.date, processed.recurring);
    setUserInput(""); // Reset input field
    setParsedPreview(null);
    setShowTaskInput(false); // Hide input after adding task
  };

  // For debugging - show the parsed result to the user
  const formatPreviewDate = (dateString: string) => {
    if (!dateString) return "No date specified";
    
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
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

  if (!showTaskInput) {
    return (
      <div className="mb-8 flex">
        <button
          onClick={() => setShowTaskInput(true)}
          className="flex items-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium transition-all duration-200 rounded-lg shadow-lg shadow-indigo-500/30"
        >
          <PlusCircle size={18} className="mr-2" />
          Add New Task
        </button>
      </div>
    );
  }

  // NLP Input Mode
  if (nlpMode) {
    return (
      <div className="mb-8 max-w-3xl mx-auto">
        <div className="flex gap-2 mb-2">
          <button 
            className="bg-indigo-600 text-white px-3 py-1 rounded-t-lg font-medium"
            onClick={() => setNlpMode(true)}
          >
            Natural Language
          </button>
          <button 
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-t-lg font-medium hover:bg-gray-600"
            onClick={() => setNlpMode(false)}
          >
            Standard Input
          </button>
        </div>
        <form 
          onSubmit={handleSubmitNLP} 
          className="bg-gray-900 rounded-xl border border-indigo-500/30 shadow-lg shadow-indigo-500/20 p-4"
        >
          <div className="flex items-center mb-3">
            <Terminal size={18} className="text-indigo-400 mr-2" />
            <span className="text-gray-300 text-sm">Enter task with date & time</span>
          </div>
          
          <input
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              updatePreview(e.target.value);
            }}
            placeholder="E.g. 'Doctor appointment monday at 1pm'"
            className="w-full p-3 border border-gray-700 rounded-lg text-white bg-gray-800 mb-3 focus:outline-none focus:border-indigo-500"
            autoFocus
          />
          
          {/* Preview parsed task */}
          {parsedPreview && parsedPreview.title && (
            <div className="text-sm bg-gray-800 p-3 rounded-lg border border-gray-700 mb-3">
              <div className="text-indigo-300 font-medium mb-1">Preview:</div>
              <p><span className="text-gray-400">Task:</span> {parsedPreview.title}</p>
              {parsedPreview.date && (
                <p><span className="text-gray-400">When:</span> {formatPreviewDate(parsedPreview.date)}</p>
              )}
              {parsedPreview.recurring && (
                <p><span className="text-gray-400">Repeats:</span> {parsedPreview.recurring}</p>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <button 
              type="submit" 
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium transition-all duration-200 rounded-lg shadow-md"
            >
              Save Task
            </button>
            <button
              type="button"
              onClick={() => {
                setShowTaskInput(false);
                setUserInput("");
                setParsedPreview(null);
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Traditional Input Mode
  return (
    <div className="mb-8 max-w-3xl mx-auto">
      <div className="flex gap-2 mb-2">
        <button 
          className="bg-gray-700 text-gray-300 px-3 py-1 rounded-t-lg font-medium hover:bg-gray-600"
          onClick={() => setNlpMode(true)}
        >
          Natural Language
        </button>
        <button 
          className="bg-indigo-600 text-white px-3 py-1 rounded-t-lg font-medium"
          onClick={() => setNlpMode(false)}
        >
          Standard Input
        </button>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmitTraditional}
        className={`bg-gray-900 rounded-xl border ${
          expanded
            ? "border-indigo-500/50 shadow-lg shadow-indigo-500/20"
            : "border-gray-800"
        } transition-all duration-300 transform ${expanded ? "scale-102" : ""}`}
      >
        <div className="flex items-center">
          <div
            className="p-4 text-indigo-400 transition-colors duration-200 hover:text-indigo-300 cursor-pointer"
            onClick={() => {
              inputRef.current?.focus();
              setExpanded(true);
            }}
          >
            <PlusCircle size={22} className="stroke-[1.5px]" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg font-medium"
            onFocus={() => setExpanded(true)}
          />
          <button
            type="submit"
            className={`px-8 py-2 ${
              inputValue.trim()
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            } font-medium transition-all duration-200 rounded-l-full`}
            disabled={!inputValue.trim()}
          >
            {inputValue.trim() ? <Check className="stroke-[2px]" /> : "Add"}
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