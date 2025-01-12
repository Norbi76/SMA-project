import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserStats: React.FC = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Wins: </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
    },
});

export default UserStats;