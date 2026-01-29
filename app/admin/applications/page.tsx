import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminApplicationsPage() {
    const querySnapshot = await getDocs(collection(db, "applications"));
    const applications = await Promise.all(querySnapshot.docs.map(async (appDoc) => {
        const data = appDoc.data();
        let jobTitle = "Unknown Job";
        if (data.jobId) {
            const jobSnap = await getDoc(doc(db, "jobs", data.jobId));
            if (jobSnap.exists()) {
                jobTitle = jobSnap.data().title;
            }
        }
        return { id: appDoc.id, ...data, jobTitle } as any;
    }));

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Applications</h1>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Resume</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map((app: any) => (
                            <TableRow key={app.id}>
                                <TableCell className="font-medium">{app.name}</TableCell>
                                <TableCell>{app.jobTitle}</TableCell>
                                <TableCell>{app.email}</TableCell>
                                <TableCell>{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    {app.resumeUrl ? (
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={app.resumeUrl} target="_blank">View Resume</Link>
                                        </Button>
                                    ) : (
                                        <span className="text-muted-foreground text-sm">N/A</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {applications.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">No applications received yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
