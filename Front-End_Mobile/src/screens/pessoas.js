import React, { useState } from "react";

import { 
    Text,
    View,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} 
from "react-native";
import { LinearTextGradient } from "react-native-text-gradient";

import Header from "../components/header/header";
import StatisticCard from '../components/statisticCard/statisticCard'
import api from '../services/apis/apiGoodEye'

export const Pessoas = () => {

    const [listStatus, setListStatus] = useState([1, 2, 3])
    const [listaAlertas, setListaAlertas] = useState([])
    const [quantidadePessoas, setQuantidadePessoas] = useState(0)

    const [refreshing, setRefreshing] = useState(false)


    const calcularPorcentagem = (quantidade, total) => {
        return (quantidade / total) * 100
    }

    const retornarPorcentagemStatus = (_status) => {

        function filtrarData(alerta, mes) {
            return new Date(alerta.createdDate).toLocaleDateString().split('/')[0] == mes
        }

        function filtrarStatus(alerta, status) {
            return alerta.status === status
        }

        let alertasMesPassado = listaAlertas.filter((alerta) => filtrarData(alerta, (new Date().getMonth() + 1) - 1 ))

        let alertasMesAtual = listaAlertas.filter((alerta) => filtrarData(alerta, new Date().getMonth() + 1 ))

        let alertasMesPassadoStatus = alertasMesPassado.filter((alerta) => filtrarStatus(alerta, _status))

        let alertasMesAtualStatus = alertasMesAtual.filter((alerta) => filtrarStatus(alerta, _status))

        let porcentagemMesPassado = calcularPorcentagem(alertasMesPassadoStatus.length, alertasMesPassado.length)

        let porcentagemMesAtual = calcularPorcentagem(alertasMesAtualStatus.length, alertasMesAtual.length)

        let porcentagemFinal = porcentagemMesAtual - porcentagemMesPassado;

        console.warn(porcentagemFinal)
    }

    const buscarAlertas = async () => {
        try {

            const resposta = await api('/alert/read')

            const dados = await resposta.data.data

            setListaAlertas(dados)

            await setQuantidadePessoas(dados[dados.length - 1].amountOfPeople)
        } catch (error) {
            console.warn(error)
        }
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        buscarAlertas();
        wait(1500).then(() => setRefreshing(false));
    }, []);

    useState(() => {
        buscarAlertas();
    }, [])

    return(
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

            <View style={styles.container}>

                <View style={styles.cardRecentData}>
                    <Text style={styles.textCard} onPress={() => retornarPorcentagemStatus(1)}>Dados mais recentes</Text>

                    <View style={styles.cardDescription}>
                    {/* <LinearTextGradient
                        style={{ fontWeight: "bold", fontSize: 72 }}
                        locations={[0, 1]}
                        colors={["red", "blue"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        >
                            THIS IS TEXT GRADIENT
                        </LinearTextGradient>; */}
                        <Text style={styles.mainTextDescription}>
                            { 
                                quantidadePessoas !== 0 ?
                                quantidadePessoas :
                                <ActivityIndicator 
                                    size="large"
                                    color="#FF761E"
                                />
                            }
                        </Text>

                        <Text style={styles.cardDescriptionText}>pessoas na área de risco</Text>
                    </View>

                    <View style={[styles.statusAlert, { backgroundColor: quantidadePessoas <= 3 ? '#E0FEED' : quantidadePessoas > 3 && quantidadePessoas <=7 ? '#FFF4CF' : '#FFE7E3' }]}>
                        <Text style={[styles.statusText, { color: quantidadePessoas <= 3 ? '#68CAA0' : quantidadePessoas > 3 && quantidadePessoas <=7 ? '#FE9800' : '#EA6367'  }]}>
                            {
                                quantidadePessoas <= 3 ? 'Seguro' : quantidadePessoas > 3 && quantidadePessoas <=7 ? 'Cuidado' : 'Perigo'
                            }
                        </Text>
                    </View>
                </View>

                <Text style={styles.statisticTitle}>Estatísticas</Text>

                {
                    listStatus.map((status) => {
                        return(
                            <StatisticCard
                                key={status}
                                status={status}
                                description="Quando há 3 ou menos pessoas na área de risco"
                                percentage="+5"
                                percentageDescription="desde o mês passado"
                            />
                        )
                    })
                }
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA'
    },

    cardRecentData: {
        width: '90%',
        height: 211,
        backgroundColor: '#FFF',
        margin: 30,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#A6A4AE',
        display: 'flex',
        justifyContent: 'space-between'
    },

    textCard: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 15,
        marginLeft: 20,
        color: '#92909A'
    },

    cardDescription: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        flexWrap: 'wrap'
    },

    cardDescriptionText: {
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
        color: '#92909A'
    },

    mainTextDescription: {
        fontSize: 38,
        marginRight: 10,
        color: '#FF500F',
        fontFamily: 'Montserrat-Bold'
    },

    statusAlert: {
        width: '88%',
        height: 44,
        backgroundColor: '#FDF2CD',
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16
    },

    statusText: {
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
        color: '#FE9800',
    },


    statisticTitle: {
        fontSize: 20,
        color: '#92909A',
        fontFamily: 'Montserrat-SemiBold',
    },
})

export default Pessoas