'use client';

import { createJob } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewJobPage() {
    return (
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Post New Job</h1>
            <form action={createJob} className="space-y-6 border p-6 rounded-lg bg-background">
                <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" name="title" required placeholder="e.g. Senior Nurse" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" required placeholder="New York, NY" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Input id="type" name="type" placeholder="Full-time, Part-time" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="experience">Required Experience</Label>
                    <Input id="experience" name="experience" placeholder="e.g. 2-5 years" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" required />
                </div>
                <div className="flex gap-4">
                    <Button type="submit">Post Job</Button>
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
