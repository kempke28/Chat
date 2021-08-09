import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


// Set image background.
const ImageBackground = require('../assets/Background-Image.png');

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: ''
        }}

  render() {
    return (

    <View style = {styles.container}>
        {/* Calling the background image */}
        <ImageBackground style = { ImageBackground } source={ImageBackground} resizeMode="cover" style={styles.image}>
        </ImageBackground>

        <View style={styles.mainTitle}>
            <Text style={styles.Title}>Chat chat</Text>
        </View>

        {/* litte box where info is */}
        <View style={styles.mainBox}>       
            <TextInput
            style = {styles.boxNameInput} onChangeText = {( name ) => this.setState ({ name })}
            value = {this.state.name} placeholder = "type here... "
            />

            <View style = {styles.boxColors}>
                <Text style = {styles.chooseColorText}>
                    Choose your Chat background color
                </Text>

                {/* choose color for chat background */}
                <View style={styles.chatColors}>
                    <TouchableOpacity
                    style={styles.chatColor1}
                    onPress={() => this.setState({ chatColors: '#090C08' })}
                    />
                    <TouchableOpacity
                    style={styles.chatColor2}
                    onPress={() => this.setState({ chatColors: '#474056' })}
                    />
                    <TouchableOpacity
                    style={styles.chatColor3}
                    onPress={() => this.setState({ chatColors: '#8A95A5' })}
                    />
                    <TouchableOpacity
                    style={styles.chatColor4}
                    onPress={() => this.setState({ chatColors: '#B9C6AE' })}
                    />
                </View>
            </View>

            {/* Button to go to chat */}
            <View>

                <TouchableOpacity>
                style={styles.chatButton}
                onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, chatColor: this.state.chatColor })}
                </TouchableOpacity>

                <Text style={styles.chatButtonText}>Chat Chat go</Text>

            </View>
        </View>
    </View>

    
    )};
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    ImgBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "cover",
        justifyContent: 'center',
        alignItems: 'center'
    },
    Title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        top: 30,
        height: 50,
    },
    mainBox: {
        flexDirection: "column"
    },
    boxNameInput: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderColor: '#757083',
        borderRadius: 2,
        fontSize: 16,
        fontWeight: "300",
        color: '#757083',
    },
    chooseColorText: {
        fontSize: 16, 
        fontWeight: 300, 
        color: '#757083', 
        opacity: 100
    },
    chatColors: {
        flexDirection: "column",
        justifyContent: 'space-between',
    },
    chatColor1, chatColor2, chatColor3, chatColor4: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    chatColor1:  {
        backgroundColor: '#090C08',
    },
    chatColor3:  {
        backgroundColor: '#474056',
    },
    chatColor3:  {
        backgroundColor: '#8A95A5',
    },
    chatColor4:  {
        backgroundColor: '#B9C6AE',
    },
    chatButton: {
        marginTop: 10,
        backgroundColor: '#757083',
        width: '88%',
        padding: 15,
    },
    chatButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 60,
    }
  });