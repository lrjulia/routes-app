import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../config/firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

const Servicos = ({navigation}) => {
  return (
    <View style={servicos.container}>
      <TouchableOpacity style={servicos.button} onPress={() => navigation.push('Drivers')} >
        <MaterialCommunityIcons name="motorbike" size={40} style={servicos.icon} />
        <Text style={servicos.buttonText}>Motoristas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={servicos.button} onPress={() => navigation.push('Drivers')} >
        <MaterialCommunityIcons name="account" size={40} style={servicos.icon} />
        <Text style={servicos.buttonText}>Clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={servicos.button} onPress={() => navigation.navigate('Deliveries')} >
        <MaterialCommunityIcons name="package" size={40} style={servicos.icon} />
        <Text style={servicos.buttonText}>Entregas</Text>
      </TouchableOpacity>
    </View>
  );
}

const Entregas = () => {
  return (
    <View style={entregas.container}>
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
    </View>
  );
}

const Home = ({ navigation }) => {
  return (
    <View style={home.container}>
      <Text style={home.text}>Serviços</Text>
      <Servicos navigation={navigation}/>
      <Text style={home.text}>Entregas Recentes</Text>
      <Entregas />
    </View>
  );
};

const home = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    padding: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
  }
});

const servicos = StyleSheet.create({
  container: {
    display: 'block',
    gap: 10,
    alignItems: 'center',
    padding: 10,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(51, 164, 111, .1)',
    padding: 30,
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  icon: {
    textAlign: 'center',
    color: 'rgba(51, 164, 111, 1)',
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

export default Home;
