import ImageButton from "@/components/ImageButton";
import { View, Text, ImageBackground, Platform, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import Header from "@/components/Header";
import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Home() {
    const router = useRouter();

    const incrementGamesPlayed = async () => {
        const auth = getAuth();

        const db = getFirestore();
        const userDocRef = doc(db, "user_data", auth.currentUser?.uid || '');

        try {
            await updateDoc(userDocRef, {
                games_played: increment(1)
            });
            console.log("Games played incremented successfully");
        } catch (error) {
            console.error("Error incrementing games played: ", error);
        }
    };

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('@/assets/images/R.jpeg') : require('@/assets/images/OIP.jpeg')} style={{width: '100%', height: '100%',}}>
            <Header route='./user'/>
            <View style={styles.container}>
                <ImageButton 
                    imagePath={require('@/assets/images/home_button_images/whizbang-level.png')} 
                    width={200} 
                    height={100} 
                    onPress={() => {
                        incrementGamesPlayed();
                        router.push('/whizbang-level');
                    }}
                />
                <ImageButton 
                    imagePath={require('@/assets/images/home_button_images/paradise-level.png')} 
                    width={200} 
                    height={100} 
                    onPress={() => null}
                />
                <ImageButton 
                    imagePath={require('@/assets/images/home_button_images/titans-level.png')} 
                    width={200} 
                    height={100} 
                    onPress={() => null}
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