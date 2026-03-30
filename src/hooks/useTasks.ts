"use client";

import { useEffect, useState } from "react";
import { Task } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          console.log("Error parsing tasks");
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { ...task, id: uuidv4() }]);
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask };
}