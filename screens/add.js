import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';

export default function Add(props) {
    const { navigation, route } = props;
    const { name } = route.params;
    const [addText, setAddText] = useState('');

    const url = 'https://670b38d1ac6860a6c2cb7013.mockapi.io/todos';
    const [data, setData] = useState({ status: false, title: '' });

    const addData = async () => {
        if (!addText.trim()) {
            Alert.alert('Validation Error', 'Job title cannot be empty');
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                Alert.alert('Success', 'Job added successfully');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to add job');
            }
        } catch (error) {
            console.error('Error adding job:', error);
            Alert.alert('Error', 'Failed to add job');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Image source={require('../assets/avar.png')} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.headerTitle}>Hi, {name}</Text>
                        <Text style={styles.headerSubtitle}>Have a great day ahead</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/goBack.png')} />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>ADD YOUR JOB</Text>
            <View style={styles.searchContainer}>
                <Image source={require('../assets/list.png')} />
                <TextInput
                    style={styles.textSearch}
                    placeholder="Input your job"
                    onChangeText={text => {
                        setAddText(text);
                        setData({ ...data, title: text });
                    }}
                    value={addText}
                />
            </View>

            <View style={styles.iconContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/note.png')}
                />
            </View>

            <View style={styles.finish}>
                <TouchableOpacity
                    style={styles.finishContainer}
                    onPress={addData}
                >
                    <Text style={styles.finishText}>Finish</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerSubtitle: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: '700',
        color: 'gray',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#171A1F',
        marginLeft: 10,
    },
    title: {
        fontSize: 32,
        lineHeight: 48,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DEE1E678',
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
    },
    textSearch: {
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
    image: {
        width: 270,
        height: 270,
        marginBottom: 30,
    },
    finishContainer: {
        backgroundColor: '#00BDD6',
        marginTop: 20,
        width: '50%',
        height: 50,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    finishText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 26,
        textAlign: 'center',
    },
    finish: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
