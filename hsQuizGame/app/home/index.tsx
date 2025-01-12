import ImageButton from "@/components/ImageButton";
import { View, Text, ImageBackground, Platform, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import Header from "@/components/Header";

export default function Home() {
    const router = useRouter();

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('@/assets/images/R.jpeg') : require('@/assets/images/OIP.jpeg')} style={{width: '100%', height: '100%',}}>
            <Header route='./user'/>
            <View style={styles.container}>
                <ImageButton 
                    imagePath={require('@/assets/images/home_button_images/whizbang-level.png')} 
                    width={200} 
                    height={100} 
                    onPress={() => router.push('../whizbang-level')}
                />
                <ImageButton 
                    imagePath={require('@/assets/images/home_button_images/paradise-level.png')} 
                    width={200} 
                    height={100} 
                    onPress={() => router.push('../paradise-level')}
                />
                <ImageButton 
                    imagePath={require('@/assets/images/home_button_images/titans-level.png')} 
                    width={200} 
                    height={100} 
                    onPress={() => router.push('../titans-level')}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });