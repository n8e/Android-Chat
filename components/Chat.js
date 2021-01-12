import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

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
        isConnected: false,
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
  this.getMessages();
  NetInfo.fetch().then(connection => {
    if (connection.isConnected) {
      console.log('online');
    } else {
      console.log('offline');
    }
  });

  this.authUnsubscribe = firebase.auth()
  .onAuthStateChanged((user) => {
    if (!user) {
      firebase.auth().signInAnonymously();
    }

    this.setState({
      uid: user.uid,
      messages: [],
     });

    this.unsubscribe = this.referenceChatMessages
    .orderBy('createdAt', 'desc')
    .onSnapshot(this.onCollectionUpdate);
  });

}

componentWillUnmount() {
  this.unsubscribe();
  this.authUnsubscribe();
}
// localstoreage
async getMessages() {
  let messages = '';
  try {
    messages = await AsyncStorage.getItem('messages') ||  [];
    this.setState({
      messages: JSON.parse(messages)
    });
  } catch (error) {
    console.log(error.message)
  }
};

async saveMessages() {
  try{
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch (error) {
    console.log(error.message)
  }
}

async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message);
  }
}

onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  // go through each document
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    var data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text.toString(),
      createdAt: data.createdAt.toDate(),
      user: data.user
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
      createdAt: message.createdAt,
      user: message.user
  });
}

onSend(messages = []) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),
  () => {
    this.saveMessages();
    this.addMessage();
  }
  )
}



// renderInputToolbar(props) {
//   if (this.state.isConnected == false) {
//   } else {
//     return(
//       <InputToolbar
//       {...props}
//       />
//     );
//   }
// }

/// add messages to collection and
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

     return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: 'grey'}}>{this.state.loggedInText}</Text>
          <GiftedChat 
            isConnected={this.state.isConnected}
            renderInputToolbar={this.renderInputToolbar}
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

