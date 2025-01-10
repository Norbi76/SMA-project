import React, { useState } from 'react';
import { View, Alert, StyleSheet, Platform, Text, ImageBackground } from 'react-native';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import Card from '@/components/Container';
import Spacer from '@/components/Spacer';
import { useFonts, BungeeSpice_400Regular } from '@expo-google-fonts/dev';
import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Link, useRouter } from 'expo-router';

const showAlert = () => {
  if (Platform.OS === 'web') {
    window.alert('Button Pressed!');
  } else {
    Alert.alert('Button Pressed!');
  }
};

export default function App() {
  const [email, setEmailText] = useState('');
  const [password, setPasswordText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    BungeeSpice_400Regular,
  });

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in:', userCredential.user);
      setErrorMessage(''); // Clear any previous error message
      // Navigate to the next screen or perform other actions
      router.push('/home');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('User does not exist.');
        } else if (error.code === 'auth/wrong-password') {
          setErrorMessage('Incorrect password.');
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  const navigateToRegister = () => {
    router.push('/authentication/register');
  };

  return (
    <ImageBackground source={Platform.OS === 'web' ? require('../../assets/images/R.jpeg') : require('../../assets/images/OIP.jpeg')} style={{width: '100%', height: '100%',}}>
      <View style={styles.container}>
        <Text style={{fontFamily: "BungeeSpice_400Regular", fontSize: Platform.OS === 'web' ? 60 : 25}}>HeartStone QuizGame</Text>
        <Text style={{fontFamily: "BungeeSpice_400Regular", fontSize: Platform.OS === 'web' ? 60 : 25}}>Test your might!</Text>
        <Spacer size={50} />
        <Card padding={20} elevation={5} borderRadius={10} style={{justifyContent: 'space-between'}}>
          <View>
            <TextInput 
                      placeholder="Enter email" 
                      value={email} 
                      onChangeText={setEmailText} 
                      borderColor="black" 
                      width={220}
            />

            <TextInput 
                      placeholder="Enter password" 
                      value={password} 
                      onChangeText={setPasswordText} 
                      borderColor="black" 
                      width={220}
                      secureTextEntry={true}
            />
          </View>

          <View>
            {errorMessage ? ( <Text style={styles.errorText}>{errorMessage}</Text> ) : null}
            <Button title="Login" onPress={handleLogin} color='red' width={220} />
            <Button title="Register" onPress={navigateToRegister} color='red' width={220} primary={false}/>
          </View>
          
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
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});