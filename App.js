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
import { TouchableOpacity, Text } from 'react-native';
import AddItemForm from './app/components/AddItemForm';


const Stack = createNativeStackNavigator();


export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
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

      <Stack.Screen name="Drivers" component={Drivers} options={{ tabBarButton: false, title: "Motoristas" }} />
      <Stack.Screen name="AddItemForm" component={AddItemForm} options={{ tabBarButton: false, title: "Adicionar" }} />
      <Stack.Screen 
        name="Deliveries" 
        component={Deliveries}
        options={({ navigation }) => ({
          title: 'Entregas',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddItemForm')}
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
