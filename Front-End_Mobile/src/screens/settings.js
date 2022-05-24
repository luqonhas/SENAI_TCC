import React, { useEffect, useState } from "react";
import {
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Switch,
    Vibration
} from "react-native";

import OneSignal from 'react-native-onesignal';

import ToggleSwitch from 'toggle-switch-react-native'
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage'

import Header from "../components/header/header";


export const Settings = (props) => {

    const [notification, setNotification] = useState(true)
    const [email, setEmail] = useState('')

    const buscarDadosStorage = async () => {
        const token = await AsyncStorage.getItem('user_token-acess-goodEye')

        setEmail(jwtDecode(token).email)
    }

    const buscarConfiguracaoNotificacao = async () => {
        const notification = await AsyncStorage.getItem('notification_')

        if(notification === null) {
            await AsyncStorage.setItem('notification_', "true")

            setNotification(true)
            
            OneSignal.disablePush(false)
        }

        if(notification == "true") {
            setNotification(true)
        }else {
            setNotification(false)
        }
    }

    const gerenciarNotificacao = async () => {
        // Vibration.vibrate();

        if(notification) {
            setNotification(false)
            await AsyncStorage.setItem('notification_', "false")
            OneSignal.disablePush(true)
        }else {

            await AsyncStorage.setItem('notification_', "true")
            setNotification(true)
            OneSignal.disablePush(false)
        }
    }

    useEffect(() => {
        buscarDadosStorage()
        buscarConfiguracaoNotificacao()
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <Header screenName='Settings' />

                <Text style={styles.logo} onPress={async () =>console.warn(await AsyncStorage.getItem('notification_'))}>Good<Text style={{fontFamily: 'Montserrat-Black', color: '#353535'}}>Eye</Text></Text>

                <View style={styles.configItem}>
                    <ToggleSwitch
                        isOn={notification}
                        onColor="#FF761E"
                        offColor="#A6A4AE"
                        size="large"
                        onToggle={gerenciarNotificacao}
                        useNativeDriver={true}
                    />

                    <Text style={[styles.textItem, { marginLeft: 39 }]}>Notificações</Text>
                </View>

                <TouchableOpacity activeOpacity={0.7} style={styles.configItem}>
                    <Image 
                        source={require('../../assets/img/external-link.png')}
                        style={styles.imgItem}
                    />

                    <Text style={styles.textItem}>Acessar na web</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={styles.configItem}>
                    <Image 
                        source={require('../../assets/img/googlePlayIcon.png')}
                        style={styles.imgItem}
                    />

                    <Text style={styles.textItem}>Acessar app na GooglePlay</Text>
                </TouchableOpacity>

                <View activeOpacity={0.7} style={styles.containerConfigItemEmail}>
                    <Image 
                        source={require('../../assets/img/envelope.png')}
                        style={styles.imgItem}
                    />

                    <View style={styles.configItemEmail}>
                        <Text style={[styles.textItem, {fontSize: 15}]}>Notificações de e-mail</Text>
                        <Text style={[styles.textItem, {fontSize: 15}]}>enviadas para:</Text>

                        <TextInput editable={false} style={styles.email} value={email} />
                    </View>
                </View>

            </ScrollView>

            <Text style={{
                fontFamily: 'Montserrat-SemiBold', 
                fontSize: 17,
                color: '#92909A',
                textAlign: 'center',
                marginBottom: 20
                }}>

                Versão:

                <Text style={{
                    fontFamily: 'Montserrat-Bold',
                    color: '#FF5800',
                }}> 1.0</Text> 
            </Text>

        </SafeAreaView>
    )
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },

    logo: {
        margin: 40,
        marginBottom: 55,
        fontSize: 30,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-Bold',
        color: '#FF5800',
    },

    configItem: {
        paddingLeft: 20,
        paddingRight: 20,
        // backgroundColor: '#CCC',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 40
    },
    
    imgItem: {
        width: 30,
        height: 30,
        marginRight: 36
    },

    textItem: {
        fontSize: 17,
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 20,
        color: '#92909A'
    },

    containerConfigItemEmail: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        // backgroundColor: '#CCC',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 10,
        marginBottom: 40
    },

    configItemEmail: {
        width: '80%',
        // backgroundColor: 'blue'
    },

    email: {
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: '#FF5800',
        height: 30,
        padding: 0,
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 5,
        fontSize: 16,
        color: '#FF5800',
        fontFamily: 'Montserrat-Medium'
    }
})