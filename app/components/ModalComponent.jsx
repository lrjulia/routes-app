import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Alert
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

const ModalComponent = ({ visible, driverId, closeModal, copyDriverId }) => {

  const handleCopyDriverId = async () => {
    await Clipboard.setStringAsync(driverId);
    Alert.alert('Código copiado com sucesso!');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{textAlign: 'center'}}>Código para cadastro</Text>
          <Text style={{fontWeight: 'bold', marginVertical: 10}}>{driverId}</Text>

          <View>
            <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={handleCopyDriverId}
            >
                <Text style={styles.textStyle}>Copiar</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#FF6347' }}
                onPress={closeModal}
            >
                <Text style={styles.textStyle}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: 'auto',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%'
  },
});

export default ModalComponent;
