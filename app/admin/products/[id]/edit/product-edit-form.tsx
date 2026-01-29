'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ProductEditForm({ product, updateAction }: { product: any, updateAction: (formData: FormData) => void }) {
    return (
        <form action={updateAction} className="space-y-6 border p-6 rounded-lg bg-background">
            <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" defaultValue={product.name} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type">Product Type</Label>
                    <Input id="type" name="type" defaultValue={product.type} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Price ($) <span className="text-xs text-muted-foreground">(Optional)</span></Label>
                    <Input id="price" name="price" type="number" step="0.01" defaultValue={product.price ? Number(product.price) : ""} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={product.description} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="image">Update Image (Max 150KB)</Label>
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && file.size > 150 * 1024) {
                                alert("File size exceeds 150KB!");
                                e.target.value = "";
                            }
                        }}
                    />
                    {product.imageUrl && <p className="text-xs text-muted-foreground">Current image exists.</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <Input id="videoUrl" name="videoUrl" defaultValue={product.videoUrl} placeholder="https://youtube.com/..." />
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit">Update Product</Button>
                <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
            </div>
        </form>
    );
}
