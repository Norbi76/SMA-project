import React, { useState } from 'react';
import { View, Alert, StyleSheet, Platform, Text, ImageBackground } from 'react-native';
import Button from '../components/Button'; 
import TextInput from '../components/TextInput';
import Card from '@/components/Container';
import Spacer from '@/components/Spacer';
import { useFonts, BungeeSpice_400Regular } from '@expo-google-fonts/dev';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { router, useRouter } from 'expo-router';



export default function Register() {
    const [email, setEmailText] = useState('');
    const [password, setPasswordText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // const [errorMessage, setErrorMessage] = useState('');

    let [fontsLoaded] = useFonts({
        BungeeSpice_400Regular,
    });

    const handleRegister = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log('Registered:', userCredential.user);
          router.push('/');
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                // Alert.alert('Error', error.message);
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../assets/images/R.jpeg') : require('../assets/images/OIP.jpeg')} style={{width: '100%', height: '100%',}}>
            <View style={styles.container}>
            {/* <Text style={{fontFamily: "BungeeSpice_400Regular", fontSize: Platform.OS === 'web' ? 60 : 25}}>HeartStone QuizGame</Text> */}
            <Text style={{fontFamily: "BungeeSpice_400Regular", fontSize: Platform.OS === 'web' ? 60 : 18}}>Create an account to start playing</Text>
            <Spacer size={25} />
            <Card padding={20} elevation={5} borderRadius={10}>
                <TextInput 
                    placeholder="Enter email" 
                    value={email} 
                    onChangeText={setEmailText} 
                    width={220}
                    // secureTextEntry={true}
                    />
                <TextInput 
                    placeholder="Enter password" 
                    value={password} 
                    onChangeText={setPasswordText} 
                    width={220}
                    secureTextEntry={true}
                    />
                {Platform.OS === 'web' ? <Spacer size={100} /> : <Spacer size={200} />}
                {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
                <Button title="Register" onPress={handleRegister} color='red' width={220} primary={true} />
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
      // borderColor: 'black',
      // gap: 20,
  
      // borderWidth: 1,
      // padding: 10,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      // marginVertical: 10,
    },
  });