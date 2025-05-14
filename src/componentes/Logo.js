import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';

function Logo() {
    return (
        <View style={styles.logoContainer}>
            <Image source={logo3} style={styles.logoImage} />
            <Text style={styles.logoText}>
                <Text style={styles.boldText}>Med </Text>o'Clock
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    logoText: {
        fontSize: 40,
        color: '#FF407D',
    },
    boldText: {
        fontWeight: 'bold',
    },
    logoImage: {
        marginRight: 10,
        width: 60,
        height: 60,
      },
});

export default Logo;