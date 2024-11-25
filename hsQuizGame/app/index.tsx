import React, { useState } from 'react';
import { View, Alert, StyleSheet, Platform } from 'react-native';
import Button from '../components/Button'; 
import TextInput from '../components/TextInput';

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

  return (
    <View style={styles.container}>
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
      <Button title="Register" onPress={showAlert} color='red' width={220} primary={false}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    gap: 20,

    // borderWidth: 1,
    // padding: 10,
  },
});