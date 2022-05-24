import React, { useEffect } from 'react'
import { 
    Text, 
    View, 
    StyleSheet, 
    SafeAreaView, 
    Image, 
    ActivityIndicator 
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/core";

import Logo from '../../assets/img/mainLogo1.png'

export const Loading = (props) => {

    const navigation = useNavigation();

    const verificarLogado = async () => {
        const token = await AsyncStorage.getItem('user_token-acess-goodEye')

        if(token == null) {
            // console.warn("There's no token")

            props.navigation.navigate('Login')

            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            })
        }else {
            // console.warn(token)

            props.navigation.navigate('Drawer')

            navigation.reset({
                index: 0,
                routes: [{name: 'Drawer'}]
            })
        }
    }

    useEffect(() => {
        verificarLogado()
    }, [])

    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.containerLogo}>
                <Image 
                    source={Logo}
                    style={styles.mainLogo}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.mainText}>O melhor monitoramento para você</Text>
            </View>

            <View style={styles.loadingContainer}>
                <ActivityIndicator 
                    size="large"
                    color="#FFF"
                />
                <Text style={styles.textLogo}>Good<Text style={{fontFamily: 'Montserrat-Black', color: '#353535'}}>Eye</Text></Text>
            </View>
        </SafeAreaView>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: '#FF761E'
    },

    containerLogo: {
        flex: 1.5,
        // backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    mainLogo: {
        width: 180,
        height: 155,
        tintColor: '#FFF'
        // margin: 100,
        // alignSelf: 'center'
    },
    
    textContainer: {
        flex: 1,
        // backgroundColor: '#CCC'
    },

    mainText: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#FFF',
        textAlign: 'center'
    },

    loadingContainer: {
        flex: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    textLogo: {
        fontSize: 30,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-Bold',
        color: '#FFF',
        marginBottom: 20
    }
})