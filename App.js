import { NavigationContainer } from '@react-navigation/native';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './config/firebaseConfig';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './app/components/TabNavigator';
import Drivers from './app/screens/Drivers';

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

      </Stack.Navigator>
    </NavigationContainer>
  );
}
