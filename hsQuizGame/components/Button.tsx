import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    color?: string;
    width?: number;
    height?: number;
    primary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, color = 'blue', width, height, primary = true }) => {
    const primaryStyleButton = [
        {backgroundColor: color, }
    ];
    const primaryStyleText = [
        {color: "white", }
    ];
    
    return (
        <TouchableOpacity style={[
            styles.button, 
            { width: width, height:height, },
            primary ? {backgroundColor: color} : {backgroundColor: 'white'},
        ]} 
        onPress={onPress}>
            <Text style={[styles.buttonText,primary ? {color: "white"} : {color: color}]}>{title}</Text>
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
    primaryButton: {
        backgroundColor: 'red',
        
    }
});

export default Button;
