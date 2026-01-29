"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Briefcase, MapPin, Clock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

interface Job {
    id: string;
    title: string;
    location: string;
    type: string;
    experience?: string;
    description: string;
}

interface JobsListProps {
    jobs: Job[];
}

export function JobsList({ jobs }: JobsListProps) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    return (
        <>
            <div className="grid gap-6">
                {jobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center gap-6">
                                <div className="space-y-3 w-full flex flex-col items-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <h3 className="text-xl font-bold text-primary">{job.title}</h3>
                                        {job.type && (
                                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                {job.type}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground bg-muted/20 px-4 py-2 rounded-full">
                                        {job.experience && (
                                            <div className="flex items-center gap-1">
                                                <Briefcase className="w-4 h-4" />
                                                <span>Exp: {job.experience}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{job.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => setSelectedJob(job)}
                                    className="gap-2 px-8 min-w-[200px]"
                                >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {jobs.length === 0 && (
                    <div className="text-center py-16 border rounded-lg bg-muted/10">
                        <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold">No Openings Currently</h3>
                        <p className="text-muted-foreground">Please check back later for new opportunities.</p>
                    </div>
                )}
            </div>

            {/* Job Details Modal */}
            <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
                    {selectedJob && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-primary">{selectedJob.title}</DialogTitle>
                                <DialogDescription className="text-base flex flex-wrap gap-4 mt-2 justify-center sm:justify-start">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> {selectedJob.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" /> {selectedJob.type}
                                    </span>
                                    {selectedJob.experience && (
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="w-4 h-4" /> {selectedJob.experience} Experience
                                        </span>
                                    )}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex-1 pr-4 -mr-4 my-4 overflow-y-auto max-h-[60vh]">
                                <div className="space-y-4">
                                    <div className="prose dark:prose-invert max-w-none">
                                        <h4 className="font-semibold text-lg mb-2">Job Description</h4>
                                        <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-justify">
                                            {selectedJob.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="sm:justify-between gap-4 border-t pt-4">
                                <Button variant="outline" onClick={() => setSelectedJob(null)}>
                                    Close
                                </Button>
                                <Button size="lg" className="w-full sm:w-auto" asChild>
                                    <Link href={`/career/apply/${selectedJob.id}`}>
                                        Apply for this Position
                                    </Link>
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
