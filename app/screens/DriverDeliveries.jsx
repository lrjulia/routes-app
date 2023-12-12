import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import Loader from '../components/LoaderComponent';
import DeliveryModal from '../components/DeliveryModal';


const DriverDeliveries = ({ navigation, driverId }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggerEffectAgain, setTriggerEffectAgain] = useState(false);


  const ordenarPorStatusPrioritario = (arrayDeObjetos) => {
    const statusPrioritarios = ['NAO_ENTREGUE', 'CRIADO'];
  
    arrayDeObjetos.sort((a, b) => {
      const indiceA = statusPrioritarios.indexOf(a.status);
      const indiceB = statusPrioritarios.indexOf(b.status);
  
      if (indiceA > -1 && indiceB > -1) {
        return indiceA - indiceB;
      } else if (indiceA > -1) {
        return -1;
      } else if (indiceB > -1) {
        return 1;
      } else {
        return 0;
      }
    });
  
    return arrayDeObjetos;
  }

  const fetchDeliveries = async () => {
    try {
      const deliveriesCollection = collection(FIREBASE_DB, 'delivery');
      const querySnapshot = await getDocs(deliveriesCollection);
      const deliveriesData = [];


      for (const doc of querySnapshot.docs) {
        const deliveryData = { id: doc.id, ...doc.data() };
        const customerData = await fetchCustomer(deliveryData.customerId);
        const driversData = await fetchDriver(deliveryData.driverId)
        deliveryData.driversName = driversData.nome;
        deliveryData.customerName = customerData.nome
        deliveryData.customerAddress = customerData.rua + ", " + customerData.numero + ", " + customerData.bairro + ", " + customerData.cidade;
        if(deliveryData.driverId === driverId) {
          deliveriesData.push(deliveryData);
        }
      }

      ordenarPorStatusPrioritario(deliveriesData);
      setDeliveries(deliveriesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDeliveries();
  }, [deliveries, triggerEffectAgain]);

  const fetchCustomer = async (customerId) => {
    try {
      const customerDoc = await getDoc(doc(FIREBASE_DB, 'customer', customerId));
      if (customerDoc.exists()) {
        const customerData = customerDoc.data();
        return customerData;
      } else {
        return 'Customer Not Found';
      }
    } catch (err) {
      console.error(err);
      return 'NaN';
    }
  };

  const fetchDriver = async (id) => {
    try {
      const driverDoc = await getDoc(doc(FIREBASE_DB, 'driver', id));
      if (driverDoc.exists()) {
        const dData = driverDoc.data();
        return dData;
      } else {
        return 'Driver Not Found';
      }
    } catch (err) {
      console.error(err);
      return 'NaN';
    }
  };


  function generateMapsURL(waypoints) {
    const baseUrl = 'https://www.google.com/maps/dir/';
    const coordinates = waypoints.map((waypoint) => `${waypoint.latitude},${waypoint.longitude}`);
    return `${baseUrl}${coordinates.join('/')}`;
  }
  
  // Function to open the generated Google Maps URL
  function openMapsRoute(waypoints) {
    const mapsURL = generateMapsURL(waypoints);
    Linking.openURL(mapsURL)
      .catch((err) => console.error('Error opening maps URL:', err));
  }


  const getCoordsFromAddress = async (inputAddress) => {
      try {
          const location = await Location.geocodeAsync(inputAddress);
          if (location && location.length > 0) {
            const { latitude, longitude } = location[0];
            return { latitude, longitude };
          }
          return null;
      } catch (error) {
          console.error('Error fetching coordinates:', error);
          return null;
      }
  };

  function calculateDistance(currentLocation, address) {
      const earthRadius = 6371; // Earth's radius in kilometers

      const latitudeDifference = toRadians(address.latitude - currentLocation.latitude);
      const longitudeDifference = toRadians(address.longitude - currentLocation.longitude);
    
      const a = Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
        Math.cos(toRadians(currentLocation.latitude)) * Math.cos(toRadians(address.latitude)) *
        Math.sin(longitudeDifference / 2) * Math.sin(longitudeDifference / 2);
    
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
      const distance = earthRadius * c;
      return distance;
    }
    
  function toRadians(angle) {
    return angle * Math.PI / 180;
  }
    
  const findOptimalRoute = async (startingPoint, addresses) => {
    let visitedAddresses = [];
    let currentLocation = startingPoint;
    let route = [startingPoint];

    while (visitedAddresses.length < addresses.length) {
      let minDistance = Infinity; // Initialize minimum distance
      let nearestAddressIndex = -1; // Initialize index of nearest address

      for (let i = 0; i < addresses.length; i++) {
        if (!visitedAddresses.includes(addresses[i])) {
          const distance = calculateDistance(currentLocation, addresses[i]);
          if (distance < minDistance) {
              minDistance = distance;
              nearestAddressIndex = i;
          }
        }
      }

      visitedAddresses.push(addresses[nearestAddressIndex]);
      route.push(addresses[nearestAddressIndex]);
      currentLocation = addresses[nearestAddressIndex];
    }
    return route;
  }

  const otimizarRotas = async () => {
    setLoading(true)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const routes = [];

    for (const delivery of deliveries) {
      if(delivery.status !== 'ENTREGUE') {
        const coords = await getCoordsFromAddress(delivery.customerAddress);
        routes.push(coords);
      }
    }
    console.log("ROUTES:  ", routes);

    const optimalRoute = await findOptimalRoute({
        latitude: location.coords.latitude, 
        longitude: location.coords.longitude
    }, routes);


    openMapsRoute(optimalRoute);
    setLoading(false);
  }

  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (delivery) => {
    setSelectedDelivery(delivery);
    setModalVisible(true);
  };

  const closeModal = async () => {
    setModalVisible(false);
    setSelectedDelivery(null);
    setTriggerEffectAgain(!triggerEffectAgain);
  };


  return (
    <View>
      {loading && (
        <Loader />
      )}

      <ScrollView style={styles.container}>
        {deliveries.map((delivery, index) => (
          <TouchableOpacity
            key={delivery.id}
            style={styles.button}
            onPress={() => openModal(delivery)}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {delivery.customerName || 'Loading...'}
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }} numberOfLines={1}>ID: {delivery.id}</Text>
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
      <View style={styles.routesButtonContainer}>
        <TouchableOpacity style={styles.routesButton} onPress={otimizarRotas}>
          <Text style={styles.buttonText}>Obter Rota Otimizada</Text>
        </TouchableOpacity>
      </View>

      <DeliveryModal
        delivery={selectedDelivery}
        visible={modalVisible}
        onClose={closeModal}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: '93%'
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
  routesButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent', // Cor de fundo transparente para não cobrir o conteúdo
    alignItems: 'center',
    paddingBottom: 10,
    width: '100%'
  },
  routesButton: {
    height: 40,
    backgroundColor: '#33a46f', // Light green button color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '100%'
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff', // Dark green text color
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

export default DriverDeliveries;
