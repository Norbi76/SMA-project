import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    color?: string;
    width?: number;
    height?: number;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, color = 'blue', width, height }) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color, width: width, height:height, }]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Button;
