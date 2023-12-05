import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import { doc, getDocs, getDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ModalPicker from './ModalPicker';

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

    const fetchCustomerName = async (customerId) => {
      try {
        const customerDoc = await getDoc(doc(FIREBASE_DB, 'customer', customerId));
        if (customerDoc.exists()) {
          const customerData = customerDoc.data();
          return customerData.nome;
        } else {
          return 'Customer Not Found';
        }
      } catch (err) {
        console.error(err);
        return 'NaN';
      }
    };

  useEffect(async () => {
    
    setDeliveryData(delivery);
    setEdited(delivery);
  }, []);


  const [driverId, setDriverId] = useState("");
  const [drivers, setDrivers] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "driver"));
        setDrivers(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIREBASE_DB, "customer")
        );
        setCustomers(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
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

  const handleDriverSelect = (selectedOption) => {
    setDriverId(selectedOption.id);
  };

  const handleCustomerSelect = async (selectedOption) => {
    setCustomerId(selectedOption.id);
  };

  if (!deliveryData) {
    return <Text>Loading...</Text>;
  }

  return (

    <KeyboardAwareScrollView>
        <ScrollView>
        <Text style={styles.label}>Cliente:</Text>
        <ModalPicker options={customers} onSelect={handleCustomerSelect} input={delivery.customerName} />

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

export default EditDelivery;
