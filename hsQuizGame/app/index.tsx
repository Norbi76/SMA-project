import React, { useState } from 'react';
import { View, Alert, StyleSheet, Platform, Text, ImageBackground } from 'react-native';
import Button from '../components/Button'; 
import TextInput from '../components/TextInput';
import Card from '@/components/Container';
import { useFonts, BungeeSpice_400Regular } from '@expo-google-fonts/dev';

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

  let [fontsLoaded] = useFonts({
    BungeeSpice_400Regular,
  });

  const Spacer = ({ size }: { size: number }) => (
    <View style={{ height: size }} />
  );

  return (
    <ImageBackground source={Platform.OS === 'web' ? require('../assets/images/R.jpeg') : require('../assets/images/OIP.jpeg')} style={{width: '100%', height: '100%',}}>
      <View style={styles.container}>
        <Text style={{fontFamily: "BungeeSpice_400Regular", fontSize: Platform.OS === 'web' ? 60 : 25}}>HeartStone QuizGame</Text>
        <Text style={{fontFamily: "BungeeSpice_400Regular", fontSize: Platform.OS === 'web' ? 60 : 25}}>Test your might!</Text>
        <Spacer size={50} />
        <Card padding={20} elevation={5} borderRadius={10}>
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
          />
          <Button title="Login" onPress={showAlert} color='red' width={220} />
          <Spacer size={90} />
          <Button title="Register" onPress={showAlert} color='red' width={220} primary={false}/>
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
});