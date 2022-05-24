import React, { useState, useEffect } from "react";
import { 
    Text, 
    TouchableOpacity, 
    View, 
    StyleSheet, 
    Image, 
    TextInput, 
    StatusBar,
    KeyboardAvoidingView
} from "react-native";

import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseJwt } from "../services/auth/auth";

import eyeOpen from '../../assets/img/eye-open.png'
import eyeClose from '../../assets/img/eye-close.png'


import api from "../services/apis/apiGoodEye";
import jwtDecode from "jwt-decode";


export const Login = (props) => {

    const navigation = useNavigation()

    const [showPassword, setShowPassword] = useState(true)
    const [message, setMessage] = useState('')

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const changeShowPassword = (bool) => {
        if (bool) {
            setShowPassword(false)
        }else{
            setShowPassword(true)
        }
    }

    // Função que efetua o login do usuário
    const efetuarLogin = async () => {

        try {

            setMessage('')

            const response = await api.post('/login/signin', {
                email: email,
                password: senha
            })
    
            if(response.data.successFailure) {
                await AsyncStorage.setItem('user_token-acess-goodEye', response.data.data.token)

                limparCampos();

                props.navigation.navigate('Drawer')

                navigation.reset({
                    index: 0,
                    routes: [{name: 'Drawer'}]
                })

            }else {
                setMessage(response.data.message)
            }
    
        } catch (error) {
            console.warn(error)
        }
    }

    const buscarDados = async () => {
        const token = await AsyncStorage.getItem('user_token-acess-goodEye')

        console.warn(token)
    }

    const limparCampos = () => {
        setEmail('')
        setSenha('')
        setMessage('')
    }

    return(
        <View style={styles.container}>
            <StatusBar hidden={true}  backgroundColor="#FFF"/>

            <Image
                style={styles.loginMainLogo}
                source={require('../../assets/img/LogoPrincipal.png')}
            />

            <Text style={styles.resumeText}>Sempre o melhor monitoramento para você!</Text>

            <View style={styles.containerTitle}>
                <Text style={styles.title} onPress={buscarDados}>Login</Text>
            </View>

            <KeyboardAvoidingView style={styles.loginInput}>
                <Text style={styles.labelInput}>E-mail</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder='example@gmail.com'
                    placeholderTextColor='#ccc'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={email => setEmail(email)}
                />
            </KeyboardAvoidingView>

            <KeyboardAvoidingView style={styles.loginInputSenha}>
                <Text style={styles.labelInput}>Senha</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder='********'
                    placeholderTextColor='#ccc'
                    secureTextEntry={showPassword}
                    value={senha}
                    onChangeText={senha => setSenha(senha)}
                />

                <TouchableOpacity onPress={() => changeShowPassword(showPassword)} style={styles.showPassword}>

                    <Image 
                        source={showPassword ? eyeClose : eyeOpen}
                    />
                </TouchableOpacity>
            </KeyboardAvoidingView>

            <Text style={styles.errorMessage}>{message}</Text>

            <TouchableOpacity disabled={email !== '' && senha !== '' ? false : true} onPress={efetuarLogin} activeOpacity={0.5} style={styles.btnLogin}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 0.9, y: 0}} colors={['#FF500F', '#FF8700']} style={styles.btnGradient}>
                    <Text style={styles.textBtnLogin}>
                        Entrar
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },

    loginMainLogo: {
        width: 160,
        height: 140,
        marginBottom: 40,
        tintColor: '#FF761E'
    },

    resumeText: {
        fontSize: 14.5,
        fontFamily: 'Orienta-Regular',
        color: '#424242',
        margin: 10
    },

    containerTitle: {
        width: '80%',
        paddingTop: 10,
        paddingBottom: 15
    },

    title: {
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'uppercase',
        marginTop: 5,
        color: '#000000'
    },

    loginInput: {
        width: '80%',
        marginBottom: 15
    },

    loginInputSenha: {
        width: '80%',
        marginBottom: 15,
        // backgroundColor: 'blue'
    },

    textInput: {
        width: '100%',
        height: 46,
        borderWidth: 1,
        borderColor: '#868686',
        paddingLeft: 10,
        color: '#333',
        paddingRight: 46,
        fontSize: 16
    },

    labelInput: {
        marginTop: 5,
        marginBottom: 7,
        textTransform: 'uppercase',
        fontFamily: 'Orienta-Regular',
        fontWeight: '700',
        color: '#424242'
    },

    errorMessage: {
        marginTop: -8,
        marginBottom: 8,
        color: '#EA6367'
    },

    forgotPassword: {
        margin: 20,
        color: '#424242'
    },

    btnLogin: {
        width: '80%',
        height: 46,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderRadius: 2,
        overflow: 'hidden'
    },

    textBtnLogin: {
        color: '#FFF',
        fontFamily: 'Montserrat-Bold'
    },
    
    btnGradient: {
        width: '100%',
        height: 46,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    showPassword: {
        width: 46,
        height: 46,
        // backgroundColor: '#CCC',
        position: 'absolute',
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default Login;