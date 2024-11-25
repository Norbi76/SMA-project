// FILE: components/Heading.tsx

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

interface HeadingProps {
    text: string;
    fontSize?: number;
    color?: string;
    fontFamily?: string;
    style?: any;
}

const Heading: React.FC<HeadingProps> = ({ 
    text, 
    fontSize = 24, 
    color = 'black',
    fontFamily = 'Roboto',
    style 
}) => {
    const [fontsLoaded] = useFonts({
        'Roboto': require('../assets/fonts/Roboto-Regular.ttf'),
        // Add more fonts as needed
    });

    if (!fontsLoaded) {
        return null; // Or a loading indicator
    }

    return (
        <Text style={[
            styles.heading,
            {
                fontSize,
                color,
                fontFamily
            },
            style
        ]}>
            {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    heading: {
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default Heading;