import React, { useState, useEffect, KeyboardEvent } from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    ImageBackground, 
    ScrollView, 
    SafeAreaView 
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from "jwt-decode";

// Components
import Header from '../components/header/header'

export const Profile = (props) => {

    const [editNome, setEditNome] = useState(false)
    const [editEmail, setEditEmail] = useState(false)

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [permissao, setPermissao] = useState('')

    const buscarDados = async () => {
        const token = await AsyncStorage.getItem('user_token-acess-goodEye')

        const dadosDecodificados = await jwtDecode(token) 

        setNome(dadosDecodificados.family_name)
        setEmail(dadosDecodificados.email)
        setPermissao(dadosDecodificados.role)
    }

    const deslogar = async () => {
        await AsyncStorage.removeItem('user_token-acess-goodEye')
    
        props.navigation.navigate('Login')

        props.navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        })
    }

    useEffect(() => {
        buscarDados();
    }, [])

    return(
            <>
                <Header screenName='Profile' />

                <SafeAreaView style={styles.safeAreaView}>
                    <ScrollView contentContainerStyle={{flex: 1}}>
                        <View style={styles.container}>
                            <View style={styles.containerImgPerfil}>
                                <View style={styles.perfil}>
                                    {/* <ImageBackground  */}
                                    <Image
                                        source={require('../../assets/img/user.png')}
                                        // style={StyleSheet.absoluteFillObject}
                                        style={styles.imagemPerfil}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.6}>
                                    <Image 
                                        source={require('../../assets/img/camera2.png')}
                                        style={styles.imagemCamera}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.dados}>
                                <Text style={styles.label}>Nome</Text>
                                <TextInput 
                                    onSubmitEditing={() => !editNome ? setEditNome(true) : setEditNome(false)}
                                    editable={editNome} 
                                    value={nome} 
                                    style={styles.inputDados}     
                                />

                                {/* <TouchableOpacity onPress={() => !editNome ? setEditNome(true) : setEditNome(false)} style={styles.editar}>
                                    <Image 
                                        source={require('../../assets/img/editIcon.png')}
                                        style={[styles.btnEditar, { tintColor: editNome ? '#FF761E' : '#92909A' }]}
                                    />
                                </TouchableOpacity> */}
                            </View>

                            <View style={styles.dados}>
                                <Text style={styles.label}>E-mail</Text>
                                <TextInput 
                                    onSubmitEditing={() => !editEmail ? setEditEmail(true) : setEditEmail(false)} 
                                    editable={editEmail} 
                                    keyboardType='email-address' 
                                    value={email}
                                    style={styles.inputDados} 
                                />

                                {/* <TouchableOpacity onPress={() => !editEmail ? setEditEmail(true) : setEditEmail(false)} style={styles.editar}>
                                    <Image 
                                        source={require('../../assets/img/editIcon.png')}
                                        style={[styles.btnEditar, { tintColor: editEmail ? '#FF761E' : '#92909A' }]}
                                    />
                                </TouchableOpacity> */}
                            </View>

                            <View style={styles.dados}>
                                <Text style={styles.label}>Permissão</Text>
                                <TextInput 
                                    editable={false} 
                                    keyboardType='default' 
                                    value={permissao}
                                    style={styles.inputDados}     
                                />

                            </View>


                            {/* <TouchableOpacity activeOpacity={0.7} style={styles.btnSalvarAlteracoes}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 0.9, y: 0}} colors={['#FF500F', '#FF8700']} style={styles.btnGradient}>
                                    <Text style={styles.textBtn}>
                                        Salvar Alterações
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity> */}

                            {/* <TouchableOpacity activeOpacity={0.6} style={styles.containerAlterarSenha}>
                                <Image 
                                    source={require('../../assets/img/cadeadoSenha.png')}
                                />

                                <Text style={styles.textAlterarSenha}>Alterar minha senha</Text>
                            </TouchableOpacity> */}

                            <TouchableOpacity onPress={deslogar} activeOpacity={0.6} style={[styles.containerAlterarSenha, { marginBottom: 30 }]}>
                                <Image 
                                    source={require('../../assets/img/logout.png')}
                                    style={styles.imgLogout}
                                />

                                <Text style={styles.textAlterarSenha}>Fazer logout</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
    )
}

export default Profile

const styles = StyleSheet.create({

    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FAFAFA'
    },

    safeAreaView: {
        flex: 1,
    },

    containerImgPerfil: {
        marginTop: 40,
    },

    perfil: {
        width: 130,
        height: 130,
        borderWidth: 2,
        borderColor: '#FF761E',
        borderRadius: 130,
        backgroundColor: '#FFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    imagemPerfil: {
        width: '100%',
        height: '100%',
        tintColor: '#FF761E'
    },

    imagemCamera: {
        position: 'absolute',
        right: 0,
        bottom: 0
    },

    dados: {
        width: '85%',
        marginTop: 30
    },

    label: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 13,
        color: '#92909A'
    },

    inputDados: {
        width: '100%',
        height: 40,
        backgroundColor: '#FAFAFA',
        borderBottomWidth: 1,
        borderBottomColor: '#FF761E',
        fontFamily: 'Montserrat-SemiBold',
        color: '#FF761E'
    },

    editar: {
        position: 'absolute',
        bottom: 7,
        right: 0
    },

    btnEditar: {
        width: 29,
        height: 26,
        tintColor: '#92909A'
    },

    btnSalvarAlteracoes: {
        width: '85%',
        height: 45,
        marginTop: 25
    },

    btnGradient: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },

    textBtn: {
        color: '#FFF',
        fontFamily: 'Montserrat-Bold'
    },

    containerAlterarSenha: {
        width: '85%',
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
    },

    textAlterarSenha: {
        color: '#FF761E',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 20
    },

    imgLogout: {
        tintColor: '#FF761E',
    }
})