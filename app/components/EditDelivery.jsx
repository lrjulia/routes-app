import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import { doc, getDocs, getDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditDelivery = ({ navigation }) => {
    const [deliveryData, setDeliveryData] = useState(null);
    const route = useRoute();
    const delivery = route.params?.delivery || "No data received";

    const [edited, setEdited] = useState({
      driverId: '',
      customerId: '',
      descricao: '',
      valor: '',
      userId: '',
    });

  useEffect(async () => {
    console.log(delivery);
    setDeliveryData(delivery);
    setEdited(delivery);
  }, []);
  

  const handleUpdate = async () => {
    try {
      const deliveryRef = doc(FIREBASE_DB, 'delivery', deliveryData.id);
      await updateDoc(deliveryRef, edited);

      navigation.goBack();
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const deliveryRef = doc(FIREBASE_DB, 'delivery', deliveryData.id);
      await deleteDoc(deliveryRef);
      
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  if (!deliveryData) {
    return <Text>Loading...</Text>;
  }

  return (

    <KeyboardAwareScrollView>
      <ScrollView style={styles.container}>

        <Text style={styles.label}>Cliente:</Text>
        <TextInput
        style={styles.input}
        value={edited.customerName}
        editable={false} selectTextOnFocus={false}
        />

        <Text style={styles.label}>Motorista:</Text>
        <TextInput
        style={styles.input}
        value={edited.driversName}
        editable={false} selectTextOnFocus={false}
        />

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.inputMultiline}
        value={edited.descricao}
        onChangeText={(text) => setEdited({ ...edited, descricao: text })}
        />

        <Text style={styles.label}>Valor:</Text>
        <TextInput
        style={styles.input}
        value={edited.valor}
        keyboardType="numeric"
        onChangeText={(text) => setEdited({ ...edited, valor: text })}
        type="number"
        />  

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Excluir Entrega</Text>
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
      inputMultiline: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      minHeight: 100,
    },
});

export default EditDelivery;
