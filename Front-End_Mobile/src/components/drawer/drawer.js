import React, { useState, useEffect } from "react";
import { View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ImageBackground, 
  StatusBar 
} from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../../screens/dashboard";
import Alerts from "../../screens/alerts";
import Settings from "../../screens/settings";
import Profile from "../../screens/profile";
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from "jwt-decode";

const Drawer_ = createDrawerNavigator();

export const Drawer = (props) => {

    return(
        <>
          <StatusBar hidden={false} backgroundColor="#FF761E"/>
          <Drawer_.Navigator
              screenOptions={{
                  headerShown: false,
                  drawerStyle: {
                      width: '70%',
                  },
              }}
              drawerContent={props => <CustomDrawer {...props}/>}
          >
              <Drawer_.Screen name='Dashboard' component={Dashboard} />
              <Drawer_.Screen name='Alerts' component={Alerts}/>
              <Drawer_.Screen name='Settings' component={Settings}/>
              <Drawer_.Screen name='Profile' component={Profile}/>
          </Drawer_.Navigator>
        </>
    )
}


// content that will be showed in the left menu
const CustomDrawer = (props) => {

  const [currentRoute, setCurrentRoute] = useState('Dashboard')
  const [dados, setDados] = useState([])

  const deslogar = async () => {
    await AsyncStorage.removeItem('user_token-acess-goodEye')

    props.navigation.navigate('Login')

    props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}]
    })
  }

  const buscarDadosStorage = async () => {
    const token = await AsyncStorage.getItem('user_token-acess-goodEye')

    const dadosDecodificados = await jwtDecode(token) 
    
    setDados(dadosDecodificados)
  }

  useEffect(() => {
    buscarDadosStorage()
  }, [])

  return(
    <View style={styles.contentDrawer}>

      <View style={styles.contentProfile}>
          <Image
            source={require('../../../assets/img/user.png')}
            style={styles.profileImage}
          />

          <View style={styles.containerTextProfile}>
            <Text style={styles.profileName}>{dados.family_name}</Text>
            <Text style={styles.profileRuleText}>{dados.role}</Text>
          </View>
      </View>

      <View style={styles.drawerRow}/>


      <TouchableOpacity activeOpacity={0.5} onPress={() => {
          setCurrentRoute('Dashboard')
          props.navigation.navigate('Dashboard')
        }} 
        style={currentRoute == 'Dashboard' ? styles.drawerItemSelected : styles.drawerItem}>
        <Image
          source={require('../../../assets/img/DashBoard.png')}
          style={[currentRoute == 'Dashboard' ? styles.imgDrawerItemActive : styles.imgDrawerItem, {width: 25, height: 24}]}
        />
        <Text style={[currentRoute == 'Dashboard' ? styles.textDrawerItemActive : styles.textDrawerItem, { marginLeft: 10 }]}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
          setCurrentRoute('Alerts')
          props.navigation.navigate('Alerts')
        }} style={currentRoute == 'Alerts' ? styles.drawerItemSelected : styles.drawerItem}>
        <Image
          source={require('../../../assets/img/alerta-1.png')}
          style={[currentRoute == 'Alerts' ? styles.imgDrawerItemActive : styles.imgDrawerItem, { width: 20, height: 26 }]}
        />
        <Text style={[currentRoute == 'Alerts' ? styles.textDrawerItemActive : styles.textDrawerItem, { marginLeft: 15 }]}>Alerts</Text>
      </TouchableOpacity>

      <View style={styles.drawerRow}/>

      <TouchableOpacity onPress={() => {
          setCurrentRoute('Profile')
          props.navigation.navigate('Profile')
        }} style={currentRoute == 'Profile' ? styles.drawerItemSelected : styles.drawerItem}>
        <Image
          source={require('../../../assets/img/user.png')}
          style={[currentRoute == 'Profile' ? styles.imgDrawerItemActive : styles.imgDrawerItem, { width: 26, height: 26 }]}
        />
        <Text style={currentRoute == 'Profile' ? styles.textDrawerItemActive : styles.textDrawerItem}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
          setCurrentRoute('Settings')
          props.navigation.navigate('Settings')
        }} style={currentRoute == 'Settings' ? styles.drawerItemSelected : styles.drawerItem}>
        <Image
          source={require('../../../assets/img/setting.png')}
          style={currentRoute == 'Settings' ? styles.imgDrawerItemActive : styles.imgDrawerItem}
        />
        <Text style={currentRoute == 'Settings' ? styles.textDrawerItemActive : styles.textDrawerItem}>Settings</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={ deslogar } style={currentRoute == 'Signout' ? styles.drawerItemSelected : styles.drawerItem}>
        <Image
          source={require('../../../assets/img/power-off-solid.png')}
          style={[styles.imgDrawerItem, {width: 25, height: 25}]}
        />
        <Text style={[styles.textDrawerItem, { marginLeft: 10 }]}>Sign Out</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.drawerItemNotification}>
        <Image
          source={require('../../../assets/img/notification.png')}
          style={styles.imgDrawerItem}
        />
        <Text style={styles.textDrawerItem}>Notifications</Text>
      </TouchableOpacity> */}

    </View>
  )
}

const styles = StyleSheet.create({
    contentDrawer: {
        flex: 1,
        backgroundColor: '#FFF'
      },
    
      drawerItem: {
        width: '100%',
        height: 54,
        backgroundColor: '#FFF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
    
      },
    
      drawerItemNotification: {
        width: '100%',
        height: 54,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        // backgroundColor: '#CCC'
      },
    
      drawerItemSelected: {
        width: '100%',
        height: 54,
        backgroundColor: '#FF761E',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
      },
    
      imgDrawerItem: {
        margin: 20,
        tintColor: '#A6A4AE',
      },
    
      imgDrawerItemActive: {
        margin: 20,
        tintColor: '#FFF'
      },
    
      textDrawerItem: {
        fontSize: 16,
        color: '#A6A4AE',
        fontFamily: 'Montserrat-Medium',
        marginLeft: 10
      },
    
      textDrawerItemActive: {
        fontSize: 16,
        color: '#FFF',
        fontFamily: 'Montserrat-Medium',
        marginLeft: 10
      },
    
      drawerRow: {
        width: '85%',
        height: 1,
        backgroundColor: '#CFCDD7',
        marginTop: 18,
        alignSelf: 'center'
      },

      contentProfile: {
        width: '90%',
        height: 90,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: -5,
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },

      containerTextProfile: {
        marginLeft: 20,
      },

      profileImage: {
        width: 69,
        height: 69,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#FF761E',
        tintColor: '#FF761E'
      },

      profileName: {
        color: '#737373',
        fontSize: 17,
        fontFamily: 'Orienta-Regular',
        marginBottom: 12,
      },

      profileRuleText: {
        fontSize: 16,
        color: '#FF761E',
        fontFamily: 'Orienta-Regular',
        fontWeight: '600'
      }
})

export default Drawer;