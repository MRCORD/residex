"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, X, AlertCircle } from "lucide-react";

interface ImageUploadProps {
    maxImages?: number;
    maxSizeMB?: number;
    onImagesChange: (images: string[]) => void;
    resetTrigger?: number; // Change this value to trigger reset
}

export default function ImageUpload({
    maxImages = 3,
    maxSizeMB = 5,
    onImagesChange,
    resetTrigger = 0,
}: ImageUploadProps) {
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset images when resetTrigger changes
    useEffect(() => {
        if (resetTrigger > 0) {
            setImages([]);
            setError("");
        }
    }, [resetTrigger]);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setError("");

        // Check if adding these files would exceed max
        if (images.length + files.length > maxImages) {
            setError(`Maximum ${maxImages} photos allowed`);
            return;
        }

        // Process each file
        const newImages: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validate file type
            if (!file.type.startsWith("image/")) {
                setError("Only image files are allowed");
                continue;
            }

            // Validate file size
            const sizeMB = file.size / (1024 * 1024);
            if (sizeMB > maxSizeMB) {
                setError(`Image must be less than ${maxSizeMB}MB`);
                continue;
            }

            // Convert to base64
            try {
                const base64 = await fileToBase64(file);
                newImages.push(base64);
            } catch (err) {
                console.error("Error converting file:", err);
                setError("Error processing image");
            }
        }

        // Update state
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onImagesChange(updatedImages);

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onImagesChange(updatedImages);
        setError("");
    };

    const canAddMore = images.length < maxImages;

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                    📸 Photos ({images.length}/{maxImages})
                </label>
                {canAddMore && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                    >
                        + Add Photo
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-xs text-red-400">{error}</p>
                </div>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-2">
                {/* Existing Images */}
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-[var(--surface)] border border-[var(--border-subtle)] group"
                    >
                        <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>
                ))}

                {/* Add Button */}
                {canAddMore && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-lg border-2 border-dashed border-[var(--border)] hover:border-indigo-500 bg-[var(--surface)] hover:bg-[var(--surface-elevated)] flex flex-col items-center justify-center gap-1 transition-all group"
                    >
                        <Camera className="w-6 h-6 text-[var(--foreground-muted)] group-hover:text-indigo-400 transition-colors" />
                        <span className="text-xs text-[var(--foreground-subtle)] group-hover:text-indigo-400 transition-colors">
                            Add
                        </span>
                    </button>
                )}
            </div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Helper Text */}
            <p className="text-xs text-[var(--foreground-subtle)]">
                Max {maxImages} photos, {maxSizeMB}MB each. JPG, PNG, WebP supported.
            </p>
        </div>
    );
}
