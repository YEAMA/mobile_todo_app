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

  inputChanged (type, newValue) {
    var newState = new Object;
    newState[type] = newValue;
    this.setState(newState);
    console.log(this.state);
  }

  getTodos () {
    return AsyncStorage.getItem('myTodos')
  }

  submitTodo () {
    this.getTodos().then((todos) => {
      var newTodos = JSON.parse(todos);
      this.state.completed = false;
      newTodos.unshift(this.state);
      AsyncStorage.setItem('myTodos', JSON.stringify(newTodos));

      console.log(this.props.navigation)
      this.props.navigation.state.params.refresherFunc(JSON.stringify(newTodos));

      const { goBack } = this.props.navigation;
      goBack();
    }, (e) => console.log(e));
  }

  render() {
      return (
        <View style={styles.container}>
           <TextInput style={styles.textInput} placeholder="Enter Todo Title"
             onChangeText={(val) => this.inputChanged('title', val)}/> 
            <TextInput style={[styles.textInput, styles.largerInput]} multiline={true} placeholder="Enter Todo Description" onChangeText={(val) => this.inputChanged('description', val)}/>  
           <Button style={styles.btn} title="Submit" onPress={this.submitTodo.bind(this)} />  
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
