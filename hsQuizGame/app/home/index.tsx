import ImageButton from "@/components/ImageButton";
import { View, Text, ImageBackground, Platform, StyleSheet } from "react-native";

export default function Home() {
    return (
        <ImageBackground source={Platform.OS === 'web' ? require('@/assets/images/R.jpeg') : require('@/assets/images/OIP.jpeg')} style={{width: '100%', height: '100%',}}>
            <View style={styles.container}>
                <ImageButton 
                    imagePath={require('@/assets/images/favicon.png')} 
                    width={200} 
                    height={100} 
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });