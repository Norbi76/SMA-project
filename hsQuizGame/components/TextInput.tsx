// FILE: components/TextInput.tsx

import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps, Platform, StyleProp, ViewStyle } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    borderColor?: string;
    width?: number;
    height?: number;
    secureTextEntry?: boolean;
    // style?: StyleProp<ViewStyle>
}

const TextInput: React.FC<CustomTextInputProps> = ({ 
    placeholder, 
    value, 
    onChangeText, 
    borderColor = 'gray',
    width,
    height,
    secureTextEntry = false,
    // style,
    ...rest 
}) => {
    return (
        <RNTextInput
            style={[
                styles.input, 
                {
                    borderColor:borderColor, 
                    width:width, 
                    height:height,
                    ...Platform.select({
                        web: {
                            margin: 10,
                        },
                        android: {
                            margin: 5,
                        },
                    }),
                }, 
                // style
            ]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5, 
        alignSelf: 'flex-start',
    },
});

export default TextInput;