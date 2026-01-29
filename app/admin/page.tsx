import { db } from "@/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
    let productCount = 0;
    let jobCount = 0;
    let appCount = 0;
    let errorMsg = "";

    try {
        // Use getCountFromServer for efficiency, but fallback to 0 if it fails (offline)
        const productSnap = await getCountFromServer(collection(db, "products"));
        productCount = productSnap.data().count;

        const jobSnap = await getCountFromServer(collection(db, "jobs"));
        jobCount = jobSnap.data().count;

        const appSnap = await getCountFromServer(collection(db, "applications"));
        appCount = appSnap.data().count;
    } catch (e) {
        console.error("Dashboard fetch failed (likely DB offline):", e);
        errorMsg = "Database Connection Failed - Showing Offline Mode";
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            {errorMsg && (
                <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4" role="alert">
                    <p className="font-bold">Warning</p>
                    <p>{errorMsg}. Please create Firestore database in Firebase Console.</p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{productCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{jobCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Job Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{appCount}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
