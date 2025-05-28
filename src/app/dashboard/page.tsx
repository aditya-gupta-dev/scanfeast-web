import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Scan } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
    return(
            <main className="flex flex-col w-full min-h-screen">
        <SignedOut>
            <SignInButton>
                <Button>
                Sign in to access dashboard
                </Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <div className="flex flex-1 justify-center items-center">
                <Link href={"/scan"}>
                    <Button>
                    <Scan/>
                    Scan Now    
                    </Button>
                </Link>
            </div>
        </SignedIn>
            </main>
    )
}