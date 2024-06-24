import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-input";

const EditCustomer = ({ navigation }) => {
    const [customerData, setCustomerData] = useState(null);
    const route = useRoute();
    const customer = route.params?.customer || "No data received";

    const [editedCustomer, setEditedCustomer] = useState({
        bairro: '',
        cep: '',
        cidade: '',
        cnpj: '',
        complemento: '',
        email: '',
        estado: '',
        nome: '',
        numero: '',
        rua: '',
        telefone: '',
        userId: '',
      });

  useEffect(() => {
    setCustomerData(customer);
    setEditedCustomer(customer);
    console.log("CUSTOMER", customer.id);
  }, []);

  const handleUpdateCustomer = async () => {
    try {
        console.log(customerData);
      const customerRef = doc(FIREBASE_DB, 'customer', customerData.id);
      await updateDoc(customerRef, editedCustomer);

      navigation.goBack();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      const customerRef = doc(FIREBASE_DB, 'customer', customerData.id);
      await deleteDoc(customerRef);
      
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  if (!customerData) {
    return <Text>Loading...</Text>;
  }

  return (

        <KeyboardAwareScrollView>
            <ScrollView style={styles.container}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                style={styles.input}
                value={editedCustomer.nome}
                onChangeText={(text) => setEditedCustomer({ ...editedCustomer, nome: text })}
                />

                <Text style={styles.label}>CNPJ:</Text>
                <TextInput
                style={styles.input}
                value={editedCustomer.email}
                onChangeText={(text) => setEditedCustomer({ ...editedCustomer, cnpj: text })}
                keyboardType="email-address"
                />

                <Text style={styles.label}>Número de Telefone:</Text>
                <TextInput
                style={styles.input}
                value={editedCustomer.telefone}
                onChangeText={(text) => setEditedCustomer({ ...editedCustomer, telefone: text })}
                keyboardType="phone-pad"
                />

                <Text style={styles.label}>Rua:</Text>
                <TextInput
                style={styles.input}
                value={editedCustomer.rua}
                onChangeText={(text) => setEditedCustomer({ ...editedCustomer, rua: text })}
                />

                <Text style={styles.label}>Número:</Text>
                <TextInput
                style={styles.input}
                value={editedCustomer.numero}
                onChangeText={(text) => setEditedCustomer({ ...editedCustomer, numero: text })}
                keyboardType='number-pad'
                />

                <Text style={styles.label}>Complemento:</Text>
                <TextInput
                style={styles.input}
                value={editedCustomer.complemento}
                onChangeText={(text) => setEditedCustomer({ ...editedCustomer, complemento: text })}
                />

                <Text style={styles.label}>Bairro:</Text>
                <TextInput
                style={styles.input}
                value={editedCustomer.bairro}
                onChangeText={(text) => setEditedCustomer({ ...editedCustomer, bairro: text })}
                />

                <Text style={styles.label}>Cidade:</Text>
                <TextInput
                style={styles.input}
                value={editedCustomer.cidade}
                onChangeText={(text) => setEditedCustomer({ ...editedCustomer, cidade: text })}
                />

                <Text style={styles.label}>Estado:</Text>
                <TextInput
                style={styles.input}
                value={editedCustomer.estado}
                onChangeText={(text) => setEditedCustomer({ ...editedCustomer, estado: text })}
                />

                <TouchableOpacity style={styles.button} onPress={handleUpdateCustomer}>
                    <Text style={styles.buttonText}>Salvar Alterações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteCustomer}>
                    <Text style={styles.buttonText}>Delete Customer</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAwareScrollView>

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
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#006a57',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#a63346',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default EditCustomer;
