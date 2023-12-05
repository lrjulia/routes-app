import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';


const Drivers = ({ navigation }) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driversCollection = collection(FIREBASE_DB, 'driver');
        const querySnapshot = await getDocs(driversCollection);
        const driverData = [];
        querySnapshot.forEach((doc) => {
          driverData.push({ id: doc.id, ...doc.data() });
        });
        setDrivers(driverData);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();

    const focusHandler = navigation.addListener('focus', () => {
      fetchDrivers();
    });

    return focusHandler;
  }, [navigation]); 

  return (
    <ScrollView style={entregas.container}>
      {drivers.map((driver) => (
        <TouchableOpacity
          key={driver.id}
          style={entregas.button}
          onPress={() => {
            navigation.navigate('EditDriver', { driver: driver })
          }}
        >
          <MaterialIcons name="person" size={30} style={entregas.icon} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>{driver.nome} {driver.sobrenome}</Text>
            <Text style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>ID: {driver.id}</Text>
            {/* Display other driver information as needed */}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const entregas = StyleSheet.create({
  container: {
    display: 'block',
    padding: 10,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  },
  icon: {
    textAlign: 'left',
    color: '#ccc',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
  },
});

export default Drivers;
