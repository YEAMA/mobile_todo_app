import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Switch, Button, AsyncStorage, TextInput } from 'react-native';

export default class Edit_Todo extends Component {

  constructor () {
    super();

    this.state = {
    }
  }

  findTodo(allTodos, title) {
    for(let i = 0; i <= allTodos.length; i++) {
      if (allTodos[i].title == title) {
        return {todo: allTodos[i], index: i};
      }
    }
  }

  componentWillMount() {
    this.setState({
      title: this.props.navigation.state.params.title,
      description: this.props.navigation.state.params.description,
      completed: this.props.navigation.state.params.completed
    })
  }

  static navigationOptions = ({ navigation }) => {
    const {goBack} = navigation;
    return {
      title: navigation.state.params.title,
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
  this.getTodos()
      
    .then((todos) => {
      var oldTodos = JSON.parse(todos);
      var oldTodoData = this.findTodo(oldTodos, this.state.title);
      var oldTodo = oldTodoData.todo || {};

      var newTodo = this.state;

      oldTodos[oldTodoData.index] = newTodo;
      var newTodos = oldTodos;

      newTodos = JSON.stringify(newTodos);

      AsyncStorage.setItem("myTodos", newTodos);

      this.setState({
        loading: false
      })

      this.props.navigation.state.params.childRefresherFunc(JSON.stringify(newTodo));
      this.props.navigation.state.params.parentRefresherFunc(newTodos);

      const { goBack } = this.props.navigation;
      goBack();
    }, (e) => console.log(e));
  }

  render() {
      return (
        <View style={styles.container}>
           <TextInput style={styles.textInput} placeholder="Enter Todo Title"
             onChangeText={(val) => this.inputChanged('title', val)} value={this.state.title}/> 
            <TextInput style={[styles.textInput, styles.largerInput]} multiline={true} placeholder="Enter Todo Description" onChangeText={(val) => this.inputChanged('description', val)} value={this.state.description}/>  

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
