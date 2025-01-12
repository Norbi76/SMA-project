import Button from "@/components/Button";
import Card from "@/components/Container";
import { auth, db } from "@/firebaseConfig";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ImageBackground, Platform, Text, StyleSheet, View} from "react-native";

export default function Home() {
    const [userData, setUserData] = useState<any>(null);
    const [winLossRatio, setWinLossRatio] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = doc(db, 'user_data', auth.currentUser?.uid || '');
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const getUserName = () => {
        return userData?.name || "Guest";
    };

    const getWinRatio = () => {
        return userData?.wins / (userData?.wins + userData?.losses) * 100;
    };
    
    const getLossRatio = () => {
        return userData?.losses / (userData?.wins + userData?.losses) * 100;
    };

    const handleLogOut = () => {
        return async () => {
            try {
                await auth.signOut();
            } catch (error) {
                console.error("Error logging out:", error);
            }
        };
    };

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('@/assets/images/R.jpeg') : require('@/assets/images/OIP.jpeg')} style={{width: '100%', height: '100%',}}>
            <View style={styles.container}>
                <Card padding={20} elevation={5} borderRadius={10}>
                    <Text>Welcome, {getUserName()}!</Text>
                    <Text>Your highscore on the Whizbang Level: {userData && userData['whizbang-level-highscore']}</Text>
                    <Text>Win Ratio: {getWinRatio()} %</Text>
                    <Text>Loss Ratio: {getLossRatio()} %</Text>
                    <Button title="Log Out" onPress={() => {handleLogOut();router.push('/authentication')}} color='red' width={220}></Button>
                </Card>
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