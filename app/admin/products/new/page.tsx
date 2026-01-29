'use client';

import { createProduct } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewProductPage() {
    return (
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <form action={createProduct} className="space-y-6 border p-6 rounded-lg bg-background">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="type">Product Type</Label>
                        <Input id="type" name="type" placeholder="Device, Supplement, etc." required />
                    </div>
                    <div className="space-y-2">
                        {/* Price is optional now */}
                        <Label htmlFor="price">Price ($) <span className="text-xs text-muted-foreground">(Optional)</span></Label>
                        <Input id="price" name="price" type="number" step="0.01" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="image">Product Image (Max 150KB)</Label>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file && file.size > 150 * 1024) {
                                    alert("File size exceeds 150KB!");
                                    e.target.value = ""; // Clear input
                                }
                            }}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="videoUrl">Video URL</Label>
                        <Input id="videoUrl" name="videoUrl" placeholder="https://youtube.com/..." />
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button type="submit">Create Product</Button>
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
