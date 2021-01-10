import React from 'react';
import { View, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
    constructor() {
      super();
      this.state = {
        messages: [],
      }
    }
// adding a users with ID name and avatar
componentDidMount() {
  this.setState({
    messages: [
      {
        _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
    },
      {_id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]
  })
}

onSend(messages = []) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }))
}

renderBubble(props) {
  return ( 
    <Bubble 
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: 'blue'
      }
    }}
    />
  )
}

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

     return (
    <View className="backgroundStyles" style={styles.container}>   
    <View style={{flex:3, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Button
          title="Go to Start"
          onPress={() => this.props.navigation.navigate('Start')} />    */}
        <GiftedChat 
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }} />
            { Platform.OS === 'android' ? 
            <KeyboardAvoidingView behavior="height" /> : null
            }
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