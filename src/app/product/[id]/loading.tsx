import { Loader } from "lucide-react";

function LoadingProductPage() { 
    return (
        <main className="flex flex-col items-center justify-center min-h-screen w-full">
            <Loader className="animate-spin"></Loader>
        </main>
    )
}

export default LoadingProductPage;