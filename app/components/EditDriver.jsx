import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditDriver = ({ navigation }) => {
    const [driverData, setDriverData] = useState(null);
    const route = useRoute();
    const driver = route.params?.driver || "No data received";

    const [edited, setEdited] = useState({
        cpf: '',
        email: '',
        nome: '',
        sobrenome: '',
        telefone: '',
        nascimento: '',
        userId: '',
      });

  useEffect(() => {
    setDriverData(driver);
    setEdited(driver);
  }, []);

  const handleUpdate = async () => {
    try {
      const driverRef = doc(FIREBASE_DB, 'driver', driverData.id);
      await updateDoc(driverRef, edited);

      navigation.goBack();
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const driverRef = doc(FIREBASE_DB, 'driver', driverData.id);
      await deleteDoc(driverRef);
      
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  if (!driverData) {
    return <Text>Loading...</Text>;
  }

  return (

    <KeyboardAwareScrollView>
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
        style={styles.input}
        value={edited.nome}
        onChangeText={(text) => setEdited({ ...edited, nome: text })}
        />

        <Text style={styles.label}>Sobrenome:</Text>
        <TextInput
        style={styles.input}
        value={edited.sobrenome}
        onChangeText={(text) => setEdited({ ...edited, sobrenome: text })}
        />

        <Text style={styles.label}>Data de Nascimento:</Text>
        <TextInput
        style={styles.input}
        value={edited.nascimento}
        onChangeText={(text) => setEdited({ ...edited, nascimento: text })}
        />

        <Text style={styles.label}>CPF:</Text>
        <TextInput
        style={styles.input}
        value={edited.cpf}
        onChangeText={(text) => setEdited({ ...edited, cpf: text })}
        />

        <Text style={styles.label}>Número de Telefone:</Text>
        <TextInput
        style={styles.input}
        value={edited.telefone}
        onChangeText={(text) => setEdited({ ...edited, telefone: text })}
        keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
        style={styles.input}
        value={edited.email}
        onChangeText={(text) => setEdited({ ...edited, email: text })}
        keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
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

export default EditDriver;
