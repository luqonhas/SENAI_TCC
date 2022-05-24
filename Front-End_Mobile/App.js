import OneSignal from 'react-native-onesignal';
import React, { useEffect, useState, useCallback, useRef } from 'react';

// components
import Header from './src/components/header/header';

import {
  Image,
  StyleSheet,
} from 'react-native';

import { useNavigation } from "@react-navigation/core";

import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Login from './src/screens/login';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import Drawer from './src/components/drawer/drawer';
import Alerts from './src/screens/alerts'
import Settings from './src/screens/settings'
import Alert from './src/screens/alert';
import Loading from './src/screens/loading'

const Stack = createNativeStackNavigator()

const App = (props) => {

  useEffect(() => {
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("f9e64e56-facf-4cd9-a1b3-0b1803a780a6");
    //END OneSignal Init Code

    //Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log("Prompt response:", response);
    });

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData
      console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
  }, [])

  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Loading'}
      >
        <Stack.Screen name='Loading' component={Loading} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Drawer' component={Drawer}/>
        <Stack.Screen name='Alert' component={Alert} options={{headerShown: true, headerTitle: 'Alerta', headerTintColor: '#FF761E', headerTitleStyle: {fontFamily: 'Montserrat-SemiBold', fontSize: 18 }, headerShadowVisible: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCC'
  },

  text: {
    color: 'black'
  }
});

export default App;
