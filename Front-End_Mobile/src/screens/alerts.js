import React, { useEffect, useState, useCallback } from "react";
import { Text, 
    StyleSheet, 
    View, 
    ScrollView, 
    Image, 
    TouchableOpacity, 
    TouchableHighlight, 
    Pressable, 
    FlatList,
    RefreshControl,
    ActivityIndicator
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { color } from "react-native-reanimated";
import AlertCard from "../components/alertCard/alertCard";
import Header from "../components/header/header";

import api from '../services/apis/apiGoodEye'

export const Alerts = () => {

    const [listaAlertas, setListaAlertas] = useState([])
    const [listaAlertasFiltro, setListaAlertasFiltro] = useState([])
    const [showPicker, setShowPicker] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [colors, setColors] = useState(["#FF761E"])
    const [mostrarSpinner, setMostrarSpinner] = useState(true)
    const [filtro, setFiltro] = useState('')

    const handleShowPicker = () => {
        if(showPicker) {
            setShowPicker(false)
        }else{
            setShowPicker(true)
        }
    }

    const buscarAlertas = async () => {
        try {
            
            setListaAlertas([])
            setMostrarSpinner(true)
            setFiltro('recentes')

            const resposta = await api('/alert/read/recentes')

            const dados = await resposta.data.data

            setListaAlertas(dados)
            setListaAlertasFiltro(dados)

        } catch (error) {
            console.warn(error)
        }
    }

    const buscarAlertasOrdenados = async (ordenacao) => {
        try {

            setListaAlertas([])
            setShowPicker(false)
            setFiltro(ordenacao)

            setMostrarSpinner(true)

            const resposta = await api(`/alert/read/${ordenacao}`)

            const dados = await resposta.data.data

            setListaAlertas(dados)

        } catch (error) {
            console.warn(error)
        }
    }

    const filtrarAlertasPorStatus = (status) => {

        setListaAlertas([])
        setShowPicker(false)
        setFiltro(status === 1 ? 'seguro' : status === 2 ? 'cuidado' : 'perigo' )

        setMostrarSpinner(true)

        function filtro(alerta) {
            return alerta.status === status
        }

        let novaLista = listaAlertasFiltro.filter(filtro);

        setListaAlertas(novaLista);
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        buscarAlertas();
        wait(1500).then(() => setRefreshing(false));
    }, []);

    // Componente que carrega o spinner para indicar que os alertas ainda não
    // foram encontrados
    const Carregando = (props) => {

        wait(8000).then(() => {
            if (listaAlertas.length == 0) {
                setMostrarSpinner(false)
            }
        })

        return(
            <>
                {
                    mostrarSpinner ?

                    <ActivityIndicator 
                        size="large"
                        color="#FF761E"
                    /> : 

                    <TouchableOpacity style={styles.btnTenteNovamente}>
                        <Text style={styles.textTenteNovamente} onPress={() => {buscarAlertas(), setMostrarSpinner(true)}}>Tente novamente</Text>
                    </TouchableOpacity>
                }
            </>
                
        )
    }

    useEffect(() => {
        buscarAlertas()
    }, [])

    return(
        <ScrollView refreshControl={
            <RefreshControl 
                refreshing={refreshing}
                onRefresh={onRefresh}
                enabled={true}
                colors={colors}
                progressViewOffset={150}
            />
        }
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false} 
        stickyHeaderIndices={[1]} 
        stickyHeaderHiddenOnScroll={true}>

            <Header screenName='Alerts' />

            <View>
                <View style={styles.ordenar}>
                    <Text style={styles.mainTitle}>Todos os alertas</Text>
                    <TouchableOpacity onPress={handleShowPicker} activeOpacity={0.6} style={styles.containerOrdenar}>
                        <Image 
                            source={require('../../assets/img/ordenar.png')}
                        />

                        <Text style={styles.textOrdenar}>Order By</Text>
                    </TouchableOpacity>

                    <View style={[styles.picker, {display: showPicker ? 'flex' : 'none'}]}>
                        <Pressable children={({pressed}) => (
                            <Text style={[styles.pickerText, {color: pressed ? '#FFF' : filtro === 'recentes' ? '#FFF' : '#92909A', backgroundColor: pressed ? '#FF761E' : filtro === 'recentes' ? '#FF761E' : '#F1F1F1'}]}>Recentes</Text>
                        )} onPress={() => buscarAlertasOrdenados('recentes')} style={styles.pickerButton}>
                        </Pressable>

                        <Pressable children={({pressed}) => (
                            <Text style={[styles.pickerText, {color: pressed ? '#FFF' : filtro === 'antigos' ? '#FFF' : '#92909A', backgroundColor: pressed ? '#FF761E' : filtro === 'antigos' ? '#FF761E' : '#F1F1F1'}]}>Mais antigos</Text>
                        )} onPress={() => buscarAlertasOrdenados('antigos')} style={styles.pickerButton}>
                        </Pressable>
                        
                        <Pressable children={({pressed}) => (
                            <Text style={[styles.pickerText, {color: pressed ? '#FFF' : filtro === 'seguro' ? '#FFF' : '#92909A', backgroundColor: pressed ? '#FF761E' : filtro === 'seguro' ? '#FF761E' : '#F1F1F1'}]}>Apenas Seguro</Text>
                        )} onPress={() => filtrarAlertasPorStatus(1)} style={styles.pickerButton}>
                        </Pressable>

                        <Pressable children={({pressed}) => (
                            <Text style={[styles.pickerText, {color: pressed ? '#FFF' : filtro === 'cuidado' ? '#FFF' : '#92909A', backgroundColor: pressed ? '#FF761E' : filtro === 'cuidado' ? '#FF761E' : '#F1F1F1'}]}>Apenas Cuidado</Text>
                        )} onPress={() => filtrarAlertasPorStatus(2)} style={styles.pickerButton}>
                        </Pressable>

                        <Pressable children={({pressed}) => (
                            <Text style={[styles.pickerText, {color: pressed ? '#FFF' : filtro === 'perigo' ? '#FFF' : '#92909A', backgroundColor: pressed ? '#FF761E' : filtro === 'perigo' ? '#FF761E' : '#F1F1F1'}]}>Apenas Perigo</Text>
                        )} onPress={() => filtrarAlertasPorStatus(3)} style={styles.pickerButton}>
                        </Pressable>
                        
                    </View>
                </View>
            </View>

            <TouchableOpacity activeOpacity={100} onPress={() => showPicker && setShowPicker(false)} style={styles.container}>
                <View style={[styles.containerAlert, { justifyContent: listaAlertas.length <= 0 ? 'center' : 'flex-start' }]}>
                    {
                        listaAlertas.length > 0 ?
                        listaAlertas.map((alert) => {
                            return(
                                <View key={alert.id}>
                                    <AlertCard
                                        alerta={alert}
                                        status={alert.status}
                                        quantidadePessoas={alert.amountOfPeople}
                                        hidePicker={() => showPicker && setShowPicker(false)}
                                    />
                                </View>
                            )
                        }) :
                        <Carregando />
                    }
                </View>

            </TouchableOpacity>

           
        </ScrollView>
    )
}

export default Alerts;

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1',
    },

    mainTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: '#92909A'
    },

    ordenar: {
        width: '100%',
        height: 60,
        backgroundColor: 'rgba(250,250,250,0.92)',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },

    containerOrdenar: {
        width: 130,
        height: '100%',
        // backgroundColor: '#FFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    containerAlert: {
        // width: '90%',
        flex: 1,
        // backgroundColor: '#FAFAFA',
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        alignSelf: 'center',
        // justifyContent: 'center',
        margin: 15,
        marginBottom: 50,
        borderRadius: 3
    },

    textOrdenar: {
        fontSize: 17,
        fontFamily: 'Montserrat-SemiBold',
        color: '#92909A'
    },

    row: {
        width: '90%',
        height: 1,
        backgroundColor: '#CCC',
        alignSelf: 'center',
        margin: 10
    },

    picker: {
        width: 200,
        // height: 80,
        // backgroundColor: '#F1F1F1',
        position: 'absolute',
        top: 60,
        right: 100,
        borderWidth: 1,
        borderColor: '#A6A4AE',
        borderRadius: 3
        // padding: 5
    },

    pickerButton: {
        overflow: 'hidden',
        margin: 0,
    },

    pickerText: {
        padding: 14,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        color: '#92909A'
    },

    btnTenteNovamente: {
        width: 250,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#CCC'
    },

    textTenteNovamente: {
        fontSize: 16,
        color: '#FF761E',
        fontFamily: 'Montserrat-SemiBold'
    }
})