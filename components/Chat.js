import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, FlatList, PickerIOSItem } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// import firebase from 'firebase';
// import firestore from 'firebase';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
    constructor() {
      super();
      
      this.state = {
        messages: [],
        uid: 0,
        loggenInText: 'Please wait, Logging in..'
      }

if (!firebase.apps.length){
  firebase.initializeApp({
  apiKey: "AIzaSyDBiw9HcxkieYg04FpvoQryDAj7U2Ht5-E",
  authDomain: "jw-chat-f1039.firebaseapp.com",
  projectId: "jw-chat-f1039",
  storageBucket: "jw-chat-f1039.appspot.com",
  messagingSenderId: "1089230184479",
  appId: "1:1089230184479:web:581fa3509e59c7cd0b752a",
  measurementId: "G-TE01CF40LR"
  });
  this.referenceChatMessages = firebase.firestore().collection("messages");
  }
}


componentDidMount() {
  this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      firebase.auth().signInAnonymously();
    }

    this.setState({
      uid: user.uid,
      messages: []
    });

    this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
  });
}

componentWillUnmount() {
  this.unsubscribe();
  this.authUnsubscribe();
}
      
// adding a users with ID name and avatar
// componentDidMount() {
//   this.setState({
//     messages: [
//       {
//         _id: 1,
//           text: 'Hello developer',
//           createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',dfcsd
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//     },
//       {_id: 2,
//         text: 'This is a system message',
//         createdAt: new Date(),
//         system: true,
//       },
//     ]
//   })
// }

onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  // go through each document
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    var data = doc.data();
    messages.push({
      _id: data._id,
      Answer: data.Answer.toString(),
    });
  });
  this.setState({
    messages,
  });
};

addMessage() { 
  // add a new list to the collection
  const message = this.state.messages[0];
  this.referenceChatMessages.add({
      _id: message._id,
      text: message.text.toString(),
    uid: this.state.uid,
  });
}


onSend(messages = []) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),
  () => {
    this.addMessage();
  }
  )
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

/// add messages to collection and
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

     return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: 'grey'}}>{this.state.loggedInText}</Text>
          <GiftedChat 
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            
            user={{
              _id: this.state.uid,
            }} />
            { Platform.OS === 'android' ? 
            <KeyboardAvoidingView behavior="height" /> : null
            }
    </View>
    );
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'      
  },
  text: {
    fontSize: 30,
  }
});

