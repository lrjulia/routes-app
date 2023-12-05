import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';

const Deliveries = ({ navigation }) => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const deliveriesCollection = collection(FIREBASE_DB, 'delivery');
        const querySnapshot = await getDocs(deliveriesCollection);
        const deliveriesData = [];

        for (const doc of querySnapshot.docs) {
          const deliveryData = { id: doc.id, ...doc.data() };
          const customerName = await fetchCustomerName(deliveryData.customerId);
          deliveryData.customerName = customerName; // Add customerName to the deliveryData
          deliveriesData.push(deliveryData);
        }

        setDeliveries(deliveriesData);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };
    fetchDeliveries();
  }, []);

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

  return (
    <ScrollView style={styles.container}>
      {deliveries.map((delivery, index) => (
        <TouchableOpacity
          key={delivery.id}
          style={styles.button}
          onPress={() => {navigation.navigate('EditDelivery', { delivery: delivery })}}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {delivery.customerName || 'Loading...'}
            </Text>
            <Text numberOfLines={1} style={{ fontSize: 14, color: '#666' }}>ID: {delivery.id}</Text>
          </View>
          <View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right', padding: 2 }}>
                  R$ {parseFloat(delivery.valor).toFixed(2)}
                </Text>
              </View>
              {delivery.status == "NAO_ENTREGUE" && (
                <>
                <View style={styles.naoEntregue}>
                  <Text style={styles.naoEntregueText}>
                    Não Entregue
                  </Text>
                </View>
                </>
              )}

              {delivery.status == "ENTREGUE" && (
                <>
                <View style={styles.entregue}>
                  <Text style={styles.entregueText}>
                    Entregue
                  </Text>
                </View>
                </>
              )}

              {delivery.status == "CRIADA" && (
                <>
                <View style={styles.criada}>
                  <Text style={styles.criadaText}>
                    Criada
                  </Text>
                </View>
                </>
              )}
              
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  icon: {
    color: 'rgba(51, 164, 111, 1)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
  },
  naoEntregue: {
    marginTop: 10,
    padding: 7,
    borderRadius: 7,
    textAlign: 'right',
    backgroundColor: '#a63346',
  },
  naoEntregueText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
  entregue: {
    marginTop: 10,
    padding: 7,
    borderRadius: 7,
    textAlign: 'right',
    backgroundColor: '#33a46f',
  },
  entregueText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
  criada: {
    marginTop: 10,
    padding: 7,
    borderRadius: 7,
    textAlign: 'right',
    backgroundColor: '#c0c0c0',
  },
  criadaText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
});

export default Deliveries;
