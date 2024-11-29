import React, { useState } from 'react';
import { Animated, Image, StyleSheet, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';

interface CustomButtonProps {
  width?: number;
  height?: number;
  imagePath: any;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function CustomButton({ width, height, imagePath }: CustomButtonProps) {
  const router = useRouter();
  const [hoverAnim] = useState(new Animated.Value(0));
  const [pressAnim] = useState(new Animated.Value(1));

  const handleHoverIn = () => {
    if (Platform.OS === 'web') {
      Animated.timing(hoverAnim, {
        toValue: 1,
        duration: 500, // Increase duration for a slower transition
        useNativeDriver: false, // Background color animation doesn't support native driver
      }).start();
    }
  };

  const handleHoverOut = () => {
    if (Platform.OS === 'web') {
      Animated.timing(hoverAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePressIn = () => {
    if (Platform.OS === 'android') {
      Animated.spring(pressAnim, {
        toValue: 0.85,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (Platform.OS === 'android') {
      Animated.spring(pressAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const animatedStyle = Platform.OS === 'web' ? {
    backgroundColor: hoverAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', 'rgba(0, 0, 0, 0.5)'],
    }),
  } : {};

  const pressStyle = Platform.OS === 'android' ? {
    transform: [{ scale: pressAnim }],
  } : {};

  return (
    <AnimatedPressable
      onPress={() => router.push('/_sitemap')}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        { width, height },
        animatedStyle,
        pressStyle,
      ]}
    >
      <Image source={imagePath} style={styles.image} resizeMode="contain" />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        ...Platform.select({
            android: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            elevation: 30,
            shadowColor: 'grey',
            borderColor: '#25EED3',
            },
            web: {
            boxShadow: '0 0 10px orange',
            },
        }),
        },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: '50%',
    height: '50%',
  },
});