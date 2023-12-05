import { NavigationContainer } from '@react-navigation/native';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './config/firebaseConfig';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './app/components/TabNavigator';
import Drivers from './app/screens/Drivers';
import Deliveries from './app/screens/Deliveries';
import Customers from './app/screens/Customers';
import { TouchableOpacity, Text } from 'react-native';
import AddItemForm from './app/components/AddItemForm';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from './config/firebaseConfig';
import LocationComponent from './app/components/LocationComponent';
import EditCustomer from './app/components/EditCustomer';
import EditDriver from './app/components/EditDriver';
import EditDelivery from './app/components/EditDelivery';


const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setUser(user);
    })
  })

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#006a57', // Change 'red' to the color you prefer
        }}
      >
        {user ? (
          <Stack.Screen name="Home" options={{ headerShown: false }} >
            {(navigation) => (
              <TabNavigator />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}

      <Stack.Screen 
        name="Drivers" 
        component={Drivers} 
        options={({ navigation }) => ({
          title: 'Motoristas',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddItemForm', {previousScreen: 'Drivers'})}
              style={{ marginRight: 15 }}
            >
              <Text style={{fontSize: 22, fontWeight: 'bold', color: '#006a57'}}>+</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="AddItemForm" component={AddItemForm} options={{ tabBarButton: false, title: "Adicionar" }} />
      <Stack.Screen name="EditCustomer" component={EditCustomer} options={{ tabBarButton: false, title: "Editar Cliente" }} />
      <Stack.Screen name="EditDriver" component={EditDriver} options={{ tabBarButton: false, title: "Editar Motorista" }} />
      <Stack.Screen name="EditDelivery" component={EditDelivery} options={{ tabBarButton: false, title: "Editar Entrega" }} />
      <Stack.Screen name="LocationComponent" component={LocationComponent} options={{ tabBarButton: false, title: "Rotas" }} />
      <Stack.Screen 
        name="Deliveries" 
        component={Deliveries}
        options={({ navigation }) => ({
          title: 'Entregas',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddItemForm', {previousScreen: 'Deliveries'})}
              style={{ marginRight: 15 }}
            >
              <Text style={{fontSize: 22, fontWeight: 'bold', color: '#006a57'}}>+</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="Customers" 
        component={Customers}
        options={({ navigation }) => ({
          title: 'Clientes',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddItemForm', {previousScreen: 'Customers'})}
              style={{ marginRight: 15 }}
            >
              <Text style={{fontSize: 22, fontWeight: 'bold', color: '#006a57'}}>+</Text>
            </TouchableOpacity>
          ),
        })}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
