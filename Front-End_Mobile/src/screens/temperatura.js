import React, { useEffect, useRef, useState, useCallback } from "react";
import { 
    Text, 
    View, 
    StyleSheet, 
    ScrollView, 
    SafeAreaView, 
    Image, 
    Touchable, 
    TouchableOpacity, 
    Animated,
    RefreshControl
} from "react-native";

import StatisticCard from "../components/statisticCard/statisticCard";
import api from "../services/apis/apiGoodEye";

export const Temperatura = () => {
    const [refreshing, setRefreshing] = useState(false)

    const [listStatus, setListStatus] = useState([1, 2, 3])
    const [conversaoTemp, setConversaoTemp] = useState(1)
    const [temperaturaAtual, setTemperaturaAtual] = useState(0)
    const [temperaturaCelsius, setTemperaturaCelsius] = useState(0)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        buscarTemperatura();
        wait(1500).then(() => setRefreshing(false));
    }, []);

    const buscarTemperatura = async () => {
        const resposta = await api('/temperature/readAll')

        const dados = resposta.data.data

        setTemperaturaAtual(0)
        setTemperaturaCelsius(0)

        setTemperaturaAtual(dados[dados.length - 1].degrees)
        setTemperaturaCelsius(dados[dados.length - 1].degrees)
    }

    const converterTemperatura = (medida) => {
        if(medida === 1 && conversaoTemp === 2) {
            setTemperaturaAtual(Math.round(((temperaturaAtual - 32) * 5) / 9))
            setConversaoTemp(1);
        }else if(medida === 2 && conversaoTemp === 1) {
            setTemperaturaAtual(Math.round(((temperaturaAtual * 9) / 5) + 32))
            setConversaoTemp(2);
        }
    }

    useEffect(() => {
        buscarTemperatura();
    }, [])

    return(
            <View style={styles.container}>
                <ScrollView 
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        enabled={true}
                        colors={["#FF761E"]}
                        // progressViewOffset={150}
                    />
                }
                showsVerticalScrollIndicator={false} 
                style={{backgroundColor: '#FAFAFA'}}>
                    
                    <View style={styles.body}>

                        {/* Current temperature card */}
                        <View style={styles.cardCurrentTemperature}>
                            <Text style={styles.cardTitle}>Temperatura Atual</Text>
                            <View style={styles.containerTemperature}>
                                <View style={styles.currentTemperature}>
                                    <Text style={styles.currentTemperatureText}>{temperaturaAtual}°</Text>
                                </View>
                                <View style={styles.convertTemperature}>
                                    <TouchableOpacity onPress={() => conversaoTemp === 2 && converterTemperatura(1)} activeOpacity={0.5}>
                                        <Text style={[styles.textTemperature, { color: conversaoTemp === 1 ? '#FF761E' : '#A6A4AE' }]}>C°</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => conversaoTemp === 1 && converterTemperatura(2)} activeOpacity={0.5}>
                                        <Text style={[styles.textTemperature, { color: conversaoTemp === 2 ? '#FF761E' : '#A6A4AE' }]}>F°</Text>
                                    </TouchableOpacity>
                                    {/* <Text style={styles.textTemperature}>K°</Text> */}
                                </View>
                            </View>

                            <View style={styles.containerStatus}>
                                <View style={[styles.cardStatus, { backgroundColor: temperaturaCelsius <= 26 ? '#E0FEED' : temperaturaCelsius > 26 && temperaturaCelsius <= 35 ? '#FFF4CF' : '#FFE7E3' }]}>
                                    <Text style={[styles.textStatus, { color: temperaturaCelsius <= 26 ? '#68CAA0' : temperaturaCelsius > 26 && temperaturaCelsius <= 35 ? '#FE9800' : '#EA6367'  }]}>
                                        {
                                            temperaturaCelsius <= 26 ?
                                            'Seguro' : 
                                            temperaturaCelsius > 26 && temperaturaCelsius <= 35 ?
                                            'Cuidado' :
                                            'Perigo'
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.statisticTitle}>Estatísticas</Text>

                        {
                            listStatus.map((status) => {
                                return(
                                    <StatisticCard
                                        key={status}
                                        status={status}
                                        description="Igual ou acima de -10°C e igual ou  abaixo de 26 °C."
                                        percentage="+5"
                                        percentageDescription="desde o mês passado"
                                    />
                                )
                            })
                        }

                    </View>
                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // mainTitle: {
    //     fontSize: 19,
    //     fontFamily: 'Montserrat-SemiBold',
    //     margin: 20
    // },

    // card temperatura atual

    cardCurrentTemperature: {
        width: '90%',
        height: 210,
        backgroundColor: '#FFF',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#A6A4AE',
        display: 'flex',
        justifyContent: 'space-between',
        margin: 30,
    },

    cardTitle: {
        marginTop: 15,
        marginLeft: 15,
        fontSize: 19,
        fontFamily: 'Montserrat-SemiBold',
        color: '#92909A'
    },

    containerTemperature: {
        width: '100%',
        height: '40%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor: 'lightblue'
    },

    currentTemperature: {
        width: '30%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'red'
    },

    currentTemperatureText: {
        fontSize: 41,
        fontFamily: 'Montserrat-Bold',
        color: '#FF761E'
    },

    convertTemperature: {
        width: '60%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'lightgreen'
    },

    textTemperature: {
        fontSize: 40,
        fontFamily: 'Montserrat-Bold',
        color: '#A6A4AE',
        marginLeft: 30
    },

    containerStatus: {
        width: '100%',
        height: '30%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: 'blue',
        // paddingTop: 5
    },

    cardStatus: {
        width: '90%',
        height: 44,
        backgroundColor: '#DDFBEA',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3 
    },

    textStatus: {
        fontSize: 18,
        color: '#58BA90',
        fontFamily: 'Montserrat-Bold',
        textTransform: 'uppercase'
    },

    // card temperatura atual


    // statistics
    statisticTitle: {
        fontSize: 20,
        color: '#92909A',
        fontFamily: 'Montserrat-SemiBold',
    },

    cardStatistic: {
        width: '90%',
        height: 173,
        backgroundColor: '#FFF',
        marginTop: 25,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#FF5800',
        display: 'flex',
        justifyContent: 'space-between'
    },

    headerCardStatistic: {
        width: '100%',
        height: '30%',
        backgroundColor: '#CCC',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },

    headerStatisticTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: '#68CAA0',
        textTransform: 'uppercase'
    },

    statisticStatusDescription: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#A6A4AE'
    },

    footerCardStatistic: {
        width: '100%',
        height: '25%',
        backgroundColor: '#CCC'
    }
})

export default Temperatura