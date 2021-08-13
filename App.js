import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator


export default class App extends React.Component () {

  constructor(props) {
  super(props);
  this.state = { text: "" };
  }

render() {
  
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Start">
        <Stack.Screen name = "start" component = { Start }/>
        <Stack.Screen name = "chat" component = { Chat }/>
      </Stack.Navigator>
    </NavigationContainer>
    )};
  }
