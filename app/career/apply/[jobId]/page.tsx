import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitApplication } from "@/lib/application-actions";

export default async function JobApplyPage({ params }: { params: Promise<{ jobId: string }> }) {
    const { jobId } = await params;
    const jobSnap = await getDoc(doc(db, "jobs", jobId));

    if (!jobSnap.exists()) {
        notFound();
    }

    const job = jobSnap.data() as any;

    return (
        <div className="max-w-2xl mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Apply for {job.title}</h1>
                <p className="text-muted-foreground">{job.location} • {job.type}</p>
            </div>

            <form action={submitApplication} className="space-y-6 border p-6 rounded-lg bg-background">
                <input type="hidden" name="jobId" value={jobId} />
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" required placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" required placeholder="+1 (555) 000-0000" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="resume">Resume (PDF)</Label>
                    <Input id="resume" name="resume" type="file" disabled className="cursor-not-allowed opacity-50" />
                    <p className="text-xs text-muted-foreground">Resume upload is currently disabled. Submitting will use a placeholder.</p>
                </div>

                <div className="flex gap-4">
                    <Button type="submit">Submit Application</Button>
                    <Button variant="outline" type="button" asChild>
                        <a href="/career">Cancel</a>
                    </Button>
                </div>
            </form>
        </div>
    );
}
