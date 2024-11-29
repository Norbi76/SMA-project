import { Stack } from 'expo-router';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function Layout() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 25 })}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="home" />
      </Stack>
    </KeyboardAvoidingView>
  );
}