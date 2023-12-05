import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ModalPicker = ({ options, onSelect, input }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    console.log(input);

    if(input) {
      setSelectedOption(input);
    }

    const handleSelect = (option) => {
        setSelectedOption(option.nome);
        setModalVisible(false);
        onSelect && onSelect(option);
    };
  
    const placeholderText = 'Selecione uma opção';

    return (
      <View style={styles.container}>
        <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setModalVisible(true)}
        >
            <Text>{selectedOption != '' ? selectedOption : placeholderText}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.option}
                  onPress={() => handleSelect(option)}
                >
                  <Text style={styles.optionText}>{option.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
            >
                <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      selectButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        width: '100%',
        backgroundColor: '#ffffff'
     },
      selectedOptionText: {
        fontSize: 16,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        maxHeight: '60%',
        width: '80%',
        overflow: 'scroll',
      },
    option: {
        borderRadius: 5,
        backgroundColor: '#c0c0c0',
        padding: 10,
        marginVertical:4
    },
    optionText: {
        fontSize: 16,
        color: 'black',
    },
    closeButton: {
        backgroundColor: '#006a57',
        borderRadius: 5,
        width: '80%',
        marginTop: 10
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 12,
    }
});

export default ModalPicker;