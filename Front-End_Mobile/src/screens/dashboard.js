import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Header from "../components/header/header";
import Pessoas from "./pessoas";
import Temperatura from "./temperatura";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const MaterialTab = createMaterialTopTabNavigator();

export const Dashboard = () => {
    return(
        <>
          <Header screenName="Dashboard" />

          <MaterialTab.Navigator
              initialRouteName='Pessoas'
              tabBarPosition='bottom'
              screenOptions={{
                  tabBarInactiveTintColor: '#817F89',
                  tabBarActiveTintColor: '#FF761E',
                  tabBarIndicatorStyle: {
                      backgroundColor: '#FF761E',
                      height: 3,
                      position: 'absolute',
                      top: 0
                  },
                  tabBarLabelStyle: {
                    fontFamily: 'Montserrat-Medium'
                  },
                  swipeEnabled: false,
                  tabBarPressColor: '#D6D4DE'
              }}>
              <MaterialTab.Screen name='Pessoas' component={Pessoas}/>
              <MaterialTab.Screen name='Temperatura' component={Temperatura}/>
          </MaterialTab.Navigator>
        </>
    )
}


export default Dashboard;