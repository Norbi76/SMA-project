import Button from "@/components/Button";
import Card from "@/components/Container";
import UserStats from "@/components/UserStats";
import { auth, db } from "@/firebaseConfig";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ImageBackground, Platform, Text, StyleSheet, View} from "react-native";

export default function Home() {
    const [userData, setUserData] = useState<any>(null);

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
        return userData?.username;
    };

    const getWinRatio = () => {
        return (userData?.wins / (userData?.wins + userData?.losses) * 100).toFixed(2);
    };
    
    const getLossRatio = () => {
        return (userData?.losses / (userData?.wins + userData?.losses) * 100).toFixed(2);
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
                    <View style={styles.welcome}>
                        <Text>Welcome, {getUserName()}!</Text>
                    </View>
                    <View style={styles.stat_container}>
                        <View style={styles.stat}>
                            <Text>Your highscore on the Whizbang Level: {userData && userData['whizbang-level-highscore']}</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text>Win Ratio: {getWinRatio()} %</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text>Loss Ratio: {getLossRatio()} %</Text>
                        </View>
                    </View>
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
  stat: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  stat_container: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 0.1,
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
  welcome: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});