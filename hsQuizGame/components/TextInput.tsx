// FILE: components/TextInput.tsx

import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    borderColor?: string;
    width?: number;
    height?: number;
}

const TextInput: React.FC<CustomTextInputProps> = ({ 
    placeholder, 
    value, 
    onChangeText, 
    borderColor = 'gray',
    width,
    height,
    ...rest 
}) => {
    return (
        <RNTextInput
            style={[styles.input, { borderColor:borderColor, width:width, height:height }]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5, 
    },
});

export default TextInput;