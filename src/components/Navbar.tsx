"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-between mb-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}