import React, {useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try { 
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch(error) {
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!');
        } catch(error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ROUTES APP</Text>

            <TextInput
            style={styles.input}
            value={email} 
            placeholder='Email' 
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}
            />

            <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password} 
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            {/* <TextInput value={email} placeholder='Email' autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}/>
            <TextInput value={password} placeholder='Password' autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}/> */}

            {/* <Button text70 white background-orange30 label="Login"/>
            <Button link text70 orange30 label="Sign Up" marginT-20/> */}
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0fff0', // Pastel green background color
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        margin: 10,
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
    },
    loginButton: {
        width: '80%',
        height: 40,
        backgroundColor: '#006a57', // Light green button color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    signUpButton: {
        width: '80%',
        height: 40,
        backgroundColor: '#ce5d9e', // Light green button color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
      fontSize: 16,
      color: '#ffffff', // Dark green text color
    },
  });

export default Login;
