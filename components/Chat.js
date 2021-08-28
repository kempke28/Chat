  
import React from 'react';
import { View, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NetInfo from '@react-native-community/netinfo';

import CustomActions from './CustomActions.js';
import MapView from 'react-native-maps';

import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/firestore";

export default class Chat extends React.Component {

  constructor() {

    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
        createdAt: '',
      }
    };

    //Referencing collection location from Firebase, with necessary data. Connect app and database    
    const firebaseConfig = {
      apiKey: "AIzaSyAs1tbB6mZwMizaU7GadTc3QLSjvLba5rw",
      authDomain: "test-c6e5a.firebaseapp.com",
      projectId: "test-c6e5a",
      storageBucket: "test-c6e5a.appspot.com",
      messagingSenderId: "395421407826",
      appId: "1:395421407826:web:e8d0022bf3b9dc71bedd8b",
      measurementId: "G-J1GYXX4Y2T"
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }  //end of constructor

     
  // fetching collection from firebase
    componentDidMount() {

      let name = this.props.route.params.name;
      this.props.navigation.setOptions({ title: name });

      // check connection of the user
        NetInfo.fetch().then(connection => {
          if (connection.isConnected) {
            console.log('online');
            this.setState ({
              isConnected: true
            });

        //reference path from the messages from in firebase collection
          this.referenceChatMessages = firebase.firestore().collection("messages");
          this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          await firebase.auth().signInAnonymously();
          return
        } 

        //if messages fetch return this info from messages
        this.setState({
          messages: [], 
          user: {
            _id: user.uid,
            createdAt: new Date(),
            name: name,
            avatar: "https://placeimg.com/140/140/any", 
          }       
        });

        this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);  
      }); 

      //if not connection give the alert and get messages from local device
          } else {
        console.log('offline');
        Alert.alert('No internet, please connect');
        this.getMessages();
        this.setState({ isConnected: false });
        }
      });
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

    //Stops listening to changes
    componentWillUnmount() {
      this.unsubscribe;
      this.authUnsubscribe;
     }


    // adding message function on chat
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

    
    //save messages on DB
    async saveMessages() {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
      } catch (error) {
        console.log(error.message);
      }
    }


      // on send function for messages
    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
        this.addMessage();
        this.saveMessages();
      });
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

   
    //any update in messages collection in the firebase DB
    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.user._id,
            name: data.user.name,
            avatar: data.user.avatar,
          },
          image: data.image,
          location: data.location
        });
      });
      this.setState({
        messages,
      })
    }


      //render message bubble
    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: 'orange'
            },
            left: {
              backgroundColor: "blue",
          }
        }}
      /> )
     }


     //render input bar
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

    // displays a map for the users
    renderCustomView (props) {
      const { currentMessage} = props;
      if (currentMessage.location) {
        return (
            <MapView
              style={{width: 150,
                height: 100,
                borderRadius: 13,
                margin: 3}}
              region={{
                latitude: currentMessage.location.latitude,
                longitude: currentMessage.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
        );
      }
      return null;
    }
  
     //Creates a circle button to manage the actions
    renderCustomActions = (props) => {
      return <CustomActions {...props} />;
     };


  
  render() {
    
    //Render name and color selected from previous screen
    let name = this.props.route.params.name;
    let selectedBackgroundColor= this.props.route.params.bkgColor
    this.props.navigation.setOptions({ title: name });

    return (

        <View style={{ flex: 1, backgroundColor: selectedBackgroundColor }}>

        <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderActions={this.renderCustomActions}
            renderCustomView={this.renderCustomView}
            onSend={messages => this.onSend(messages)}
            user={this.state.user}
            />

        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
       
        </View>
   )}
  }