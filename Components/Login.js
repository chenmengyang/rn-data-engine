import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button, Alert, } from 'react-native'
import firebase from "firebase";

export default class Login extends Component {

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
      .then()
      .catch(err => {
        // Alert.alert(JSON.stringify(err));
        this.setState((prevState) => ({
          errorMsg: err.message,
        }))
      })
  }

  render() {
    return (
      <View style={styles.login}>
        <TextInput
          style={styles.input}
          placeholder="Type your email address"
          onChangeText={(text)=>this.handleInputChange(text, 'email')}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          onChangeText={(text)=>this.handleInputChange(text, 'password')}
        />
        {/* <Text>{this.state.email}</Text>
        <Text>{this.state.password}</Text> */}
        <Button onPress={this.login} title="Sign in"/>
        <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    flexDirection:'column'
  },
  input: {
    height: 50,
    width: 200
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
