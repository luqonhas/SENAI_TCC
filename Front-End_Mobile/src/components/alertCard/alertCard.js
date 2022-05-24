import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'

export const AlertCard = (props) => {

    const [textSafe] = useState('Sem risco no ambiente')
    const [textCaution] = useState('Muitas pessoas no ambiente')
    const [textDanger] = useState('Limite de pessoas excedido')

    const navigation = useNavigation()

    return(
        <TouchableOpacity onPress={() => {
            props.hidePicker()
            navigation.navigate('Alert', props.alerta)
        }} activeOpacity={0.6} style={styles.body}>
            <View style={styles.containerImgAlert}>
                <Image 
                    source={
                        props.status === 1 ? require('../../../assets/img/alerts/AlertaSeguro.png') :
                        props.status === 2 ? require('../../../assets/img/alerts/AlertaCuidado.png') :
                        require('../../../assets/img/alerts/AlertaPerigo.png')
                    }
                    style={styles.imgAlert}
                />
            </View>

            <View style={styles.contentAlertData}>

                <Text style={styles.titleAlert}>
                    {props.status === 1 ? textSafe : props.status === 2 ? textCaution : textDanger}
                </Text>

                <Text style={styles.descriptionAlert}>{props.quantidadePessoas} pessoas estão no ambiente agora</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AlertCard

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: 100,
        backgroundColor: '#FFF',
        margin: 15,
        marginBottom: -5,
        alignSelf: 'center',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        padding: 15
    },

    containerImgAlert: {
        width: '20%',
        height: '100%',
        // backgroundColor: 'lightgreen',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    imgAlert: {
        width: 60,
        height: 59.9
    },

    contentAlertData: {
        width: '80%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 15
    },

    titleAlert: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        color: '#353535'
    },

    descriptionAlert: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 2,
        color: '#92909A'
    }
})