# :peach: Chat Chat

## :cookie: Objetive

Create a little message mobile app using React.Native that can execute tasks, such as sending messages, use the camera to send photos and location everything on real-time.

## :cookie: Features

Created with React.Native and expo using Google Firebase as an online database storage and a Gifted Chat library for nice lookiing interface purposes. 
Let the user select pictures from the personal library to send.
Allow to send location 
Allows the user take some pictures using the camera
As a chat let 2 people send messages without restrictions
Let the user select the name of the user to whom the message is going to be send

## :cookie: Tools

- React Native
- Expo (permissions)
- Google Firestore Database
- Gifted Chat

## :cookie: Setting the project up

Once cloned in the folder and opened, the first thing neet to be done is install the library with the command

```bash
npm install expo-cli --global
```

Once that, is done firebase is the next thing in the list, Trying to configure the databe to be part of the project creating a new collection, some data of the firebase conoletion are needes to be fully oprationnal at the cloud.
 Ex.
 
 ```python
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
  ```
    
Firebase cloud storage data will be given by the google firebase once creatted the collection

## :cookie: Run the project

The command to run the app is the next

```bash
expo start
```

once there, a QR code will be given to scan in the phone or at the emulator. The 'expo app' will be needed to exacute the code.
The chat will be open to enjoy.


