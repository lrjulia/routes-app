import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../config/firebaseConfig';
import { View, TextInput, TouchableOpacity, Alert, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import EditCustomer from '../components/EditCustomer';


const Customers = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);

  React.useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersCollection = collection(FIREBASE_DB, 'customer');
        const querySnapshot = await getDocs(customersCollection);
  
        const customersData = [];
        querySnapshot.forEach((doc) => {
          customersData.push({ id: doc.id, ...doc.data() });
        });
  
        setCustomers(customersData);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
  
    fetchCustomers();
  
    const focusHandler = navigation.addListener('focus', () => {
      fetchCustomers();
    });
  
    return focusHandler;
  }, [navigation]);  

  return (
    <ScrollView style={clientes.container}>
      {customers.map((customer) => (
        <TouchableOpacity
          key={customer.id}
          style={clientes.button}
          onPress={() => {
            navigation.navigate('EditCustomer', { customer: customer })
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', paddingBottom: 2 }}>{customer.nome}</Text>
            <Text style={{ fontSize: 14, color: '#666', textAlign: 'left' }}>ID: {customer.id}</Text>
            {/* Display other driver information as needed */}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const clientes = StyleSheet.create({
  container: {
    display: 'block',
    padding: 10,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  }
});

export default Customers;
