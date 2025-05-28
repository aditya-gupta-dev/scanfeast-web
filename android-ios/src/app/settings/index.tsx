import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Settings() {
    return(
        <View className="flex-1 bg-zinc-900 p-4 gap-y-16">
            <Text className="text-white text-center text-4xl">Under Construction</Text>
            <Link 
                href={'https://github.com/aditya-gupta-dev/scanfeast'}
                className="text-center"
            >
                <AntDesign name="github" size={24} color="white" />
            </Link>
        </View>
    )
}