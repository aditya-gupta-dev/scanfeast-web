import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function Scan() {

  const router = useRouter()
  const [permission] = useCameraPermissions();
  const [results, setResults] = useState<BarcodeScanningResult | undefined>(undefined)
  const [facing, setFacing] = useState<'back' | 'front'>('back')
  const [isTorch, setIsTorch] = useState(false)

  const changeFacing = () => {
    setFacing(facing === 'back' ? 'front' : 'back')
  }

  const changeTorch = () => {
    setIsTorch(!isTorch)
  }

  const goBack = () => {
    router.push('/')
  }

  useEffect(() => {
    if (permission && permission.status !== "granted") {
      router.push('/')
    }
  }, [permission])

  if (permission && permission.granted) {

    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing}
          enableTorch={isTorch}

          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'code128', 'code93', 'aztec', 'codabar', 'code39', 'ean13', 'ean8', 'itf14', 'upc_a', 'upc_e', 'datamatrix', 'pdf417'],
          }}

          onBarcodeScanned={(res) => setResults(res)}

        >

          <View className='flex-1 flex-col justify-center items-start p-4 mt-40 gap-y-4 lg:mt-0'>
            <TouchableOpacity className='bg-white/20 rounded-full p-4' onPress={goBack}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className='bg-white/20 rounded-full p-4' onPress={changeFacing}>
              <MaterialIcons name="flip-camera-android" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className='bg-white/20 rounded-full p-4' onPress={changeTorch}>
              {isTorch ? <MaterialIcons name="flashlight-on" size={24} color="white" /> : <MaterialIcons name="flashlight-off" size={24} color="white" />}
            </TouchableOpacity>

            {results &&
                <TouchableOpacity className='bg-white/20 rounded-full p-4' onPress={() => setResults(undefined)}>
                  <MaterialIcons name='clear' size={24} color="white"/>
                </TouchableOpacity>
            } 

            {results &&
              <View className='flex flex-row w-full justify-center'>
                <TouchableOpacity className='bg-white/20 rounded-full p-4' onPress={() => router.push(`/product/${results!.data}`)}>
                  <Text className='text-center text-2xl font-bold text-white'>View Results</Text>
                </TouchableOpacity>
              </View>
            } 
          </View>


        </CameraView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
});