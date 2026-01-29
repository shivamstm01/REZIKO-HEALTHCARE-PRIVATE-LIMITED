import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ProductsTable } from "./products-table";

export default async function ProductsPage() {
    let products: any[] = [];
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
    } catch (error) {
        console.error("Failed to fetch products:", error);
        // Fallback to empty list
    }

    return (
        <div className="container py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Our Healthcare Products</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover our range of premium healthcare devices and supplements via our detailed catalog.
                </p>
            </div>

            <ProductsTable products={products} />
        </div>
    );
}
