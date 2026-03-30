"use client";

import { useState } from "react";
import { Task, TaskStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSubmit: (task: Omit<Task, "id">) => void;
  initialData?: Task | null;
  close: () => void;
}

export default function TaskForm({ onSubmit, initialData, close }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<TaskStatus>(initialData?.status || "Todo");
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");

  const handleSubmit = () => {
    if (!title.trim() || !dueDate) return;

    onSubmit({ title, description, status, dueDate });
    close();
  };

  return (
    <div className="flex flex-col gap-3">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

      <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} className="border p-2 rounded">
        <option>Todo</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  );
}