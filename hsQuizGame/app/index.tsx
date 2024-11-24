import React from 'react';
import { View, Alert, StyleSheet, Platform } from 'react-native';
import Button from '../components/Button'; // Adjust the path as necessary

const showAlert = () => {
  if (Platform.OS === 'web') {
    window.alert('Button Pressed!');
  } else {
    Alert.alert('Button Pressed!');
  }
};

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Press Me" onPress={showAlert} color='red' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});