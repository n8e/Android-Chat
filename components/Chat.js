import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class Chat extends React.Component {
  

  render() {
    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

     return (
    <View className="backgroundStyles" style={styles.container}>   
    <View style={{flex: 0.3, flexDirection: 'row'}}>
          <View style={{ width: 30, height: 30, backgroundColor: 'powderblue', borderRadius: '50%', outlineColor: 'white, 1px, solid'  }} />
          <View style={{width: 30, height: 30, backgroundColor: 'skyblue', borderRadius: '50%'}} />
          <View style={{width: 30, height: 30, backgroundColor: 'steelblue', borderRadius: '50%'}} />
    </View>
    <View style={{flex:3, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Go to Start"
          onPress={() => this.props.navigation.navigate('Start')} />      
    </View>
    </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
   },
   redBack: {
    flex: 1,
    backgroundColor: 'powderblue',
    display: 'cover'
   }
});