import React, { useState } from 'react'

import {
    Text, 
    View,
    StyleSheet,
    Image,
    TouchableOpacity 
} from "react-native";

import Animated, { EasingNode } from 'react-native-reanimated';

export const StatisticCard = (props) => {

    const [mostrarDescSafe, setMostrarDescSafe] = useState(false)
    const [mostrarDescCaution, setMostrarDescCaution] = useState(false)
    const [mostrarDescDanger, setMostrarDescDanger] = useState(false)

    const [heightSafe, setHeightSafe] = useState(new Animated.Value(60))
    const [heightCaution, setHeightCaution] = useState(new Animated.Value(60))
    const [heightDanger, setHeightDanger] = useState(new Animated.Value(60))

    const [opacity, setOpacity] = useState(new Animated.Value(0))

    const [aumentarHeightSafe, setAumentarHeightSafe] = useState(false)
    const [aumentarHeightCaution, setAumentarHeightCaution] = useState(false)
    const [aumentarHeightDanger, setAumentarHeightDanger] = useState(false)
    
    const [spinValue, setSpinValue] = useState(new Animated.Value(0))

    // const spin = spinValue.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '360deg']
    // })
    
    const openCard = (_status) => {

        switch (_status) {

            // verifica para o status 1 - Safe
            case 1:
                if(!aumentarHeightSafe) {

                    Animated.timing(heightSafe, {
                        toValue: 193,
                        duration: 300,
                        easing: EasingNode.linear,
                    }).start(() => {
                        Animated.timing(opacity, {
                            toValue: 2,
                            duration: 400,
                            easing: EasingNode.linear,
                        }).start()
                    })

                    Animated.timing(spinValue, {
                        toValue: -3.15,
                        duration: 400,
                        easing: EasingNode.linear,
                        useNativeDriver: true
                    }).start()

                    setMostrarDescSafe(true)

                    setAumentarHeightSafe(true)
                }
                else{
                    setMostrarDescSafe(false)
                    setAumentarHeightSafe(false)
                    setOpacity(new Animated.Value(0))

                    Animated.timing(spinValue, {
                        toValue: 0,
                        duration: 400,
                        easing: EasingNode.linear,
                        useNativeDriver: true
                    }).start()

                    Animated.timing(heightSafe, {
                        toValue: 60,
                        duration: 300,
                        easing: EasingNode.linear,
                    }).start()
                }
                break;

            // verifica para o status 2 - Caution
            case 2:
                if(!aumentarHeightCaution) {

                    setMostrarDescCaution(true)

                    Animated.timing(heightCaution, {
                        toValue: 193,
                        duration: 300,
                        easing: EasingNode.linear,
                    }).start(() => {
                        Animated.timing(opacity, {
                            toValue: 2,
                            duration: 400,
                            easing: EasingNode.linear,
                        }).start()
                    })

                    Animated.timing(spinValue, {
                        toValue: -3.15,
                        duration: 400,
                        easing: EasingNode.linear,
                        useNativeDriver: true
                    }).start()

                    setAumentarHeightCaution(true)
                }
                else{
                    setMostrarDescCaution(false)
                    setOpacity(new Animated.Value(0))
                    
                    Animated.timing(heightCaution, {
                        toValue: 60,
                        duration: 300,
                        easing: EasingNode.linear,
                    }).start(() => {
                        Animated.timing(opacity, {
                            toValue: 0,
                            duration: 400,
                            easing: EasingNode.linear,
                        }).start()
                    })

                    Animated.timing(spinValue, {
                        toValue: 0,
                        duration: 400,
                        easing: EasingNode.linear,
                        useNativeDriver: true
                    }).start()
                    
                    setAumentarHeightCaution(false)
                }
                break;

            // verifica para o status 3 - Danger
            case 3:
                if(!aumentarHeightDanger) {

                    Animated.timing(heightDanger, {
                        toValue: 193,
                        duration: 300,
                        easing: EasingNode.linear,
                    }).start(() => {
                        Animated.timing(opacity, {
                            toValue: 2,
                            duration: 400,
                            easing: EasingNode.linear,
                        }).start()
                    })

                    Animated.timing(spinValue, {
                        toValue: -3.15,
                        duration: 400,
                        easing: EasingNode.linear,
                        useNativeDriver: true
                    }).start()
                    
                    setMostrarDescDanger(true)
                    setAumentarHeightDanger(true)
                }
                else{
                    setMostrarDescDanger(false)
                    setOpacity(new Animated.Value(0))

                    Animated.timing(spinValue, {
                        toValue: 0,
                        duration: 400,
                        easing: EasingNode.linear,
                        useNativeDriver: true
                    }).start()

                    Animated.timing(heightDanger, {
                        toValue: 60,
                        duration: 300,
                        easing: EasingNode.linear,
                    }).start()

                    setAumentarHeightDanger(false)
                }
                break;
        
            default:
                break;
        }        
    }

    return(
        <Animated.View style={[styles.cardStatistic, 
            { 
                height: props.status === 1 ? heightSafe : props.status === 2 ? heightCaution : heightDanger, 
                borderColor: mostrarDescSafe ? '#FF761E' : mostrarDescCaution ? '#FF761E' : mostrarDescDanger ? '#FF761E' : '#A6A4AE', 
                borderWidth: mostrarDescSafe ? 1.5 : mostrarDescCaution ? 1.5 : mostrarDescDanger ? 1.5 : 1 
            }]}>

            <TouchableOpacity activeOpacity={0.4} onPress={() => openCard(props.status)}>
                <View style={styles.headerCardStatistic}>
                    <Text style={[styles.headerStatisticTitle, { color: props.status === 1 ? '#68CAA0' : props.status === 2 ? '#FE9800' : '#EA6367'}]}>{props.status === 1 ? 'Safe' : props.status === 2 ? 'Caution' : 'Danger'}</Text>
                    <Animated.Image
                        source={require('../../../assets/img/arrow-down-png.png')}
                        style={{transform: [{rotate: spinValue}], tintColor: '#959595', width: 15, height: 9}}
                    />
                </View>

                {
                    props.status === 1 && mostrarDescSafe === true ?
                    <Animated.View style={{opacity: opacity}}>
                        <Text style={styles.statisticStatusDescription}>
                            {
                                props.description
                            }                
                        </Text>

                        <View style={styles.footerCardStatistic}>
                            <View style={[styles.showPercentage, { backgroundColor: props.status === 1 ? '#E0FEED' : props.status === 2 ? '#FFF4CF' : '#FFE7E3' }]}>
                                <Text style={[styles.textPercentage, { color: props.status === 1 ? '#68CAA0' : props.status === 2 ? '#FE9800' : '#EA6367' }]}>{props.percentage}%</Text>
                            </View>
                            <Text style={styles.textFooter}>{props.percentageDescription}</Text>
                        </View>
                    </Animated.View> :

                    props.status === 2 && mostrarDescCaution === true ?
                    <Animated.View style={{opacity: opacity}}>
                        <Text style={styles.statisticStatusDescription}>
                            {
                                props.description
                            }                
                        </Text>

                        <View style={styles.footerCardStatistic}>
                            <View style={[styles.showPercentage, { backgroundColor: props.status === 1 ? '#E0FEED' : props.status === 2 ? '#FFF4CF' : '#FFE7E3' }]}>
                                <Text style={[styles.textPercentage, { color: props.status === 1 ? '#68CAA0' : props.status === 2 ? '#FE9800' : '#EA6367' }]}>{props.percentage}%</Text>
                            </View>
                            <Text style={styles.textFooter}>{props.percentageDescription}</Text>
                        </View>
                    </Animated.View> :
                    
                    props.status === 3 && mostrarDescDanger === true &&
                    <Animated.View style={{opacity: opacity}}>
                        <Text style={styles.statisticStatusDescription}>
                            {
                                props.description
                            }                
                        </Text>

                        <View style={styles.footerCardStatistic}>
                            <View style={[styles.showPercentage, { backgroundColor: props.status === 1 ? '#E0FEED' : props.status === 2 ? '#FFF4CF' : '#FFE7E3' }]}>
                                <Text style={[styles.textPercentage, { color: props.status === 1 ? '#68CAA0' : props.status === 2 ? '#FE9800' : '#EA6367' }]}>{props.percentage}%</Text>
                            </View>
                            <Text style={styles.textFooter}>{props.percentageDescription}</Text>
                        </View>
                    </Animated.View>
                }
            </TouchableOpacity>
        </Animated.View>
    )
}

export default StatisticCard

const styles = StyleSheet.create({
    
    statisticTitle: {
        fontSize: 20,
        color: '#92909A',
        fontFamily: 'Montserrat-SemiBold',
    },

    cardStatistic: {
        width: '90%',
        height: 60,
        backgroundColor: '#FFF',
        marginTop: 25,
        marginBottom: 10,
        borderRadius: 3,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'space-between',
    },

    headerCardStatistic: {
        width: '100%',
        height: 55,
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
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#A6A4AE'
    },

    footerCardStatistic: {
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },

    showPercentage: {
        width: 72,
        height: 36,
        borderRadius: 3,
        marginRight: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textPercentage: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        color: '#000'
    },

    textFooter: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#A6A4AE'
    },
})
