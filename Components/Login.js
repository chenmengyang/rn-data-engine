import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button, Alert, KeyboardAvoidingView, } from 'react-native'
import firebase from "firebase";

export default class Login extends Component {

  static navigationOptions = {
    title: 'App',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleInputChange(value, type) {
    this.setState((prevState) => ({
      [type]: value
    }));
  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.props.navigate('Engine');
    })
    .catch(err => {
      this.setState((prevState) => ({
        errorMsg: err.message,
      }))
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding" enabled>
        <TextInput
          underlineColorAndroid = 'transparent'
          style={styles.input}
          placeholder="Type your email address"
          onChangeText={(text)=>this.handleInputChange(text, 'email')}
        />
        <TextInput
        underlineColorAndroid = 'transparent'
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          onChangeText={(text)=>this.handleInputChange(text, 'password')}
        />
        <Button onPress={this.login} title="Sign in"/>
        <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    flexDirection:'column'
  },
  input: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 5,
    paddingLeft: 5
  },
  errorMsg: {
    marginTop: 10,
    color: 'red',
    width: 200,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
  }
})
