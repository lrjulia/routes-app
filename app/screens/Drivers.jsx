import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../config/firebaseConfig';
import { View, TextInput, TouchableOpacity, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


const Drivers = () => {
  const [searchText, setSearchText] = useState('');
  const { image, trackingId, title, price, status } = "packageDa";

  return (
    <ScrollView style={entregas.container}>
      <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
        <MaterialIcons name="person" size={30} style={entregas.icon} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Austin Jones</Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>ID: #2334936</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
        <MaterialIcons name="person" size={30} style={entregas.icon} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Felix Bailey</Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>ID: #2334936</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
        <MaterialIcons name="person" size={30} style={entregas.icon} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Zane Sandoval</Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>ID: #2334936</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
        <MaterialIcons name="person" size={30} style={entregas.icon} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Alvin Bell</Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>ID: #2334936</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
        <MaterialIcons name="person" size={30} style={entregas.icon} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Scott Galvan</Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>ID: #2334936</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
        <MaterialIcons name="person" size={30} style={entregas.icon} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Ashleigh Blevins</Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>ID: #2334936</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
        <MaterialIcons name="person" size={30} style={entregas.icon} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Roger Branch</Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>ID: #2334936</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={entregas.button} onPress={() => navigation.push('Drivers')} >
        <MaterialIcons name="person" size={30} style={entregas.icon} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Dhruv Castillo</Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>ID: #2334936</Text>
        </View>
      </TouchableOpacity>
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
