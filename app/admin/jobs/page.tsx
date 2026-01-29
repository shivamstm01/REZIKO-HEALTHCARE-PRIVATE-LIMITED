import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { deleteJob } from "@/lib/admin-actions";

export default async function AdminJobsPage() {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Job Postings</h1>
                <Button asChild>
                    <Link href="/admin/jobs/new">Post New Job</Link>
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job: any) => (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium">{job.title}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>{job.type}</TableCell>
                                <TableCell className="text-right">
                                    <form action={async () => {
                                        'use server';
                                        await deleteJob(job.id);
                                    }}>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                        {jobs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">No active job postings.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
