// import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {  Award, Leaf, ShoppingBag, Tag } from "lucide-react"
import Image from "next/image"

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const id = (await params).id

    let res = undefined;
    let product = undefined; 
    
    try {
        res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`)
    } catch {
        if(res) {        
            throw new Error(`${res.status} Status Code`)
        }
    }
    
    if(res && res.ok) {
        const json = await res.json()
        product = json.product
        if(product === null || product === undefined) { 
            throw new Error("Product not found")
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Image Column */}
                <div className="lg:col-span-1">
                    <Card className="overflow-hidden">
                        <div className="relative aspect-square">
                            <Image
                                src={product.image_front_url || "/placeholder.svg?height=400&width=400"}
                                alt={product.product_name}
                                fill
                                className="object-contain p-4"
                                priority
                            />
                        </div>
                        <CardContent className="p-4">
                            <div className="flex flex-wrap gap-2 mt-4">
                                {console.log("CAte", product.categories_tags)}
                                {product.categories_tags.slice(0, 5).map((tag: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                        {tag.replace("en:", "").replace(/-/g, " ")}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Product Details Column */}
                <div className="lg:col-span-2">
                    <Card className="mb-6">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs font-normal px-2 py-0">
                                    {product.code}
                                </Badge>
                                <Badge variant="outline" className="text-xs font-normal px-2 py-0 bg-red-50">
                                    {product.brands}
                                </Badge>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl">{product.product_name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4" />
                                <span>
                                    Quantity: {product.quantity} • Serving size: {product.serving_size}
                                </span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="nutrition">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                                    <TabsTrigger value="scores">Scores</TabsTrigger>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                </TabsList>

                                {/* Nutrition Tab */}
                                <TabsContent value="nutrition" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg">Nutrition Facts</CardTitle>
                                                <CardDescription>Per serving ({product.serving_size})</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between py-1">
                                                        <span className="font-medium">Energy</span>
                                                        <span>{product.nutriments["energy-kcal_serving"]} kcal</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex justify-between py-1">
                                                        <span className="font-medium">Fat</span>
                                                        <span
                                                            className={`${product.nutrient_levels.fat === "low" ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {product.nutriments.fat} g
                                                        </span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex justify-between py-1">
                                                        <span className="font-medium">Saturated Fat</span>
                                                        <span
                                                            className={`${product.nutrient_levels["saturated-fat"] === "low" ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {product.nutriments["saturated-fat"]} g
                                                        </span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex justify-between py-1">
                                                        <span className="font-medium">Carbohydrates</span>
                                                        <span>{product.nutriments.carbohydrates} g</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex justify-between py-1">
                                                        <span className="font-medium">Sugars</span>
                                                        <span
                                                            className={`${product.nutrient_levels.sugars === "high" ? "text-red-600" : "text-green-600"}`}
                                                        >
                                                            {product.nutriments.sugars} g
                                                        </span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex justify-between py-1">
                                                        <span className="font-medium">Fiber</span>
                                                        <span>{product.nutriments.fiber} g</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex justify-between py-1">
                                                        <span className="font-medium">Proteins</span>
                                                        <span>{product.nutriments.proteins} g</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex justify-between py-1">
                                                        <span className="font-medium">Salt</span>
                                                        <span
                                                            className={`${product.nutrient_levels.salt === "high" ? "text-red-600" : "text-green-600"}`}
                                                        >
                                                            {product.nutriments.salt} g
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <div className="space-y-4">
                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-lg">Nutrient Levels</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="flex justify-between mb-1">
                                                                <span>Fat</span>
                                                                <span
                                                                    className={`capitalize ${product.nutrient_levels.fat === "low" ? "text-green-600" : "text-red-600"}`}
                                                                >
                                                                    {product.nutrient_levels.fat}
                                                                </span>
                                                            </div>
                                                            <Progress
                                                                value={product.nutrient_levels.fat === "low" ? 25 : 75}
                                                                className={`${product.nutrient_levels.fat === "low" ? "bg-green-200" : "bg-red-200"}`}
                                                            />
                                                        </div>

                                                        <div>
                                                            <div className="flex justify-between mb-1">
                                                                <span>Saturated Fat</span>
                                                                <span
                                                                    className={`capitalize ${product.nutrient_levels["saturated-fat"] === "low" ? "text-green-600" : "text-red-600"}`}
                                                                >
                                                                    {product.nutrient_levels["saturated-fat"]}
                                                                </span>
                                                            </div>
                                                            <Progress
                                                                value={product.nutrient_levels["saturated-fat"] === "low" ? 25 : 75}
                                                                className={`${product.nutrient_levels["saturated-fat"] === "low" ? "bg-green-200" : "bg-red-200"}`}
                                                            />
                                                        </div>

                                                        <div>
                                                            <div className="flex justify-between mb-1">
                                                                <span>Sugars</span>
                                                                <span
                                                                    className={`capitalize ${product.nutrient_levels.sugars === "high" ? "text-red-600" : "text-green-600"}`}
                                                                >
                                                                    {product.nutrient_levels.sugars}
                                                                </span>
                                                            </div>
                                                            <Progress
                                                                value={product.nutrient_levels.sugars === "high" ? 75 : 25}
                                                                className={`${product.nutrient_levels.sugars === "high" ? "bg-red-200" : "bg-green-200"}`}
                                                            />
                                                        </div>

                                                        <div>
                                                            <div className="flex justify-between mb-1">
                                                                <span>Salt</span>
                                                                <span
                                                                    className={`capitalize ${product.nutrient_levels.salt === "high" ? "text-red-600" : "text-green-600"}`}
                                                                >
                                                                    {product.nutrient_levels.salt}
                                                                </span>
                                                            </div>
                                                            <Progress
                                                                value={product.nutrient_levels.salt === "high" ? 75 : 25}
                                                                className={`${product.nutrient_levels.salt === "high" ? "bg-red-200" : "bg-green-200"}`}
                                                            />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <div className="grid grid-cols-2 gap-4">
                                                <Card className="bg-gradient-to-br from-red-50 to-red-100">
                                                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                                        <div className="text-4xl font-bold text-red-500 mb-2">
                                                            {product.nutriscore_grade.toUpperCase()}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">Nutri-Score</div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="bg-gradient-to-br from-green-50 to-green-100">
                                                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                                        <div className="text-4xl font-bold text-green-500 mb-2">
                                                            {product.ecoscore_grade.toUpperCase()}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">Eco-Score</div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Scores Tab */}
                                <TabsContent value="scores" className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg">Nutri-Score</CardTitle>
                                                    <Badge
                                                        variant="outline"
                                                        className={`
                            ${product.nutriscore_grade === "a" ? "bg-green-100 text-green-800" : ""}
                            ${product.nutriscore_grade === "b" ? "bg-lime-100 text-lime-800" : ""}
                            ${product.nutriscore_grade === "c" ? "bg-yellow-100 text-yellow-800" : ""}
                            ${product.nutriscore_grade === "d" ? "bg-orange-100 text-orange-800" : ""}
                            ${product.nutriscore_grade === "e" ? "bg-red-100 text-red-800" : ""}
                          `}
                                                    >
                                                        Grade {product.nutriscore_grade.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <CardDescription>Nutritional quality score</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="mt-2">
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-sm text-muted-foreground">Better</span>
                                                        <span className="text-sm text-muted-foreground">Worse</span>
                                                    </div>
                                                    <div className="flex h-4 rounded-full overflow-hidden">
                                                        <div className="bg-green-500 w-1/5 flex items-center justify-center text-xs text-white font-bold">
                                                            A
                                                        </div>
                                                        <div className="bg-lime-500 w-1/5 flex items-center justify-center text-xs text-white font-bold">
                                                            B
                                                        </div>
                                                        <div className="bg-yellow-500 w-1/5 flex items-center justify-center text-xs text-white font-bold">
                                                            C
                                                        </div>
                                                        <div className="bg-orange-500 w-1/5 flex items-center justify-center text-xs text-white font-bold">
                                                            D
                                                        </div>
                                                        <div className="bg-red-500 w-1/5 flex items-center justify-center text-xs text-white font-bold relative">
                                                            E
                                                            {product.nutriscore_grade === "e" && (
                                                                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                                                                    <span className="text-white text-xs">•</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <p className="text-sm">Score: {product.nutriscore_score} points</p>
                                                        <p className="text-sm text-muted-foreground mt-2">
                                                            The Nutri-Score is calculated based on the nutritional quality of the product. Lower
                                                            scores are better.
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg">Eco-Score</CardTitle>
                                                    <Badge
                                                        variant="outline"
                                                        className={`
                            ${product.ecoscore_grade === "a" ? "bg-green-100 text-green-800" : ""}
                            ${product.ecoscore_grade === "b" ? "bg-lime-100 text-lime-800" : ""}
                            ${product.ecoscore_grade === "c" ? "bg-yellow-100 text-yellow-800" : ""}
                            ${product.ecoscore_grade === "d" ? "bg-orange-100 text-orange-800" : ""}
                            ${product.ecoscore_grade === "e" ? "bg-red-100 text-red-800" : ""}
                          `}
                                                    >
                                                        Grade {product.ecoscore_grade.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <CardDescription>Environmental impact score</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="mt-2">
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-sm text-muted-foreground">Low impact</span>
                                                        <span className="text-sm text-muted-foreground">High impact</span>
                                                    </div>
                                                    <div className="flex h-4 rounded-full overflow-hidden">
                                                        <div className="bg-green-500 w-1/5 flex items-center justify-center text-xs text-white font-bold">
                                                            A
                                                        </div>
                                                        <div className="bg-lime-500 w-1/5 flex items-center justify-center text-xs text-white font-bold relative">
                                                            B
                                                            {product.ecoscore_grade === "b" && (
                                                                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                                                                    <span className="text-white text-xs">•</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="bg-yellow-500 w-1/5 flex items-center justify-center text-xs text-white font-bold">
                                                            C
                                                        </div>
                                                        <div className="bg-orange-500 w-1/5 flex items-center justify-center text-xs text-white font-bold">
                                                            D
                                                        </div>
                                                        <div className="bg-red-500 w-1/5 flex items-center justify-center text-xs text-white font-bold">
                                                            E
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <p className="text-sm">Score: {product.ecoscore_score} / 100</p>
                                                        <p className="text-sm text-muted-foreground mt-2">
                                                            The Eco-Score measures the environmental impact of food products. Higher scores are
                                                            better.
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>

                                {/* Details Tab */}
                                <TabsContent value="details" className="space-y-4">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg">Product Information</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="font-medium flex items-center gap-2">
                                                        <Tag className="h-4 w-4" /> Categories
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {product.categories.split(",").map((category: string, index: number) => (
                                                            <Badge key={index} variant="secondary" className="text-xs">
                                                                {category.trim()}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div>
                                                    <h3 className="font-medium flex items-center gap-2">
                                                        <Award className="h-4 w-4" /> Brand
                                                    </h3>
                                                    <p className="mt-1">{product.brands}</p>
                                                </div>

                                                <Separator />

                                                <div>
                                                    <h3 className="font-medium flex items-center gap-2">
                                                        <Leaf className="h-4 w-4" /> Origin
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {product.countries_tags.map((country: string, index: number) => (
                                                            <Badge key={index} variant="outline" className="text-xs">
                                                                {country.replace("en:", "").replace(/-/g, " ")}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div>
                                                    <h3 className="font-medium">Barcode</h3>
                                                    <p className="mt-1">{product._id}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg">Ingredients</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <div className="relative aspect-video">
                                                    <Image
                                                        src={product.image_ingredients_url || "/placeholder.svg?height=300&width=400"}
                                                        alt="Ingredients"
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg">Nutrition Table</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <div className="relative aspect-video">
                                                    <Image
                                                        src={product.image_nutrition_url || "/placeholder.svg?height=300&width=400"}
                                                        alt="Nutrition Table"
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
