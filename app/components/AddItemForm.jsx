import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { FIREBASE_DB } from "../../config/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH } from "../../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import PhoneInput from "react-native-phone-input";
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ModalPicker from "./ModalPicker";
import ModalComponent from "./ModalComponent";

const AddItemForm = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cpf, setCPF] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCEP] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [user, setUser] = useState(null);

  const [driverId, setDriverId] = useState("");
  const [drivers, setDrivers] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "driver"));
        setDrivers(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIREBASE_DB, "customer")
        );
        setCustomers(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const route = useRoute();
  const previousScreen = route.params?.previousScreen || "No data received";

  useEffect(() => {
    const auth = FIREBASE_AUTH;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleDriverSelect = (selectedOption) => {
    setDriverId(selectedOption.id);
  };

  const handleCustomerSelect = (selectedOption) => {
    setCustomerId(selectedOption.id);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [displayedDriverId, setDisplayedDriverId] = useState("");

  const handleAddItem = async () => {
    try {
      const itemData = {
        nome: nome,
        sobrenome: sobrenome,
        nascimento: nascimento,
        cpf: cpf,
        cnpj: cnpj,
        telefone: telefone,
        email: email,
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        userId: user ? user.uid : null, // Assuming user.uid is the unique user ID
      };

      const itemDriver = {
        nome: nome,
        sobrenome: sobrenome,
        nascimento: nascimento,
        cpf: cpf,
        telefone: telefone,
        email: email,
        userId: user ? user.uid : null,
      };

      const itemCustomer = {
        nome: nome,
        cnpj: cnpj,
        telefone: telefone,
        email: email,
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        userId: user ? user.uid : null,
      };

      const itemDelivery = {
        driverId: driverId,
        customerId: customerId,
        descricao: descricao,
        valor: valor,
        status: 'CRIADA',
        dataCriacao: new Date().getTime(),
        userId: user ? user.uid : null,
      };


      switch (previousScreen) {
          case "Drivers":
            const res = await addDoc(collection(FIREBASE_DB, "driver"), itemDriver);
            setDisplayedDriverId(res.id);
            setModalVisible(true);
            break;
          case "Customers":
            await addDoc(collection(FIREBASE_DB, "customer"), itemCustomer);
            navigation.goBack();
            break;
          case "Deliveries":
            await addDoc(collection(FIREBASE_DB, "delivery"), itemDelivery);
            navigation.goBack();
            break;
      }

    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView style={styles.container}>
        {previousScreen != "Deliveries" && (
          <>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={(text) => setNome(text)}
            />
          </>
        )}

        {previousScreen == "Drivers" && (
          <>
            <Text style={styles.label}>Sobrenome:</Text>
            <TextInput
              style={[styles.input]}
              value={sobrenome}
              onChangeText={(text) => setSobrenome(text)}
            />
          </>
        )}

        {previousScreen == "Drivers" && (
          <>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <TextInput
              style={styles.input}
              value={nascimento}
              onChangeText={(text) => setNascimento(text)}
              keyboardType="numeric"
              placeholder="DDMMYYYY" // Replace with your desired date format
            />
          </>
        )}

        {previousScreen == "Drivers" && (
          <>
            <Text style={styles.label}>CPF:</Text>
            <TextInput
              style={styles.input}
              value={cpf}
              onChangeText={(text) => setCPF(text)}
              keyboardType="numeric"
            />
          </>
        )}

        {previousScreen == "Customers" && (
          <>
            <Text style={styles.label}>CNPJ:</Text>
            <TextInput
              style={styles.input}
              value={cnpj}
              onChangeText={(text) => setCNPJ(text)}
              keyboardType="numeric"
            />
          </>
        )}

        {previousScreen != "Deliveries" && (
          <>
            <Text style={styles.label}>Número de Telefone:</Text>
            <PhoneInput
              ref={(ref) => (telefone.current = ref)}
              initialCountry="br" // Set initial country to Brazil
              style={[styles.input]}
              onChangePhoneNumber={(telefone) => {
                setTelefone(telefone);
              }}
            />
          </>
        )}

        {previousScreen != "Deliveries" && (
          <>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={[styles.input]}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </>
        )}

        {previousScreen == "Customers" && (
          <>
            <Text style={styles.label}>Rua:</Text>
            <TextInput
              style={styles.input}
              value={rua}
              onChangeText={(text) => setRua(text)}
            />
          </>
        )}

        {previousScreen == "Customers" && (
          <>
            <Text style={styles.label}>Número:</Text>
            <TextInput
              style={styles.input}
              value={numero}
              onChangeText={(text) => setNumero(text)}
              keyboardType="numeric"
            />
          </>
        )}

        {previousScreen == "Customers" && (
          <>
            <Text style={styles.label}>Complemento:</Text>
            <TextInput
              style={styles.input}
              value={complemento}
              onChangeText={(text) => setComplemento(text)}
            />
          </>
        )}
        {previousScreen == "Customers" && (
          <>
            <Text style={styles.label}>Bairro:</Text>
            <TextInput
              style={styles.input}
              value={bairro}
              onChangeText={(text) => setBairro(text)}
            />
          </>
        )}
        {previousScreen == "Customers" && (
          <>
            <Text style={styles.label}>Cidade:</Text>
            <TextInput
              style={styles.input}
              value={cidade}
              onChangeText={(text) => setCidade(text)}
            />
          </>
        )}

        {previousScreen == "Customers" && (
          <>
            <Text style={styles.label}>Estado:</Text>
            <TextInput
              style={styles.input}
              value={estado}
              onChangeText={(text) => setEstado(text)}
            />
          </>
        )}

        {previousScreen === "Deliveries" && (
          <>
            <Text style={styles.label}>Cliente:</Text>
            <ModalPicker options={customers} onSelect={handleCustomerSelect} />
          </>
        )}

        {previousScreen === "Deliveries" && (
          <>
            <Text style={styles.label}>Motorista:</Text>
            <ModalPicker options={drivers} onSelect={handleDriverSelect} />
          </>
        )}

        {previousScreen == "Deliveries" && (
          <>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.inputMultiline}
              value={descricao}
              onChangeText={(text) => setDescricao(text)}
            />
          </>
        )}

        {previousScreen == "Deliveries" && (
          <>
            <Text style={styles.label}>Valor:</Text>
            <TextInput
              style={styles.input}
              value={valor}
              onChangeText={(text) => setValor(text)}
              keyboardType="numeric"
              type="number"
            />
          </>
        )}

        <TouchableOpacity
          style={styles.addButton}
          title="Add Item"
          onPress={handleAddItem}
        >
          <Text style={styles.addButtonText}>
            {(() => {
              if (previousScreen === "Drivers") {
                return "Adicionar Motorista";
              } else if (previousScreen === "Customers") {
                return "Adicionar Cliente";
              } else if (previousScreen === "option3") {
                return "Text for option 3";
              } else {
                return "Adicionar";
              }
            })()}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <ModalComponent
        visible={modalVisible}
        driverId={displayedDriverId}
        closeModal={() => {setModalVisible(false); navigation.goBack()}}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    minHeight: 100,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#006a57",
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 12,
  },
});

export default AddItemForm;
