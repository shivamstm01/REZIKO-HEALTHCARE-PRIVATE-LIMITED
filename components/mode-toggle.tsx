"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme("dark")} className="dark:hidden">
                <Moon className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Switch to Dark Mode</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme("light")} className="hidden dark:flex">
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Switch to Light Mode</span>
            </Button>
        </div>
    )
}
