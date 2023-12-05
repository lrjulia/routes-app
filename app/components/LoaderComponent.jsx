import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';

const Loader = ({ loading }) => (
  <Modal
    transparent={true}
    animationType="none"
    visible={loading}
    onRequestClose={() => {}} // Tratar fechamento do modal se necessário
  >
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
});

export default Loader;
