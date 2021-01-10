import React from 'react';
import { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';


export default class Start extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '',

    };
  }



  render() {

    const image = { uri: "https://www.jungsky.hr/sites/default/files/styles/width_767/public/uploads/2019-11/poslovni_letovi_mobile_2.png?itok=DzSrrkbx" };

    return (

  <View className="backgroundStyle" style={styles.container}>
    <ImageBackground source={image} style={styles.image}>
    <View style={{ flex:2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.text}>Username</Text>
        <TextInput
         style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
         onChangeText={(name) => this.setState({name})}
         value={this.state.name}
         placeholder='Type here ...'
       />
       <Text style={styles.text}>You wrote: {this.state.name}</Text> 
        <Button
          title="Go to Chat"
          onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })} />
      </View>
      </ImageBackground>
  </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
   },
   image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
   text: {
     fontSize: '18px',
     margin: '0.8em'
   },
    redBack: {
    flex: 1,
    backgroundColor: 'powderblue',
    display: 'cover'
    }
});