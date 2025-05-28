import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useCameraPermissions }from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';

export default function IntroScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions()
  const [loading, setLoading] = useState(false);

  const handleScanPress = async () => {
    setLoading(true);

    if(permission && permission.granted) {
      router.push('/scan');
    } else {
      const res = await requestPermission()
      if(res.granted) {
        router.push('/scan');
      } else {
        alert('Camera permission is required to use the scanner');
      } 
    }
  
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#18181b', '#27272a']}
        className="flex-1"
      >
        <View className="flex-1 justify-between px-6 py-8">
          {/* Top Section */}
          <View className="items-center mt-12">
            <View className="bg-zinc-800 p-4 rounded-full mb-6">
              <MaterialIcons name='camera' color="#a1a1aa" size={40} />
            </View>
            <Text className="text-4xl text-zinc-100 text-center">
              ScanFeast
            </Text>
            <Text className="text-zinc-400 text-center mt-4 text-lg">
              Identify foods instantly with your camera
            </Text>
          </View>
          
          {/* Middle Section - Features */}
          <View className="my-8">
            <View className="flex-row items-center mb-6">
              <View className="bg-zinc-800 p-3 rounded-full">
                <Text className="text-zinc-300 font-bold">1</Text>
              </View>
              <Text  className="text-zinc-300 ml-4 text-base">
                Scan any food item with your camera
              </Text>
            </View>
            
            <View className="flex-row items-center mb-6">
              <View className="bg-zinc-800 p-3 rounded-full">
                <Text className="text-zinc-300 font-bold">2</Text>
              </View>
              <Text className="text-zinc-300 ml-4 text-base">
                Get instant nutritional information
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <View className="bg-zinc-800 p-3 rounded-full">
                <Text className="text-zinc-300 font-bold">3</Text>
              </View>
              <Text className="text-zinc-300 ml-4 text-base">
                Track your daily food intake easily
              </Text>
            </View>
          </View>
          
          {/* Bottom Section - Button */}
          <View className="items-center gap-y-4 mb-8">
            <TouchableOpacity
              onPress={handleScanPress}
              className={`w-full py-4 rounded-full ${loading ? 'bg-zinc-700' : 'bg-emerald-600'}`}
              disabled={loading}
            >
              <View className="flex-row justify-center items-center">
                <Text className="text-zinc-100 text-lg">
                  {permission && permission.granted  
                    ? 'Start Scanning'
                    : 'Allow Camera Access'}
                </Text>
                <MaterialIcons name='camera' color="#ffffff" size={20} className="ml-2" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/settings')}
              className={`w-full py-4 rounded-full  bg-background`}
              disabled={loading}
            ><View className="flex-row justify-center items-center">
            <Text className="text-zinc-100 text-lg">
              Settings
            </Text>
            <MaterialIcons name='settings' color="#ffffff" size={20} className="ml-2" />
          </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}