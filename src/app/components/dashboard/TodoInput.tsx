import React, { useState } from "react";
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

const TodoInput: React.FC<TodoInputProps> = ({ showTaskInput, setShowTaskInput, handleAddTodo }) => {
  const [userInput, setUserInput] = useState("");
  const [parsedPreview, setParsedPreview] = useState<ParsedPreview | null>(null);

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
  

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <div className="mb-4 text-white">
      {!showTaskInput && (
        <button
          onClick={() => setShowTaskInput(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Task
        </button>
      )}

      {showTaskInput && (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 p-4 border rounded-lg bg-gray-800">
          <input
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              updatePreview(e.target.value);
            }}
            placeholder="E.g. 'Doctor appointment monday at 1pm'"
            className="w-full p-2 border rounded text-white bg-gray-900"
            autoFocus
          />
          
          {/* Preview parsed task */}
          {parsedPreview && parsedPreview.title && (
            <div className="text-sm bg-gray-700 p-2 rounded">
              <p><strong>Task:</strong> {parsedPreview.title}</p>
              {parsedPreview.date && (
                <p><strong>When:</strong> {formatPreviewDate(parsedPreview.date)}</p>
              )}
              {parsedPreview.recurring && (
                <p><strong>Repeats:</strong> {parsedPreview.recurring}</p>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Task
            </button>
            <button
              type="button"
              onClick={() => {
                setShowTaskInput(false);
                setUserInput("");
                setParsedPreview(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TodoInput;