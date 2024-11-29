// FILE: components/Card.tsx

import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: number;
    margin?: number;
    backgroundColor?: string;
    elevation?: number;
    borderRadius?: number;
}

const Card: React.FC<CardProps> = ({
    children,
    style,
    padding = 16,
    margin = 8,
    backgroundColor = 'white',
    elevation = 3,
    borderRadius = 8
}) => {
    return (
        <View style={[
            styles.card,
            {
                padding,
                margin,
                backgroundColor,
                borderRadius,
                ...Platform.select({
                    ios: {
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    },
                    android: {
                        elevation: elevation,
                    },
                }),
            },
            style
        ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // flex: 1,
        flexDirection: 'column',
        height: '50%',
        justifyContent: 'space-between',
        gap: 20,
    }
});

export default Card;