import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { JobsList } from "./jobs-list";

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

            <JobsList jobs={jobs} />
        </div>
    );
}
