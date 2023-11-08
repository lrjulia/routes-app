import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../config/firebaseConfig';
import { ScrollView, View, TextInput, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const Deliveries = () => {
  const [searchText, setSearchText] = useState('');
  const { image, trackingId, title, price, status } = "packageDa";

  return (
      <ScrollView style={entregas.container}>
        <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
          <Feather name="box" size={30} style={entregas.icon} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Entrega 1</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>ID: #2334936</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>R$ 3.000</Text>
            <Text style={{ fontSize: 14, color: '#33a46f', textAlign: 'right' }}>Entregue</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
          <Feather name="box" size={30} style={entregas.icon} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Entrega 2</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>ID: #9874358</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>R$ 500</Text>
            <Text style={{ fontSize: 14, color: '#F00', textAlign: 'right' }}>Pendente</Text>
            {/* <Text style={{ fontSize: 14, color: status === 'Pending' ? '#F00' : '#0F0', marginTop: 5 }}>Status:</Text> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
          <Feather name="box" size={30} style={entregas.icon} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Entrega 3</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>ID: #9874359</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>R$ 100</Text>
            <Text style={{ fontSize: 14, color: '#33a46f', textAlign: 'right' }}>Entregue</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
  },
});

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
    color: 'rgba(51, 164, 111, 1)',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
  },
});

export default Deliveries;
