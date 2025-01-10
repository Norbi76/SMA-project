import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { RelativePathString, ExternalPathString } from 'expo-router';

const Header = ({ route }: { route: RelativePathString }) => {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push(route)}>
                <Text style={styles.backButtonText}>👤</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backButton: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 'auto',
    },
    backButtonText: {
        color: '#007AFF',
        fontSize: 25,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        
    },
});

export default Header;