import React, { useEffect, useState } from 'react';
import { View, Text, Button, Linking } from 'react-native';

const Map = () => {

    const openMapsApp = () => {
        // Define your waypoints as an array of objects with latitudes and longitudes
        const waypoints = [
          { lat: 37.7749, lng: -122.4194 }, // Example waypoint 1
          { lat: 34.0522, lng: -118.2437 }, // Example waypoint 2
          // Add more waypoints as needed
        ];
    
        // Build the URL for the maps app deep link
        const waypointsParam = waypoints
          .map((waypoint) => `${waypoint.lat},${waypoint.lng}`)
          .join('+to:');
        const mapsUrl = `https://www.google.com/maps/dir/${waypointsParam}`;
    
        // Open the maps app with the deep link
        Linking.openURL(mapsUrl)
          .catch((error) => console.error('Error opening maps app: ' + error));
      };
    
      return (
        <View style={{ flex: 1 }}>
          <Text>Click the button to open the maps app with the waypoints route.</Text>
          <Button title="Open Maps App" onPress={openMapsApp} />
        </View>
      );
};

export default Map;
