import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';

//import Navigation react
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Start from './components/Start';
import Chat from './components/Chat';

const Tab = createBottomTabNavigator();

export default class HelloWorld extends Component {
 
  render() {

    return (
      <NavigationContainer>
        {/* // import the screens we want to navigate */}
        <Tab.Navigator
        initialRouteName="Start"
      >
        {/* //import Start screen */}
        <Tab.Screen
          name="Start"
          component={Start}
        />
        {/* //import chat screen */}
        <Tab.Screen
          name="Chat"
          component={Chat}
        />
      </Tab.Navigator>
      </NavigationContainer>
    );
}
};