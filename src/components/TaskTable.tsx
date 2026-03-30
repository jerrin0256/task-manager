"use client";

import { Task, TaskStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (task: Task, status: TaskStatus) => void;
}

export default function TaskTable({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  return (
    <table className="w-full border mt-4 text-black dark:text-white">
      <thead>
        <tr className="border">
          <th className="bg-white dark:bg-zinc-900">Title</th>
          <th className="bg-white dark:bg-zinc-900">Status</th>
          <th className="bg-white dark:bg-zinc-900">Due</th>
          <th className="bg-white dark:bg-zinc-900">Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="border text-center">
            <td className="bg-white dark:bg-zinc-900">{task.title}</td>

            <td className="bg-white dark:bg-zinc-900">
              <select
                className="bg-white text-black dark:bg-zinc-900 dark:text-white border dark:border-zinc-700 rounded"
                value={task.status}
                onChange={(e) =>
                  onStatusChange(task, e.target.value as TaskStatus)
                }
              >
                <option className="bg-white text-black dark:bg-zinc-900 dark:text-white">Todo</option>
                <option className="bg-white text-black dark:bg-zinc-900 dark:text-white">In Progress</option>
                <option className="bg-white text-black dark:bg-zinc-900 dark:text-white">Completed</option>
              </select>
            </td>

            <td className="bg-white dark:bg-zinc-900">{task.dueDate}</td>

            <td className="flex gap-2 justify-center bg-white dark:bg-zinc-900">
              <Button onClick={() => onEdit(task)}>Edit</Button>
              <Button variant="destructive" onClick={() => onDelete(task.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}