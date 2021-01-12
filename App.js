import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';

//import Navigation react
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// components for the app
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createStackNavigator();

export default class HelloWorld extends Component {

  render() {

    return (
      <NavigationContainer>
        {/* // import the screens we want to navigate */}
        <Stack.Navigator
        initialRouteName="Start"
      >
        {/* //import Start screen */}
        <Stack.Screen
          name="Start"
          component={Start}
        />
        {/* //import chat screen */}
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
      </NavigationContainer>
    );
}
};