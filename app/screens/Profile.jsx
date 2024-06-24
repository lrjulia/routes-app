import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FIREBASE_AUTH } from '../../config/firebaseConfig';

const Profile = ({ navigator }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>Profile</Text>
        <TouchableOpacity style={styles.button} onPress={() => FIREBASE_AUTH.signOut()}>
            <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    button: {
      backgroundColor: '#006a57',
      borderRadius: 5
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 12,
    }
  });

export default Profile