'use client';

import { AlertCircle } from 'lucide-react';
import React from 'react';

function ProductErrorPage({
    error,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (
        <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">{error.message}</h2>
                    <p className="text-muted-foreground">Unable to load product information</p>
                    
                </div>
            </div>
    );
};

export default ProductErrorPage;