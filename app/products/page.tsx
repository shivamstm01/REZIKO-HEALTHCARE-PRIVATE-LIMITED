import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
                    Discover our range of premium healthcare devices and supplements designed
                    to improve your quality of life.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                    <Card key={product.id} className="flex flex-col overflow-hidden">
                        <div className="aspect-video w-full bg-muted relative">
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                                    No Image
                                </div>
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>{product.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-2xl font-bold mb-2">
                                {product.price ? `$${Number(product.price).toFixed(2)}` : 'Price on Request'}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {product.description}
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            {product.videoUrl && (
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={product.videoUrl} target="_blank">Watch Video</Link>
                                </Button>
                            )}
                            <Button className="w-full" asChild>
                                <Link href="/contact">Enquire Now</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                {products.length === 0 && (
                    <div className="col-span-full text-center py-12 border rounded-lg bg-muted/10">
                        <p className="text-muted-foreground">No products available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
