import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, Platform } from 'react-native';

interface ButtonProps {
    title: string;
    onPress?: (event: GestureResponderEvent) => void;
    color?: string;
    width?: number;
    height?: number;
    primary?: boolean;
    style?: StyleProp<ViewStyle>
}

const Button: React.FC<ButtonProps> = ({ style, title, onPress, color = 'blue', width, height, primary = true }) => {
    return (
        <TouchableOpacity style={[
            styles.button, 
            { width: width, height:height, },
            { ...Platform.select({
                web: {
                    margin: 10,
                },
                android: {
                    marginBottom: 10,
                },
            }), },
            primary ? {backgroundColor: color} : {backgroundColor: 'white'},
            style,
        ]} 
        onPress={onPress}
        activeOpacity={onPress ? 0.2 : 1}
        >
            <Text style={[styles.buttonText,primary ? {color: "white"} : {color: color}]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        alignSelf: 'center',
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
