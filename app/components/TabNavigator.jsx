import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Map from '../screens/Map';
import Drivers from '../screens/Drivers';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: '#006a57'
          },
          tabBarIcon: () => (
            <Ionicons name="home" size={20} color={"#006a57"} />
          ),
        }}
      />
      <Tab.Screen
        name="Drivers"
        component={Drivers}
        options={{
          tabBarLabel: 'Drivers',
          tabBarLabelStyle: {
            color: '#006a57'
          },
          tabBarIcon: () => (
            <Ionicons name="person" size={20} color={'#006a57'} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: 'Map',
          tabBarLabelStyle: {
            color: '#006a57'
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={20} color={'#006a57'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;