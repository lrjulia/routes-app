import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AddItemForm = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemAddress, setItemAddress] = useState('');
  const [driverId, setDriverId] = useState('');
  const [clientId, setClientId] = useState('');

  const handleAddItem = () => {
    // Perform an action (e.g., save to database, state, etc.) with the entered item details
    // For demonstration, it logs the entered item details for now
    console.log('Item Name:', itemName);
    console.log('Item Description:', itemDescription);
    console.log('Item Price:', itemPrice);
    console.log('Item Address:', itemAddress);
    console.log('Driver ID:', driverId);
    console.log('Client ID:', clientId);

    // Navigate back to the previous screen after adding the item
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={text => setItemName(text)}
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={[styles.input]}
        value={itemDescription}
        onChangeText={text => setItemDescription(text)}
      />

        <Text style={styles.label}>ID Entregador:</Text>
        <TextInput
        style={styles.input}
        value={driverId}
        onChangeText={text => setDriverId(text)}
        />

        <Text style={styles.label}>ID Cliente:</Text>
        <TextInput
        style={styles.input}
        value={clientId}
        onChangeText={text => setClientId(text)}
        />

      <Text style={styles.label}>Valor:</Text>
      <TextInput
        style={styles.input}
        value={itemPrice}
        onChangeText={text => setItemPrice(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Endereço:</Text>
      <TextInput
        style={[styles.input]}
        value={itemAddress}
        onChangeText={text => setItemAddress(text)}
      />

      <TouchableOpacity style={styles.addButton} title="Add Item" onPress={handleAddItem}>
        <Text style={styles.addButtonText}>Adicionar Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#006a57',
    borderRadius: 5
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  }
});

export default AddItemForm;
