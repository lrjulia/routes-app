import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';

const DeliveryModal = ({ delivery, visible, onClose }) => {
  if (!visible || !delivery) return null;

const entregue = async () => {
    try {
        await updateDoc(doc(FIREBASE_DB, 'delivery', delivery.id), { status: 'ENTREGUE' });
        onClose();
    } catch (error) {
        console.error('Error marking as delivered:', error);
    }
    };

    const naoEntregue = async () => {
        try {
            await updateDoc(doc(FIREBASE_DB, 'delivery', delivery.id), { status: 'NAO_ENTREGUE' });
            onClose();
        } catch (error) {
            console.error('Error marking as not delivered:', error);
        }
    };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{delivery.customerName}</Text>
          <Text>ID: {delivery.id}</Text>
          <Text>Status: {delivery.status}</Text>
          <Text>Descrição: {delivery.descricao}</Text>
          {/* Outras informações da entrega */}
          {delivery.status == 'CRIADA' || delivery.status == 'NAO_ENTREGUE' ? (
            <>
            <TouchableOpacity style={styles.entregueButton} onPress={entregue}>
                <Text style={styles.entregueButtonText}>Marcar como entregue</Text>
            </TouchableOpacity>
            </>
          ) : (
            <>
            <TouchableOpacity style={styles.naoEntregueButton} onPress={naoEntregue}>
                <Text style={styles.naoEntregueButtonText}>Marcar como não entregue</Text>
            </TouchableOpacity>
            </>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  entregueButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#33a46f',
    width: '100%'
  },
  naoEntregueButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#a63346',
    width: '100%'
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#333',
    width: '100%'
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  entregueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  naoEntregueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DeliveryModal;
