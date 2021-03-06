import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Components/Login';
import Engine from './Components/Engine';
import { createStackNavigator, StackNavigator, } from "react-navigation";
import firebase from "firebase";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
    const config = {
      apiKey: "AIzaSyBVR2TZ87ujbk6iteWKFQwc4qdcdcaBE-w",
      authDomain: "test-99444.firebaseapp.com",
      databaseURL: "https://test-99444.firebaseio.com",
      projectId: "test-99444",
      storageBucket: "test-99444.appspot.com",
      messagingSenderId: "1019996834528"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState((prevState) => ({user: user.email}));
      } else {
        // User is signed out.
        this.setState((prevState) => ({user: ''}));
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Login navigate={this.props.navigation.navigate}/>
      </View>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: App
  },
  Engine: {
    screen: Engine
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {

  },
});
