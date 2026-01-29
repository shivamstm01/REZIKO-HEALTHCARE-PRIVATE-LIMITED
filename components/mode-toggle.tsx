"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme("light")} className="dark:hidden">
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Light Mode</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme("dark")} className="hidden dark:flex">
                <Moon className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Dark Mode</span>
            </Button>
        </div>
    )
}
