"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  Calendar,
  BarChart2,
  ArrowRight,
  Settings,
  Filter,
  ChevronDown,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";

type Task = {
  title: string;
  time: string;
  priorityColor: string;
};

type Metric = {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
};

const initialMockTasks: Task[] = [
  {
    title: "Client Meeting",
    time: "10:30 AM",
    priorityColor: "bg-red-500",
  },
  {
    title: "Project Presentation",
    time: "1:00 PM",
    priorityColor: "bg-yellow-500",
  },
  {
    title: "Review Pull Requests",
    time: "3:30 PM",
    priorityColor: "bg-green-500",
  },
  {
    title: "Team Standup",
    time: "5:00 PM",
    priorityColor: "bg-blue-500",
  },
];

const MAX_TASKS = initialMockTasks.length + 1;

const InteractiveDashboard = () => {
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "pending">(
    "all"
  );
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const [tasks, setTasks] = useState<Task[]>(initialMockTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showLimitMessage, setShowLimitMessage] = useState(false);

  type TaskStatusType = Record<string, boolean>;

  const [taskStatus, setTaskStatus] = useState<TaskStatusType>({
    "Client Meeting": false,
    "Project Presentation": false,
    "Review Pull Requests": false,
    "Team Standup": false,
  });

  const [selectedDay, setSelectedDay] = useState<string>("Wed");

  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: "Tasks Completed",
      value: "0",
      change: "0% vs last week",
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
    },
    {
      label: "In Progress",
      value: "4",
      change: "4 due today",
      icon: <Clock className="w-5 h-5 text-yellow-400" />,
    },
    {
      label: "Efficiency",
      value: "92%",
      change: "+8% vs last week",
      icon: <BarChart2 className="w-5 h-5 text-indigo-400" />,
    },
  ]);

  const handleTaskCompletion = (taskTitle: string) => {
    if (taskTitle in taskStatus) {
      const newTaskStatus = {
        ...taskStatus,
        [taskTitle]: !taskStatus[taskTitle],
      };
      setTaskStatus(newTaskStatus);

      const completedCount = Object.values(newTaskStatus).filter(
        (status) => status
      ).length;

      setMetrics((prev) => {
        const newMetrics = [...prev];
        newMetrics[0] = {
          ...newMetrics[0],
          value: `${completedCount}`,
          change: `${completedCount > 0 ? "+" : ""}${Math.round(
            ((completedCount - 0) / 24) * 100
          )}% vs last week`,
        };
        newMetrics[1] = {
          ...newMetrics[1],
          value: `${tasks.length - completedCount}`,
          change: `${tasks.length - completedCount} due today`,
        };
        return newMetrics;
      });
    }
  };

  const handleAddTask = () => {
    if (tasks.length >= MAX_TASKS) {
      setShowLimitMessage(true);
      setTimeout(() => setShowLimitMessage(false), 3000);
      setIsAddingTask(false);
      setNewTaskTitle("");
      return;
    }

    if (newTaskTitle.trim()) {
      const newTask: Task = {
        title: newTaskTitle,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        priorityColor: "bg-indigo-500",
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      setTaskStatus((prev) => ({
        ...prev,
        [newTaskTitle]: false,
      }));

      setMetrics((prev) => {
        const newMetrics = [...prev];
        const completedCount = Object.values(taskStatus).filter(
          (status) => status
        ).length;

        newMetrics[1] = {
          ...newMetrics[1],
          value: `${updatedTasks.length - completedCount}`,
          change: `${updatedTasks.length - completedCount} due today`,
        };
        return newMetrics;
      });

      setNewTaskTitle("");
      setIsAddingTask(false);
    }
  };

  const handleCancelAdd = () => {
    setIsAddingTask(false);
    setNewTaskTitle("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return taskStatus[task.title];
    if (activeTab === "pending") return !taskStatus[task.title];
    return true;
  });

  return (
    <div className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/api/placeholder/400/400')] opacity-20"></div>

      <div className="absolute right-1/3 top-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute left-1/3 bottom-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <BarChart2 className="w-4 h-4 text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-white">
                Interactive Dashboard
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Interact
              </span>{" "}
              With Your Tasks
            </h2>

            <p className="text-lg text-gray-300 mb-8">
              This dashboard is fully interactive! Try clicking on the tasks to
              mark them as complete, select different days on the chart, or
              click on tabs to filter your view. All changes will be reflected
              in your metrics in real-time.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                  <CheckCircle className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">
                    Mark Tasks Complete
                  </h3>
                  <p className="text-gray-300">
                    Click on any task in the dashboard to toggle its completion
                    status.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                  <BarChart2 className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">
                    Interactive Charts
                  </h3>
                  <p className="text-gray-300">
                    Click on different days to see detailed information for that
                    specific day.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                  <Filter className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">
                    Filter Your View
                  </h3>
                  <p className="text-gray-300">
                    Use the tabs to filter tasks by their status or priority.
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-10 flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-semibold rounded-full transition-all duration-500 shadow-lg hover:shadow-indigo-500/25">
              Get Started Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                <div className="bg-gray-900/90 rounded-xl overflow-hidden">
                  {/* Dashboard Header */}
                  <div className="bg-black/60 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-center text-white/80 text-sm">
                      TaskX Dashboard
                    </div>
                    <div className="w-16 flex justify-end">
                      <button className="text-white/70 hover:text-white">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {metrics.map((metric, index) => (
                        <div
                          key={index}
                          className="bg-white/5 rounded-lg p-4 border border-white/10 transition-all duration-300 hover:bg-white/10 cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">
                              {metric.label}
                            </span>
                            {metric.icon}
                          </div>
                          <div className="text-2xl font-bold text-white">
                            {metric.value}
                          </div>
                          <div
                            className={`text-xs ${
                              metric.change.includes("+")
                                ? "text-green-400"
                                : "text-indigo-400"
                            } mt-1`}
                          >
                            {metric.change}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Chart with interactive bars */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-medium">
                          Weekly Progress
                        </span>
                        <div className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded flex items-center gap-1 cursor-pointer">
                          This Week
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Add summary for selected day */}
                      <div className="mb-3 px-2 py-1 text-xs bg-indigo-500/10 text-indigo-300 rounded">
                        {selectedDay}:{" "}
                        {
                          {
                            Mon: "4 tasks completed (40%)",
                            Tue: "6 tasks completed (60%)",
                            Wed: "9 tasks completed (75%)",
                            Thu: "5 tasks completed (50%)",
                            Fri: "11 tasks completed (85%)",
                            Sat: "3 tasks completed (30%)",
                            Sun: "6 tasks completed (55%)",
                          }[selectedDay]
                        }
                      </div>

                      <div className="h-24 flex items-end justify-between gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day, i) => {
                            const height = [40, 60, 75, 50, 85, 30, 55][i];
                            const tasksCompleted = [4, 6, 9, 5, 11, 3, 6][i];

                            return (
                              <div
                                key={day}
                                className="flex flex-col items-center relative group"
                                onClick={() => setSelectedDay(day)}
                              >
                                <div
                                  className={`w-6 bg-gradient-to-t from-blue-500 to-indigo-600 rounded-sm cursor-pointer transition-all duration-300 ${
                                    selectedDay === day
                                      ? "from-purple-500 to-indigo-600 ring-2 ring-purple-400"
                                      : ""
                                  }`}
                                  style={{ height: `${height}%` }}
                                >
                                  {/* Tooltip */}
                                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity">
                                    {tasksCompleted} tasks
                                  </div>
                                </div>
                                <span
                                  className={`text-xs mt-2 ${
                                    selectedDay === day
                                      ? "text-white"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {day}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2 text-sm">
                          <button
                            className={`px-3 py-1 rounded ${
                              activeTab === "all"
                                ? "bg-indigo-500 text-white"
                                : "text-gray-400"
                            }`}
                            onClick={() => setActiveTab("all")}
                          >
                            All
                          </button>
                          <button
                            className={`px-3 py-1 rounded ${
                              activeTab === "completed"
                                ? "bg-indigo-500 text-white"
                                : "text-gray-400"
                            }`}
                            onClick={() => setActiveTab("completed")}
                          >
                            Completed
                          </button>
                          <button
                            className={`px-3 py-1 rounded ${
                              activeTab === "pending"
                                ? "bg-indigo-500 text-white"
                                : "text-gray-400"
                            }`}
                            onClick={() => setActiveTab("pending")}
                          >
                            Pending
                          </button>
                        </div>
                        <div className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">
                          Today
                        </div>
                      </div>

                      {/* Task limit message */}
                      {showLimitMessage && (
                        <div className="mb-3 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center text-yellow-300 text-sm">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          This is a demo dashboard. Maximum of one custom task
                          allowed.
                        </div>
                      )}

                      <div className="space-y-3 min-h-64">
                        {filteredTasks.map((task, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-2 rounded-lg ${
                              selectedTask === task.title
                                ? "bg-indigo-500/20"
                                : "bg-white/5"
                            } border ${
                              taskStatus[task.title]
                                ? "border-green-500/30"
                                : "border-white/5"
                            } transition-all duration-300 hover:bg-white/10 cursor-pointer`}
                            onClick={() => {
                              setSelectedTask(task.title);
                              handleTaskCompletion(task.title);
                            }}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                  taskStatus[task.title]
                                    ? "bg-green-500"
                                    : task.priorityColor
                                } mr-3`}
                              >
                                {taskStatus[task.title] && (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span
                                className={`text-sm ${
                                  taskStatus[task.title]
                                    ? "text-gray-400 line-through"
                                    : "text-white"
                                }`}
                              >
                                {task.title}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400">
                              {task.time}
                            </div>
                          </div>
                        ))}

                        {isAddingTask ? (
                          <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                            <div className="flex items-center mb-2">
                              <input
                                type="text"
                                className="flex-grow bg-black/40 text-white border border-indigo-500/30 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Task name"
                                value={newTaskTitle}
                                onChange={(e) =>
                                  setNewTaskTitle(e.target.value)
                                }
                                autoFocus
                              />
                            </div>
                            <div className="flex space-x-2">
                              <button
                                className="flex-grow text-xs bg-indigo-500 text-white px-3 py-1 rounded"
                                onClick={handleAddTask}
                              >
                                Add Task
                              </button>
                              <button
                                className="text-xs bg-gray-700 text-white px-3 py-1 rounded"
                                onClick={handleCancelAdd}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`flex items-center justify-center p-2 rounded-lg ${
                              tasks.length >= MAX_TASKS
                                ? "bg-gray-500/10 border-gray-500/20 text-gray-400 cursor-not-allowed"
                                : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 cursor-pointer hover:bg-indigo-500/20"
                            } border transition-all`}
                            onClick={() => {
                              if (tasks.length < MAX_TASKS) {
                                setIsAddingTask(true);
                              } else {
                                setShowLimitMessage(true);
                                setTimeout(
                                  () => setShowLimitMessage(false),
                                  3000
                                );
                              }
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              {tasks.length >= MAX_TASKS
                                ? "Demo Limit Reached"
                                : "Add New Task"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDashboard;
