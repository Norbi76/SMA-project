import {  ref, listAll, getDownloadURL } from 'firebase/storage';
import { arrayUnion, doc, getDoc, getFirestore, increment, setDoc, updateDoc } from 'firebase/firestore';
import { storage, db, auth } from '@/firebaseConfig';
import { Text, View, Image, StyleSheet, Platform, ImageBackground } from "react-native";
import React, { useEffect, useState } from 'react';
import Button from "@/components/Button";
import { router } from 'expo-router';

export default function Home() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [whizbangLevel, setWhizbangLevel] = useState<string[]>([]);
    const [randomDescriptions, setRandomDescriptions] = useState<string[]>([]);
    const [showEndMessage, setShowEndMessage] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [buttonTitles, setButtonTitles] = useState<string[][]>([]);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [BlurOff, setBlurOff] = useState<boolean | null>(true);

    useEffect(() => {
        const fetchImages = async () => {
            const storageRef = ref(storage, '/whizbang-images');
            const result = await listAll(storageRef);
            const urls = await Promise.all(result.items.map(item => getDownloadURL(item)));
            setImageUrls(urls);
        };
        
        const fetchWhizbangLevel = async () => {
            const docRef = doc(db, 'card_descriptions', 'Hz8Egkl5eVhFhklrDe3W');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.whizbang_level) {
                    setWhizbangLevel(data.whizbang_level);
                }
                if (data.random_descriptions) {
                    setRandomDescriptions(data.random_descriptions);
                }
            } else {
                console.log("No such document!");
            }
        };

        fetchImages();
        fetchWhizbangLevel();
    }, []);

    useEffect(() => {
        if (imageUrls.length > 0 && whizbangLevel.length > 0 && randomDescriptions.length > 0) {
            assignButtonTitles();
        }
    }, [imageUrls, whizbangLevel, randomDescriptions]);

    const assignButtonTitles = () => {
        const titles = imageUrls.map((_, index) => {
            const randomIndex = Math.floor(Math.random() * 3);
            const buttons = Array(3).fill(null).map(() => {
                const randomDescIndex = Math.floor(Math.random() * randomDescriptions.length);
                return randomDescriptions[randomDescIndex];
            });
            buttons[randomIndex] = whizbangLevel[index];
            return buttons;
        });
        setButtonTitles(titles);
    };

    const handleButtonPress = (index: number) => {
        const correctIndex = buttonTitles[currentIndex].indexOf(whizbangLevel[currentIndex]);
        setSelectedButtonIndex(index);
        setIsCorrect(index === correctIndex);
        if (index === correctIndex) {
            setPoints((prevPoints) => prevPoints + 1);
        }
        setBlurOff(false);

        setTimeout(handleNext, 3000);
    };

    const handleNext = () => {
        if (currentIndex === imageUrls.length - 1) {
            setShowEndMessage(true);
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
            setSelectedButtonIndex(null);
            setBlurOff(true);
            setIsCorrect(null);
        }
    };

    const saveUserScore = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, 'user_data', user.uid);
            await setDoc(userDocRef, { 'whizbang-level-highscore': points }, { merge: true });
        }
    };

    const checkIfUserWon = () => {
        return (points >= imageUrls.length / 2 && points < imageUrls.length);
    };

    const saveWinLossCount = async () => {
        const db = getFirestore();
        const userDocRef = doc(db, "user_data", auth.currentUser?.uid || '');

        if (checkIfUserWon()) {
            try {
                await updateDoc(userDocRef, {
                    wins: increment(1)
                });
                console.log("Win Count incremented successfully");
            } catch (error) {
                console.error("Error incrementing win count: ", error);
            }
        }
        else {
            try {
                await updateDoc(userDocRef, {
                    losses: increment(1)
                });
                console.log("Loss Count incremented successfully");
            }
            catch (error) {
                console.error("Error incrementing loss count: ", error);
            }
        }
    };

    if (showEndMessage) {
        saveUserScore();
        saveWinLossCount();

        return (
            <ImageBackground source={Platform.OS === 'web' ? require('@/assets/images/R.jpeg') : require('@/assets/images/OIP.jpeg')} style={{width: '100%', height: '100%',}}>
                <View style={styles.container}>
                    { (points >= imageUrls.length / 2 && points < imageUrls.length) && (<Text style={styles.endMessage}>Good job, you guessed most of the descriptions!</Text>) }
                    { (points >= 0 && points < imageUrls.length / 2) && (<Text style={styles.endMessage}>Not bad, you guessed some of the descriptions!</Text>) }
                    { (points == imageUrls.length) && (<Text style={styles.endMessage}>Wow, you guessed all the descriptions, good job!</Text>) }
                    { (points == 0) && (<Text style={styles.endMessage}>Oh no, you didn't guess any of the descriptions!</Text>) }
                    <Text style={styles.finalScore}>Final Score: {points}</Text>
                    <Button title="Go to home page" onPress={() => {router.push('/home')}} />
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('@/assets/images/R.jpeg') : require('@/assets/images/OIP.jpeg')} style={{width: '100%', height: '100%',}}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View style={styles.remainingCards}>
                        <Text style={styles.scoreText}>Cards Left: {imageUrls.length - currentIndex}</Text>
                    </View>
                    <View style={styles.image}>
                        {imageUrls.length > 0 && (
                            <Image source={{ uri: imageUrls[currentIndex] }} style={{ width: 250, height: 350 }} />
                        )}
                        {BlurOff && <View style={styles.blurContainer}></View>}
                    </View>

                    <View>
                        <Text style={styles.scoreText}>Points: {points}</Text>
                    </View>
                    <View style={styles.answersContainer}>
                        {buttonTitles.length > 0 && buttonTitles[currentIndex].map((title, index) => (
                            <Button
                                key={index}
                                title={title}
                                style={[
                                    styles.optionButton,
                                    selectedButtonIndex === index && (isCorrect ? styles.correctButton : styles.incorrectButton)
                                ]}
                                onPress={() => handleButtonPress(index)}
                            />
                        ))}
                    </View>
                </View>
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
    imageContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        margin: 8,
        padding: 32,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'grey',
    },
    answersContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 16,  
    },
    endMessage: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    finalScore: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    optionButton: {
        ...Platform.select({
            android: {
                width: 320,
            },
            web: {
                width: "100%",
            },
        }),
    },
    correctButton: {
        backgroundColor: 'green',
    },
    incorrectButton: {
        backgroundColor: 'red',
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    image: {
        position: 'relative',
        width: 250, 
        height: 350
    },
    blurContainer: {
        position: 'absolute',
        bottom: 0, 
        right: 0, 
        width: '96%', 
        height: '41%', 
        backgroundColor: 'rgba(0, 0, 0, 1)'
    },
    remainingCards: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
    },
  });