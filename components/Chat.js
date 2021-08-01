import React from 'react';
import { View, Text, Button, TextInput, Stylesheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Platform, KeyboardAvoidingView } from 'react-native';


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
        },
      
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
      

    // fetching collection from firebase
    componentDidMount() {

    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    
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
    },

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
    },

    // on send function for messages
    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),() => {
        this.addMessage();
        },
      });
    )}
    )

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
  };

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribe();
  }
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