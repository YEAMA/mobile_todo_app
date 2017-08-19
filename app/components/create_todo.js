import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Switch, Button, AsyncStorage, TextInput } from 'react-native';

export default class Create_Todo extends Component {

  constructor () {
    super();

    this.state = {
      todo: {}
    }
  }

  static navigationOptions = ({ navigation }) => {
    const {goBack} = navigation;
    return {
      title: 'Add New Todo',
      headerRight: (
        <Button title="Cancel" onPress={() => goBack()}
        />
      ),
    };
  };

  render() {
      return (
        <View style={styles.container}>
          <TextInput style={styles.textInput} placeholder="Enter Todo Title"/>
          <TextInput style={[styles.textInput, styles.largerInput]} multiline={true} placeholder="Enter Todo Description"/>
          
          <Button style={styles.btn} title="Submit" onPress={() => console.log("test")} />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver'
  },
  
  textInput: {
    fontSize: 15,
    padding: 13,
    backgroundColor: 'white',
    marginTop: 10
  },
  
  largerInput: {
    height: 100
  },
});
