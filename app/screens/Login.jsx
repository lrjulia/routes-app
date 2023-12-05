import React, {useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FIREBASE_AUTH } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const [display, setDisplay] = useState(false);
    const [isNewUser, setIsNewUser] = useState(null);

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

    const fetchDriver = async (userId) => {
        try {
            const customerDoc = await getDoc(doc(FIREBASE_DB, 'driver', userId));
            if (customerDoc.exists()) {
                return true;
            } else {
            return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    //lm851541@gmail.com
    //testando
    //V4DYpshjxFDk6Jxrs5fX

    const signUp = async () => {
        setLoading(true);
        try {
            if(await fetchDriver(code)) {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                console.log(response);
            }
            alert('Check your emails!');
        } catch(error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        } finally {
            setIsNewUser(false);
        }
    }

    const oldUser = () => {
        setDisplay(true);
        setIsNewUser(false);
    }

    const newUser = () => {
        setDisplay(true);
        setIsNewUser(true);
    }

    const returnButton = () => {
        setDisplay(!display);
    }

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/logo2.png')} 
                style={{
                    width: '100%',
                    height: 80,
                    margin: 20,
                    resizeMode: 'contain',
                  }}
            />

            {display && (
                <>
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

                {isNewUser && (
                    <>
                    <TextInput
                    style={styles.input}
                    placeholder="Código de Acesso"
                    value={code} 
                    autoCapitalize='none'
                    onChangeText={(text) => setCode(text)}
                    />
                    </>
                )}

                </>
            )} 
            

            {!display && (
                <>
                
                    <TouchableOpacity style={styles.oldUser} onPress={oldUser}>
                        <Text style={styles.buttonText}>Já tenho cadastro</Text>
                    </TouchableOpacity>
                    
                <TouchableOpacity style={styles.newUser} onPress={newUser}>
                    <Text style={styles.buttonText}>Novo Usuário</Text>
                </TouchableOpacity>
                </>
            )}

            {display && (
                <>
                    {!isNewUser && (
                        <>
                        <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>
                        </>
                    )}

                    {isNewUser && (
                        <>
                            <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    <TouchableOpacity style={styles.returnButton} onPress={returnButton}>
                        <Text style={styles.returnButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </>
            )}
           

            

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
        backgroundColor: 'white', // Pastel green background color
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
        backgroundColor: '#33a46f', // Light green button color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    oldUser: {
        width: '80%',
        height: 40,
        backgroundColor: '#006a57', // Light green button color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    newUser: {
        width: '80%',
        height: 40,
        backgroundColor: '#33a46f', // Light green button color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    returnButton: {
        width: '80%',
        height: 40,
        backgroundColor: '#c0c0c0', // Light green button color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    returnButtonText: {
        color: 'black'
    },
    buttonText: {
      fontSize: 16,
      color: '#ffffff', // Dark green text color
    },
  });

export default Login;
