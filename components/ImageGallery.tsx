"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ImageGalleryProps {
    images: string[];
    initialIndex?: number;
    onClose: () => void;
}

export default function ImageGallery({
    images,
    initialIndex = 0,
    onClose,
}: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [zoom, setZoom] = useState(1);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") goToPrevious();
            if (e.key === "ArrowRight") goToNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
        setZoom(1);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        setZoom(1);
    };

    const toggleZoom = () => {
        setZoom((prev) => (prev === 1 ? 2 : 1));
    };

    if (images.length === 0) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/90 z-[100] animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Gallery Container */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors z-10"
                    aria-label="Close gallery"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {/* Image Counter */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="text-sm font-medium text-white">
                        {currentIndex + 1} / {images.length}
                    </span>
                </div>

                {/* Zoom Controls */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <button
                        onClick={() => setZoom(Math.max(1, zoom - 0.5))}
                        disabled={zoom <= 1}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Zoom out"
                    >
                        <ZoomOut className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={() => setZoom(Math.min(3, zoom + 0.5))}
                        disabled={zoom >= 3}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Zoom in"
                    >
                        <ZoomIn className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Previous Button */}
                {images.length > 1 && (
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                )}

                {/* Image */}
                <div
                    className="relative max-w-5xl max-h-[80vh] overflow-auto cursor-pointer"
                    onClick={toggleZoom}
                >
                    <img
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1}`}
                        className="w-full h-full object-contain transition-transform duration-200"
                        style={{ transform: `scale(${zoom})` }}
                    />
                </div>

                {/* Next Button */}
                {images.length > 1 && (
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                )}

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl bg-white/10 backdrop-blur-sm max-w-[90vw] overflow-x-auto">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setZoom(1);
                                }}
                                className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${index === currentIndex
                                        ? "border-white scale-110"
                                        : "border-transparent opacity-60 hover:opacity-100"
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
