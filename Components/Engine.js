import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, Alert, } from 'react-native';
import firebase from "firebase";
import "firebase/firestore";

export default class Engine extends Component {

  constructor(props) {  
      super(props);
      this.state = {
          err: '',
      }
      this.logout = this.logout.bind(this);
      this.emit = this.emit.bind(this);
      // ...
      const firestore = firebase.firestore();
      const settings = {
          timestampsInSnapshots: true
      };
      firestore.settings(settings);
      this.db = firebase.firestore();
  }

  logout() {
    firebase.auth().signOut().then(() => {
        this.props.navigation.navigate('Home');
    });
  }

  emit() {
    this.db.collection('engine').doc('device1').update({
        [(new Date()).toLocaleString()]: Math.round(Math.random() * 10)
    }).then(() => {
        Alert.alert('a number emit to fb! boom!');
    })
    .catch(err => {
        this.setState((prevState) => ({
            err: err.message,
        }))
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.logout} onPress={this.logout} title="Logout" />
        <Text> Engine Page </Text>
        <Button style={styles.logout} onPress={this.emit} title="Emit" />
        <Text>{this.state.err}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {},
    logout: {},
})
