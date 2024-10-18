import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
export default function Home(props) {
    const { navigation, route } = props
    const { navigate } = navigation
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/note.png')}
            />
            <Text style={styles.text}>MANAGE YOUR
                TASK</Text>

            <View style={styles.buttonContainer}>
                <Image style={styles.imgButton} source={require('../assets/mail.png')} />
                <TextInput style={styles.buttonText} placeholder="Enter your name" onChangeText={(name) => setName(name)}
                />
            </View>

            <TouchableOpacity style={styles.startContainer} onPress={() => {
                navigate('Display', {
                    name: name,
                })
            }} >
                <Text style={styles.startText}>GET STARTED </Text>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    image: {
        width: 270,
        height: 270,
        marginBottom: 30,
    },
    text: {
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 36,
        textAlign: 'center',
        color: '#8353E2',
    },
    buttonText: {
        fontSize: 14,
        lineHeight: 26,
        fontWeight: 400,
        textAlign: 'left',
        color: '#BCC1CA',
        marginLeft: 10,
        height: '100%',
        marginBottom: 10,
    },
    imgButton: {
        width: 20,
        height: 20,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        width: '90%',
        marginTop: 20,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        height: 50,
    },
    startContainer: {
        backgroundColor: '#00BDD6',
        marginTop: 20,
        width: '50%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    startText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 26
    },
}); 