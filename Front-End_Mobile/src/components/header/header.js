import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

// importa o useNavigation para usar a navegação do react navigation
import { useNavigation } from "@react-navigation/core";

export const Header = (props) => {

    // constante que armazena a navegação
    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            {/* navigation.openDrawer() para abrir o drawer */}
            <TouchableOpacity activeOpacity={0.4} style={styles.btnMenu} onPress={() => navigation.openDrawer()}>
                <Image 
                    style={styles.menuHamburger}
                    source={require('../../../assets/img/menu.png')}
                />
            </TouchableOpacity>

            <View style={styles.mainContent}>
                {
                    props.screenName === 'Dashboard' ?
                    <Image 
                        source={require('../../../assets/img/DashBoard.png')}
                        style={styles.imgScreen}
                    /> :
                    props.screenName === 'Alerts' ?
                    <Image 
                        source={require('../../../assets/img/alerta-1.png')}
                        style={styles.imgScreenAlerts}
                    /> :
                    props.screenName === 'Settings' ?
                    <Image 
                        source={require('../../../assets/img/setting.png')}
                        style={styles.imgScreenSettings}
                    /> :

                    <Image 
                        source={require('../../../assets/img/user.png')}
                        style={styles.imgScreenProfile}
                    />
                }
                <Text style={styles.mainTextHeader}>{props.screenName}</Text>
            </View>

            <View style={styles.contentLogo}>
                {/* <Image 
                    style={styles.logo}
                    source={require('../../../assets/img/logo.png')}
                /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 62,
      backgroundColor: '#FF761E',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    btnMenu: {
        width: '30%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    },

    menuHamburger: {
        width: 26,
        height: 18,
        tintColor: '#FFF',
        marginLeft: 20,
    },

    contentLogo: {
        width: '30%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 5
    },

    logo: {
        width: 45,
        height: 45,
        marginRight: 20,
    },

    mainContent: {
        width: '40%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imgScreen: {
        width: 25,
        height: 24,
        tintColor: '#FFF'
    },

    imgScreenAlerts: {
        width: 20,
        height: 26,
        tintColor: '#FFF'
    },

    imgScreenSettings: {
        width: 23,
        height: 22.98,
        tintColor: '#FFF'
    },

    imgScreenProfile: {
        // height: '100%'
        width: 26,
        height: 26,
        tintColor: '#FFF'
    },

    mainTextHeader: {
        color: '#FFF',
        fontSize: 17,
        marginLeft: 10,
        fontFamily: 'Montserrat-Medium'
    }
  
  });

export default Header;