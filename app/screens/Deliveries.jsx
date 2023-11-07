import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../config/firebaseConfig';
import { View, TextInput, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const Deliveries = () => {
  const [searchText, setSearchText] = useState('');
  const { image, trackingId, title, price, status } = "packageDa";

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={{ width: 80, height: 80, resizeMode: 'cover' }} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>Tracking ID: {trackingId}</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>Price: ${price}</Text>
        <Text style={{ fontSize: 14, color: status === 'Pending' ? '#F00' : '#0F0', marginTop: 5 }}>Status: {status}</Text>
      </View>
    </View>
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

export default Deliveries;
