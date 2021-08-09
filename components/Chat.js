import React from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { View, Text, Button, TextInput, Stylesheet, Platform, KeyboardAvoidingView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import NetInfo from '@react-native-community/netinfo';

export default class Chat extends React.Component {

  constructor() {
      
    super();
      this.state = {
      messages: [],
      uid: "",
      user: {
          _id: "",
          name: "",
          avatar: "",
        },
      }
      
    //Referencing collection location from Firebase, with neesary data. Connect app and database
    const firebaseConfig = {
      apiKey: "AIzaSyAFtUXDT-rVbMXw0lASbyBGlwkAexTqMXI",
      authDomain: "chat-app-6a20b.firebaseapp.com",
      projectId: "chat-app-6a20b",
      storageBucket: "chat-app-6a20b.appspot.com",
      messagingSenderId: "457065219789",
      appId: "1:457065219789:web:6be5513dedcb311fab0b84"
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    };
      this.referenceChatMessages = null;
    }

    //Read messages from
    async getMessages() {
      let messages = '';
      try {
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
          messages: JSON.parse(messages)
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    // fetching collection from firebase
    componentDidMount() {

      NetInfo.fetch().then(connection => {
        if (connection.isConnected) {
          console.log('online');
        } else {
          console.log('offline');
        }
      });

    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
         
        this.setState({
          uid: user.uid,
          messages: [], 
          user: {
              _id: 2,
              name: user.name,
              avatar: 'https://placeimg.com/140/140/any',
          }}),
          
        this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
    } else {
      console.log('offline');
      this.getMessages();
      this.setState({ isConnected: false });
    }})
  }


    // adding message funtion on chat
    addMessage() {
      const message = this.state.messages[0];
      this.referenceChatMessages.add({
        _id: message._id,
        createdAt: message.createdAt,
        text: message.text || null,
        user: message.user,
        image: message.image || null,
        location: message.location || null
      });
    }

      // on send function for messages
    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
        this.saveMessages();
      });
    }

      //save messages on DB
    async saveMessages() {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
      } catch (error) {
        console.log(error.message);
      }
    }
    
      //delete messages
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
      querySnapshot.forEach((doc) => {
       
        let data = doc.data();
        messages.push({
          name: data.name,
          items: data.items.toString(),
        });
      });
      this.setState({ 
        lists,
     });
    }

      //render message bubble function
    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: 'orange'
            }
          }}
        />
      )
    }

    renderInputToolbar(props) {
      if (this.state.isConnected == false) {
      } else {
        return(
          <InputToolbar
          {...props}
          />
        );
      }
    }
  

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribe();
  };


    
  
  render() {

    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    return (

        <View>

        <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
                _id: 1,
            }}
            />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
       
        </View>
   )}
  }