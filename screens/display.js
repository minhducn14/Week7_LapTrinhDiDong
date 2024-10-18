import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Image, ActivityIndicator, TextInput } from 'react-native';

const Item = ({ title, id, onEdit, onDelete }) => (
    <View style={styles.item}>
        <TouchableOpacity onPress={onEdit}>
            <Image
                style={styles.icon}
                source={require('../assets/tick.png')}
            />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onEdit}>
                <Image
                    style={styles.icon}
                    source={require('../assets/edit.png')}
                    accessibilityLabel={`Edit ${id}`}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
                <Image
                    style={styles.icon}
                    source={require('../assets/delete.png')}
                    accessibilityLabel={`Delete ${id}`}
                />
            </TouchableOpacity>
        </View>
    </View>
);

export default function Display(props) {
    const { navigation, route } = props;
    const { name } = route.params;
    console.log(`Name: ${name}`);
    const [searchText, setSearchText] = useState('')

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = 'https://670b38d1ac6860a6c2cb7013.mockapi.io/todos';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                Alert.alert("Error", "Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        console.log(`Editing ${id}`);
        // Implement your edit logic here
    };

    const handleDelete = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        const urlDel = `${url}/${id}`;
                        try {
                            const response = await fetch(urlDel, { method: 'DELETE' });
                            if (response.ok) {
                                setData(prevData => prevData.filter(item => item.id !== id));
                            } else {
                                Alert.alert("Error", "Failed to delete item.");
                            }
                        } catch (error) {
                            console.error("Error deleting item:", error);
                            Alert.alert("Error", "Failed to delete item.");
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/goBack.png')} />
                </TouchableOpacity>

                <View style={styles.headerText}>
                    <Image source={require('../assets/avar.png')} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.headerTitle}>Hi, {name}</Text>
                        <Text style={styles.headerSubtitle}>Have agrate day a head</Text>
                    </View>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <Image source={require('../assets/search.png')} />
                <TextInput
                    style={styles.textSearch}
                    placeholder='Search'
                    onChangeText={text => setSearchText(text)}
                    value={searchText}
                />
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <Item
                        title={item.title}
                        id={item.id}
                        onEdit={() => handleEdit(item.id)}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Image source={require('../assets/add.png')} />
            </TouchableOpacity>

        </View >

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
    },
    headerText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerSubtitle: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: 700,
        color: 'gray',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 30,
        color: '#171A1F',
        marginLeft: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        borderRadius: 20,
        backgroundColor: '#DEE1E678',
        margin: 20,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
    },
    title: {
        fontSize: 18,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 24,
        width: 24,
        marginLeft: 10,
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
    },
});
