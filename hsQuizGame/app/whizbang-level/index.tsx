import {  ref, listAll, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { storage, db, auth } from '@/firebaseConfig';
import { Text, View, Image, StyleSheet, Platform, ImageBackground } from "react-native";
import React, { useEffect, useState } from 'react';
import Button from "@/components/Button";

export default function Home() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [whizbangLevel, setWhizbangLevel] = useState<string[]>([]);
    const [randomDescriptions, setRandomDescriptions] = useState<string[]>([]);
    const [showEndMessage, setShowEndMessage] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttonTitles, setButtonTitles] = useState<string[][]>([]);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

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
        setTimeout(handleNext, 1000); // Move to the next image after 1 second
    };

    const handleNext = () => {
        if (currentIndex === imageUrls.length - 1) {
            setShowEndMessage(true);
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
            setSelectedButtonIndex(null);
            setIsCorrect(null);
        }
    };

    if (showEndMessage) {
        return (
            <View style={styles.container}>
                <Text style={styles.endMessage}>You have reached the end of the images.</Text>
                <Button title="Go to another page" onPress={() => {/* Navigate to another page */}} />
            </View>
        );
    }

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('@/assets/images/R.jpeg') : require('@/assets/images/OIP.jpeg')} style={{width: '100%', height: '100%',}}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {imageUrls.length > 0 && (
                        <Image source={{ uri: imageUrls[currentIndex] }} style={{ width: 250, height: 350 }} />
                    )}
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
        fontSize: 18,
        fontWeight: 'bold',
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
  });