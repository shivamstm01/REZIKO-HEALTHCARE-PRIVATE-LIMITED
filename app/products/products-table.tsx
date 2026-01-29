"use client";

import { useState, useEffect, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, ZoomIn, ZoomOut, Download, RefreshCcw, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";

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

const ITEMS_PER_PAGE = 5;

export function ProductsTable({ products }: ProductsTableProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isInternalOpen, setIsInternalOpen] = useState(false);
    const [zoom, setZoom] = useState(1);

    // Filter & Pagination State
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Reset zoom when product changes or modal opens
    useEffect(() => {
        setZoom(1);
    }, [selectedProduct, isInternalOpen]);

    // Reset page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

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
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
        <div className="space-y-4">
            {/* Search Filter */}
            <div className="flex items-center gap-2 max-w-sm">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9"
                />
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Sr. No.</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead className="hidden md:table-cell">Description</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedProducts.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{product.name}</span>
                                        <span className="text-xs text-muted-foreground md:hidden truncate max-w-[150px]">
                                            {product.description}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell max-w-sm truncate" title={product.description}>
                                    {product.description}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => handleView(product)}>
                                        <Eye className="w-4 h-4 mr-2" /> View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {paginatedProducts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    {searchQuery ? "No matching products found." : "No products available."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2 py-2">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Enhanced View Details Modal */}
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
