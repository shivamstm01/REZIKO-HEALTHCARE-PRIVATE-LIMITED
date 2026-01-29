import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
import { deleteProduct } from "@/lib/admin-actions";

export default async function AdminProductsPage() {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Products</h1>
                <Button asChild>
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product: any) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.type}</TableCell>
                                <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </Button>
                                    <form action={async () => {
                                        'use server';
                                        await deleteProduct(product.id);
                                    }}>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">No products found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
