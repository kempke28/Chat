import React from 'react';
import { View, Text, Button, StyleSheet, TextInput,  TouchableOpacity, ImageBackground } from 'react-native';


export default class Start extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        bcolor: "",
      };
    }
  
    render() {
      return (

        //Background image
        <ImageBackground
          source={require("../assets/Background-Image.png")} style={styles.background}
        >
          {/* Title */}
          <Text style={styles.title}>Chat Chat</Text>

          {/* Box container where input is*/}
          <View style={styles.boxContainer}>
            
            <TextInput
              style={styles.textInput}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Type here your name..."
            />

            {/* Color circles */}
            <Text style={styles.chooseColorBg}>Choose Background Color:</Text>

            <View style={styles.colorBox}>
              <TouchableOpacity
                accessibilityRole="button"
                style={[styles.colorCircle, styles.color1]}
                onPress={() => this.setState({ bcolor: "#090C08" })}
              />
              <TouchableOpacity
                accessibilityRole="button"
                style={[styles.colorCircle, styles.color2]}
                onPress={() => this.setState({ bcolor: "#474056" })}
              />
              <TouchableOpacity
                accessibilityRole="button"
                style={[styles.colorCircle, styles.color3]}
                onPress={() => this.setState({ bcolor: "#8A95A5" })}
              />
              <TouchableOpacity
                accessibilityRole="button"
                style={[styles.colorCircle, styles.color4]}
                onPress={() => this.setState({ bcolor: "#B9C6AE" })}
              />
            </View>



            {/* Button element to go to chat view */}
            <TouchableOpacity
              accessibilityRole="button"
              style={styles.buttonContainer}
              onPress={() =>
                this.props.navigation.navigate("Chat", { name: this.state.name, bkgColor: this.state.bcolor })
              }
            >
            {/*Button to GO*/}
              <View style={styles.GoButton}>
                <Text style={styles.buttonText}>Start Chatting</Text>
              </View>
            </TouchableOpacity>
  
          </View>
        </ImageBackground>
      )
    }
  }
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 45,
      fontWeight: "600",
      color: "#FFF",
      marginTop: 90,
    },
    boxContainer: {
      flexDirection: "column",
      width: "90%",
      height: 265,
      justifyContent: "space-evenly",
      marginBottom: 100,
    },
    textInput: {
      height: 50,
      width: "90%",
      marginLeft: "6%",
      paddingLeft: 20,
      borderColor: "#757083",
      borderWidth: 1,
      fontSize: 16,
      fontWeight: "700",
      color: "black",
      borderRadius: 15,
      borderWidth: 3
    },
    chooseColorBg: {
      fontSize: 20,
      marginLeft: 25,
    },
    colorBox: {
      flexDirection: "row",
      width: "88%",
      justifyContent: "center"
    },
    colorCircle: {
      borderRadius: 25,
      height: 40,
      width: 40,
      marginLeft: "6%",
    },
    color1: {
      backgroundColor: "#090C08",
    },
    color2: {
      backgroundColor: "#474056",
    },
    color3: {
      backgroundColor: "#8A95A5",
    },
    color4: {
      backgroundColor: "#B9C6AE",
    },
    buttonContainer: {
      width: "88%",
      marginLeft: "6%",
    },
    GoButton: {
      backgroundColor: "#757083",
      padding: 15,
      height: 50,
      borderRadius: 20
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: '#FFF',
      textAlign: "center",
    }
  })