import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CareerPage() {
    let jobs: any[] = [];
    try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        // Fallback to empty list
    }

    return (
        <div className="container py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    At Reziko Healthcare, we are dedicated to saving lives and improving health.
                    Explore our open positions and be part of a mission that matters.
                </p>
            </div>

            <div className="grid gap-6">
                {jobs.map((job: any) => (
                    <Card key={job.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>{job.title}</CardTitle>
                                    <CardDescription>{job.location} • {job.type}</CardDescription>
                                </div>
                                <Button asChild>
                                    <Link href={`/career/apply/${job.id}`}>Apply Now</Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300">
                                {job.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
                {jobs.length === 0 && (
                    <div className="text-center py-12 border rounded-lg bg-muted/10">
                        <p className="text-muted-foreground">No current openings. Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
