import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

//ShieldCheck, AlertTriangle, Copy, ChevronDown, Leaf

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    nutrition: true,
    ingredients: false,
    environmental: false,
  });
  
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTabletOrDesktop = width > 768;
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API URL
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`);
        const data = await response.json();
        
        if (data.status === 1) {
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, []);
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-zinc-900">
        <ActivityIndicator size="large" color="#d4d4d8" />
        <Text className="text-zinc-300 mt-4">Loading product data...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-zinc-900 p-4">
        <MaterialIcons name='crisis-alert' size={48} color="#ef4444" />
        <Text className="text-zinc-300 text-lg mt-4">{error}</Text>
        <TouchableOpacity 
          className="mt-6 bg-zinc-700 py-3 px-6 rounded-lg"
          onPress={() => setLoading(true)}
        >
          <Text className="text-zinc-200 font-medium">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (!product) return null;
  
  const nutriscoreColor = {
    a: 'bg-green-500',
    b: 'bg-green-400',
    c: 'bg-yellow-400',
    d: 'bg-orange-400',
    e: 'bg-red-500',
    unknown: 'bg-zinc-400',
  };
  
  const nutriscoreGrade = product.nutriscore_grade || 'unknown';
  
  const layout = isTabletOrDesktop ? 'flex-row' : 'flex-col';
  
  return (
    <View 
      className="flex-1 bg-zinc-900"
      style={{ 
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right 
      }}
    >
      <StatusBar style="light" />
      
      <ScrollView className="flex-1">
        <View className={`${layout} flex-1`}>
          {/* Product Image and Basic Info */}
          <View className={`${isTabletOrDesktop ? 'w-1/3 p-6' : 'w-full p-4'}`}>
            <View className="bg-zinc-800 rounded-3xl overflow-hidden shadow-lg">
              {product.image_front_url ? (
                <Image
                  source={{ uri: product.image_front_url }}
                  className="w-full aspect-square"
                  resizeMode="contain"
                />
              ) : (
                <View className="w-full aspect-square bg-zinc-700 justify-center items-center">
                  <Text className="text-zinc-400">No image available</Text>
                </View>
              )}
              
              <View className="p-4">
                <Text className="text-zinc-400 uppercase text-xs font-medium mb-1">{product.brands || 'Unknown Brand'}</Text>
                <Text className="text-zinc-100 text-xl font-bold mb-2">{product.product_name || 'Unknown Product'}</Text>
                
                <View className="flex-row mt-4 items-center">
                  <Text className="text-zinc-400 text-sm mr-2">Code:</Text>
                  <Text className="text-zinc-300 text-sm flex-1">{product.code}</Text>
                  <TouchableOpacity className="p-2">
                    <MaterialIcons name='copy-all' size={16} color="#a1a1aa" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          
          {/* Product Details */}
          <View className={`${isTabletOrDesktop ? 'w-2/3 p-6' : 'w-full p-4'} pt-0`}>
            {/* Nutriscore */}
            <View className="bg-zinc-800 rounded-3xl overflow-hidden shadow-lg mb-4">
              <View className="p-5">
                <Text className="text-zinc-100 text-lg font-semibold mb-4">Nutrition Score</Text>
                
                <View className="flex-row items-center justify-between">
                  <View className="flex-row">
                    <View className={`w-16 h-16 ${nutriscoreColor[nutriscoreGrade]} rounded-full items-center justify-center`}>
                      <Text className="text-white text-2xl font-bold uppercase">{nutriscoreGrade}</Text>
                    </View>
                    <View className="ml-4 justify-center">
                      <Text className="text-zinc-200 text-lg font-bold">
                        {nutriscoreGrade === 'a' ? 'Excellent' : 
                         nutriscoreGrade === 'b' ? 'Good' : 
                         nutriscoreGrade === 'c' ? 'Fair' : 
                         nutriscoreGrade === 'd' ? 'Poor' : 
                         nutriscoreGrade === 'e' ? 'Unhealthy' : 'Unknown'}
                      </Text>
                      <Text className="text-zinc-400 text-sm mt-1">Nutri-Score</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    className="flex-row items-center"
                    onPress={() => toggleSection('nutrition')}
                  >
                    <Text className="text-zinc-400 mr-2">Details</Text>
                    <MaterialIcons
                      name='chevron-left' 
                      size={20} 
                      color="#a1a1aa" 
                      style={{ transform: [{ rotate: expandedSections.nutrition ? '180deg' : '0deg' }] }}
                    />
                  </TouchableOpacity>
                </View>
                
                {expandedSections.nutrition && (
                  <View className="mt-6 pt-6 border-t border-zinc-700">
                    <Text className="text-zinc-300 mb-4">Nutritional values per {product.nutrition_data_per}</Text>
                    
                    <View className="space-y-3">
                      {product.nutriments && (
                        <>
                          <NutrientRow 
                            label="Energy" 
                            value={`${product.nutriments['energy-kcal'] || 0} kcal`} 
                            level={product.nutrient_levels?.fat}
                            />
                          <NutrientRow 
                            label="Fat" 
                            value={`${product.nutriments.fat || 0} g`} 
                            level={product.nutrient_levels?.fat}
                            />
                          <NutrientRow 
                            label="Saturated Fat" 
                            value={`${product.nutriments['saturated-fat'] || 0} g`} 
                            level={product.nutrient_levels?.['saturated-fat']}
                            />
                          <NutrientRow 
                            label="Carbohydrates" 
                            value={`${product.nutriments.carbohydrates || 0} g`} 
                            level={product.nutrient_levels?.fat}
                            />
                          <NutrientRow 
                            label="Sugars" 
                            value={`${product.nutriments.sugars || 0} g`} 
                            level={product.nutrient_levels?.sugars}
                            />
                          <NutrientRow 
                            label="Protein" 
                            value={`${product.nutriments.proteins || 0} g`} 
                            level={product.nutrient_levels?.fat}
                          />
                          <NutrientRow 
                            label="Salt" 
                            value={`${product.nutriments.salt || 0} g`} 
                            level={product.nutrient_levels?.salt}
                          />
                        </>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>
            
            {/* Categories */}
            <View className="bg-zinc-800 rounded-3xl overflow-hidden shadow-lg mb-4">
              <View className="p-5">
                <Text className="text-zinc-100 text-lg font-semibold mb-3">Product Categories</Text>
                <View className="flex-row flex-wrap">
                  {product.categories_tags?.map((category, index) => (
                    <View 
                      key={index} 
                      className="bg-zinc-700 px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      <Text className="text-zinc-300 text-xs">{category.replace('en:', '')}</Text>
                    </View>
                  )) || <Text className="text-zinc-400">No categories available</Text>}
                </View>
              </View>
            </View>
            
            {/* Environmental Impact */}
            <View className="bg-zinc-800 rounded-3xl overflow-hidden shadow-lg mb-4">
              <View className="p-5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <MaterialIcons name="energy-savings-leaf" size={20} color="#a1a1aa" />
                    <Text className="text-zinc-100 text-lg font-semibold ml-2">Environmental Impact</Text>
                  </View>
                  
                  <TouchableOpacity 
                    className="flex-row items-center"
                    onPress={() => toggleSection('environmental')}
                  >
                    <Text className="text-zinc-400 mr-2">Details</Text>
                    <MaterialIcons
                      name='chevron-right' 
                      size={20} 
                      color="#a1a1aa" 
                      style={{ transform: [{ rotate: expandedSections.environmental ? '180deg' : '0deg' }] }}
                    />
                  </TouchableOpacity>
                </View>
                
                <View className="mt-4 p-3 bg-zinc-700/50 rounded-lg flex-row items-center">
                  <Text className="text-zinc-300">
                    Eco-Score: <Text className="font-bold">{product.ecoscore_grade?.toUpperCase() || 'Unknown'}</Text>
                  </Text>
                </View>
                
                {expandedSections.environmental && (
                  <View className="mt-4">
                    <Text className="text-zinc-400 text-sm">
                      Environmental data for this product is limited. More information may be added in the future.
                    </Text>
                  </View>
                )}
              </View>
            </View>
            
            {/* Data Quality */}
            <View className="bg-zinc-800 rounded-3xl overflow-hidden shadow-lg">
              <View className="p-5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <MaterialIcons name='shield' size={20} color="#a1a1aa" />
                    <Text className="text-zinc-100 text-lg font-semibold ml-2">Data Quality</Text>
                  </View>
                </View>
                
                <View className="mt-4">
                  <Text className="text-zinc-300 mb-2">Completeness: {product.completeness ? `${Math.round(product.completeness * 100)}%` : 'Unknown'}</Text>
                  <View className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                    <View 
                      className="h-full bg-emerald-500"
                      style={{ width: `${product.completeness ? Math.round(product.completeness * 100) : 0}%` }}
                    />
                  </View>
                </View>
                
                <Text className="text-zinc-400 text-xs mt-4">
                  Last modified: {product.last_modified_t ? new Date(product.last_modified_t * 1000).toLocaleDateString() : 'Unknown'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const NutrientRow = ({ label, value, level }) => {
  const getLevelColor = (level) => {
    if (!level) return "bg-zinc-600";
    
    switch(level) {
      case 'low':
        return 'bg-green-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-zinc-600';
    }
  };
  
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        {level && (
          <View className={`w-3 h-3 rounded-full mr-2 ${getLevelColor(level)}`} />
        )}
        <Text className="text-zinc-300">{label}</Text>
      </View>
      <Text className="text-zinc-300 font-medium">{value}</Text>
    </View>
  );
};