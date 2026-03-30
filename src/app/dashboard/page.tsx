"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
import Navbar from "@/components/Navbar";
import TaskTable from "@/components/TaskTable";
import TaskForm from "@/components/TaskForm";
import { Task } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    }
  }, [router]);

  const filtered = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (filter === "All" ? true : t.status === filter))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="p-6">
      <Navbar />

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option className="bg-white text-black dark:bg-zinc-900 dark:text-white">All</option>
          <option className="bg-white text-black dark:bg-zinc-900 dark:text-white">Todo</option>
          <option className="bg-white text-black dark:bg-zinc-900 dark:text-white">In Progress</option>
          <option className="bg-white text-black dark:bg-zinc-900 dark:text-white">Completed</option>
        </select>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>

          <DialogContent>
            <TaskForm
              key={editing?.id || 'new'}
              onSubmit={(data) => {
                if (editing) {
                  updateTask({ ...editing, ...data });
                } else {
                  addTask(data);
                }
              }}
              initialData={editing}
              close={() => {
                setOpen(false);
                setEditing(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <TaskTable
        tasks={filtered}
        onEdit={(task) => {
          setEditing(task);
          setOpen(true);
        }}
        onDelete={deleteTask}
        onStatusChange={(task, status) => updateTask({ ...task, status })}
      />
    </div>
  );
}