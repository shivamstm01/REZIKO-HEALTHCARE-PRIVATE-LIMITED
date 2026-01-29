"use client";

import { useState, useEffect, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Eye, ZoomIn, ZoomOut, Download, RefreshCcw, Search,
    ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Product {
    id: string;
    name: string;
    type: string;
    price: number | null;
    description: string;
    imageUrl?: string;
    videoUrl?: string;
}

interface ProductsTableProps {
    products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isInternalOpen, setIsInternalOpen] = useState(false);
    const [zoom, setZoom] = useState(1);

    // Filter & Pagination State
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Reset zoom when product changes or modal opens
    useEffect(() => {
        setZoom(1);
    }, [selectedProduct, isInternalOpen]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, itemsPerPage]);

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.type.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }, [products, searchQuery]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleView = (product: Product) => {
        setSelectedProduct(product);
        setIsInternalOpen(true);
    };

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3.5));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));
    const handleResetZoom = () => setZoom(1);

    const handleDownload = () => {
        if (!selectedProduct?.imageUrl) return;
        const link = document.createElement("a");
        link.href = selectedProduct.imageUrl;
        link.download = `${selectedProduct.name.replace(/\s+/g, '-').toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="shadow-lg border-muted/40">
                <CardHeader className="bg-muted/10 pb-4 border-b">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl">Product Catalog</CardTitle>
                            <CardDescription>Browse and manage products list</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, type..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[80px] font-bold text-center">#</TableHead>
                                <TableHead className="font-bold">Product Information</TableHead>
                                <TableHead className="hidden lg:table-cell font-bold">Category</TableHead>
                                <TableHead className="font-bold text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedProducts.map((product, index) => (
                                <TableRow key={product.id} className="group hover:bg-muted/20 transition-colors">
                                    <TableCell className="text-center font-medium">{startIndex + index + 1}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-primary">{product.name}</span>
                                            <span className="text-sm text-muted-foreground line-clamp-1">{product.description}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            {product.type}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right pr-4">
                                        <Button
                                            size="sm"
                                            onClick={() => handleView(product)}
                                            className="opacity-90 hover:opacity-100 transition-opacity bg-primary/10 text-primary hover:bg-primary hover:text-white"
                                        >
                                            <Eye className="w-4 h-4 mr-2" /> View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {paginatedProducts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <Filter className="h-8 w-8 mb-2 opacity-20" />
                                            <p>No products matching your search.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>

                {/* Pagination Footer */}
                <div className="flex items-center justify-between px-4 py-4 border-t bg-muted/10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Show:</span>
                        <select
                            className="h-8 w-16 rounded-md border border-input bg-background px-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                        <span>per page</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground hidden sm:block mr-2">
                            Page {currentPage} of {totalPages || 1}
                        </div>
                        <div className="flex items-center space-x-1">
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0 lg:flex"
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                            >
                                <span className="sr-only">Go to first page</span>
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0 lg:flex"
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                <span className="sr-only">Go to last page</span>
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Enhanced View Details Modal (Max Width 7XL with 600px Height) */}
            <Dialog open={isInternalOpen} onOpenChange={setIsInternalOpen}>
                <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto p-4 sm:p-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl sm:text-3xl font-bold">{selectedProduct?.name}</DialogTitle>
                        <DialogDescription className="text-lg">{selectedProduct?.type}</DialogDescription>
                    </DialogHeader>

                    {selectedProduct && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                            {/* Left Col: Image Viewer (Span 2) */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="border rounded-xl bg-muted/30 p-2 overflow-hidden relative group h-[400px] lg:h-[600px] flex items-center justify-center">
                                    {selectedProduct.imageUrl ? (
                                        <div className="w-full h-full overflow-hidden flex items-center justify-center bg-black/5">
                                            <img
                                                src={selectedProduct.imageUrl}
                                                alt={selectedProduct.name}
                                                className="transition-transform duration-200 ease-in-out object-contain max-h-full max-w-full"
                                                style={{ transform: `scale(${zoom})` }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                                            No Image Available
                                        </div>
                                    )}

                                    {/* Image Controls */}
                                    {selectedProduct.imageUrl && (
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/90 backdrop-blur p-2 rounded-full shadow-lg border">
                                            <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={zoom <= 1} title="Zoom Out">
                                                <ZoomOut className="w-4 h-4" />
                                            </Button>
                                            <span className="flex items-center text-xs font-mono w-12 justify-center">{Math.round(zoom * 100)}%</span>
                                            <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={zoom >= 3.5} title="Zoom In">
                                                <ZoomIn className="w-4 h-4" />
                                            </Button>
                                            <div className="w-px h-6 bg-border mx-1" />
                                            <Button variant="ghost" size="icon" onClick={handleResetZoom} title="Reset Zoom">
                                                <RefreshCcw className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={handleDownload} title="Download Image">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Col: Details (Span 1) */}
                            <div className="space-y-6 flex flex-col h-full bg-muted/10 p-6 rounded-lg border">
                                <div>
                                    <h4 className="font-semibold text-xs text-muted-foreground uppercase mb-1 tracking-wider">Price</h4>
                                    <p className="text-3xl font-bold text-primary">
                                        {selectedProduct.price ? `$${Number(selectedProduct.price).toFixed(2)}` : 'Price on Request'}
                                    </p>
                                </div>

                                <div className="flex-1">
                                    <h4 className="font-semibold text-xs text-muted-foreground uppercase mb-2 tracking-wider">Description</h4>
                                    <div className="prose prose-sm dark:prose-invert max-h-[200px] overflow-y-auto">
                                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                            {selectedProduct.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3 mt-auto">
                                    {selectedProduct.videoUrl && (
                                        <Button variant="outline" className="w-full h-11" asChild>
                                            <Link href={selectedProduct.videoUrl} target="_blank">
                                                Watch Video Demo
                                            </Link>
                                        </Button>
                                    )}
                                    <Button className="w-full h-11 text-base shadow-md" asChild>
                                        <Link href="/contact">Enquire / Buy Now</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
