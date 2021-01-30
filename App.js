import React, { Component } from 'react';
import 'react-native-gesture-handler';
//import Navigation react
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
          {/* //import Start screen */}
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ headerShown: false }}
          />
          {/* //import chat screen */}
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
