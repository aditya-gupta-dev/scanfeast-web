'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Smartphone,
  Search,
  Zap,
  ShieldCheck,
  Instagram,
  Twitter,
  Facebook,
  Github,
  Utensils,
  ScanLine,
} from "lucide-react"
import { redirect } from "next/navigation"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import img from '../../public/img.png';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanLine className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ScanFeast</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Scan Your Food, <br />
                    <span className="text-primary">Know What You Eat</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ScanFeast uses AI to instantly analyze your food, providing nutritional information, ingredients,
                    and dietary insights in seconds.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    <SignedOut>
                    <SignInButton>
                      Get Started
                    </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <Link href="/dashboard">
                        Visit Dashboard
                      </Link>
                    </SignedIn>
                  </Button>
                  
                  <Button size="lg" variant="outline" onClick={() => redirect('/#features')}>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[400px] aspect-square rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={img}
                    alt="ScanFeast app interface showing food scanning"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover what makes ScanFeast the ultimate food scanning companion
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <ScanLine className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Instant Scanning</h3>
                <p className="text-center text-muted-foreground">
                  Point your camera at any food item and get detailed information in seconds.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Nutritional Analysis</h3>
                <p className="text-center text-muted-foreground">
                  Get comprehensive nutritional information including calories, macros, and vitamins.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Ingredient Detection</h3>
                <p className="text-center text-muted-foreground">
                  Identify all ingredients in processed foods, including potential allergens.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Diet Compatibility</h3>
                <p className="text-center text-muted-foreground">
                  Check if foods match your dietary preferences: vegan, keto, paleo, and more.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Allergen Alerts</h3>
                <p className="text-center text-muted-foreground">
                  Receive immediate warnings about potential allergens in your food.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Offline Mode</h3>
                <p className="text-center text-muted-foreground">
                  Use core features even without an internet connection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple Pricing</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that right for your nutritional journey
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              {/* Free Tier */}
              <div className="flex flex-col rounded-lg border shadow-sm overflow-hidden">
                <div className="p-6 bg-muted/30">
                  <h3 className="text-4xl font-bold">Free</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">$0</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Perfect for casual users who want to make healthier food choices.
                  </p>
                </div>
                <div className="flex flex-col p-6 space-y-4 flex-1">
                  <ul className="space-y-4 flex-1">
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <ScanLine className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Basic Food Scanning</p>
                        <p className="text-sm text-muted-foreground">
                          Scan food items to identify basic nutritional information including calories, carbs, protein,
                          and fat content.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <Utensils className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Nutrition Planning</p>
                        <p className="text-sm text-muted-foreground">
                          Create simple meal plans and track your daily nutritional intake with our easy-to-use planning
                          tools.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <Search className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Food Database Access</p>
                        <p className="text-sm text-muted-foreground">
                          Access our extensive database of common foods and ingredients to make informed dietary
                          choices.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button variant="outline" size="lg" className="mt-6">
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Pro Tier */}
              <div className="flex flex-col rounded-lg border shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Popular
                </div>
                <div className="p-6 bg-primary text-primary-foreground">
                  <h3 className="text-4xl font-bold">Popular</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">$9.99</span>
                    <span className="ml-1">/month</span>
                  </div>
                  <p className="mt-4">For health enthusiasts who want advanced insights and personalized guidance.</p>
                </div>
                <div className="flex flex-col p-6 space-y-4 flex-1 bg-muted/10">
                  <ul className="space-y-4 flex-1">
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <ScanLine className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Everything in Free</p>
                        <p className="text-sm text-muted-foreground">
                          All the features included in the Free tier, plus advanced capabilities and premium support.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">AI-Powered Nutrition Analysis</p>
                        <p className="text-sm text-muted-foreground">
                          Receive detailed, personalized insights about your foods nutritional value with advanced AI
                          that adapts to your dietary goals.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">AI Nutritionist Chat</p>
                        <p className="text-sm text-muted-foreground">
                          Chat with our AI nutritionist for personalized advice, recipe suggestions, and answers to all
                          your diet-related questions.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <Smartphone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Unlimited Scans</p>
                        <p className="text-sm text-muted-foreground">
                          Scan as many food items as you want with no daily or monthly limits, perfect for detailed meal
                          tracking.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button size="lg" className="mt-6">
                    Upgrade to Pro
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Eating Habits?
                </h2>
                <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of health-conscious users making smarter food choices every day.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="gap-1">
                  <Smartphone className="h-5 w-5" />
                  Download Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => redirect('/#features')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <ScanLine className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">ScanFeast</span>
              </div>
              <p className="text-muted-foreground max-w-[400px]">
                ScanFeast is revolutionizing how people understand their food with AI-powered scanning technology.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Updates
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Cookies
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Licenses
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ScanFeast. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-4 md:mt-0">Made with ❤️ for healthier eating</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
