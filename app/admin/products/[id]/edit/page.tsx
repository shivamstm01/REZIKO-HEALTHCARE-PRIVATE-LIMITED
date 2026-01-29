import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { updateProduct } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { notFound } from "next/navigation";
import { ProductEditForm } from "./product-edit-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const productDoc = await getDoc(doc(db, "products", id));

    if (!productDoc.exists()) {
        notFound();
    }

    const product = productDoc.data() as any;
    const updateProductWithId = updateProduct.bind(null, id);

    return (
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <ProductEditForm product={product} updateAction={updateProductWithId} />
        </div>
    );
}
