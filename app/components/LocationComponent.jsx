import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Text, StyleSheet, FlatList, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const LocationComponent = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const route = useRoute();
    const [deliveries, setDeliveries] =useState([]);

    const addressData = [
    {
        address: 'Casa Julia',
        city: 'Anytown',
        icon: 'pin',
        latitude: -19.9161669,
        longitude: -43.9110709,
    },
    {
        address: 'Puc São Gabriel',
        city: 'Otherville',
        icon: 'home',
        latitude: -19.8594055,
        longitude: -43.921511,
    }
    ];

    useEffect(() => {
        (async () => {
            
            // openMapsRoute(optimalRoute._j)
        })();
    }, []);

    // Function to generate a Google Maps URL with the provided waypoints


    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.addressContainer}>
                <FontAwesome5 name={item.icon} size={24} color="#33a46f" style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.addressText}>{item.address}</Text>
                    <Text style={styles.cityText}>{item.city}</Text>
                </View>
                {index !== addressData.length - 1 && <View style={styles.separator} />}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
            data={addressData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10,
    },
    icon: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    addressText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cityText: {
        color: '#666',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        position: 'absolute',
        bottom: 0,
        left: 50, // Adjust based on icon width or alignment
        right: 0,
    },
});

export default LocationComponent;
