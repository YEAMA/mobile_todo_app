import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Switch, Button, AsyncStorage, ActivityIndicator } from 'react-native';

export default class Single_Todo extends Component {

  constructor () {
    super();

    this.state = {
      loading: false,
      todo: {}
    }
  }

  findTodo(allTodos, title) {
    for(let i = 0; i <= allTodos.length; i++) {
      if (allTodos[i].title == title) {
        return {todo: allTodos[i], index: i};
      }
    }
  }

  // findTodoAndReplace(allTodos, title, newTodo) {
  //   var oldTodoData = findTodo(allTodos, title),
  //       oldTodo = oldTodoData.todo,
  //       index = oldTodoData.index;

  //   allTodos[index] = newTodo;
  // }

  toggleTodo(val, title) {
    this.setState({
      loading: true
    })

    AsyncStorage.getItem("myTodos") 
      
      .then((todos) => {
        var oldTodos = JSON.parse(todos);
        var oldTodoData = this.findTodo(oldTodos, title);
        var oldTodo = oldTodoData.todo || {};

        var newTodo = {
          title: oldTodo.title,
          description: oldTodo.description,
          completed: val
        };

        oldTodos[oldTodoData.index] = newTodo;
        var newTodos = oldTodos;

        newTodos = JSON.stringify(newTodos);

        AsyncStorage.setItem("myTodos", newTodos);

        this.setState({
          loading: false,
          todo: newTodo
        })

        this.props.navigation.state.params.refresherFunc(newTodos);
      });

  }

  editTodo(title, description) {
    const { navigate } = this.props.navigation;
    navigate('Edit_Todo', {
      title, description
    });
  }

  delTodo(title) {
    // AsyncStorage.removeItem(title);
  }

  componentWillMount () {
    let title = this.props.navigation.state.params.todo.title,
        description = this.props.navigation.state.params.todo.description,
        completed = this.props.navigation.state.params.todo.completed;

    this.setState({
      todo: {title, description, completed}
    });
  }

  render() {

      return (
        <View style={styles.container}>
          <View style={styles.completed}>
            <Text style={{fontSize: 15, width: Dimensions.get('window').width * 0.78}}>Completed</Text>
            <Switch	
              style={{alignSelf: 'flex-end'}}
              value={this.state.todo.completed}
              onValueChange={(val) => this.toggleTodo(val, this.state.todo.title)}		
            />
          </View>

          <View style={styles.desc}>
            <Text style={[styles.bold, styles.text, styles.uniqColor]}>Description:</Text>
            <Text style={styles.text}>{this.state.todo.description ? this.state.todo.description : "N/A"}</Text>
          </View>
          

          <View>
            <Button title="Edit" color="silver" onPress={() => this.editTodo(this.state.todo.title, this.state.todo.description)}/>
            <Button title="Delete" color="red" onPress={() => this.delTodo(this.state.todo.title)}/>
          </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#34495e',
  },
  
  completed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#3e3e3e'
  },
  
  desc: {
    padding: 10
  },
  
  bold: {
    fontWeight: 'bold'
  },
  
  text: {
    color: 'white',
    padding: 5,
    fontSize: 17
  },
  
  uniqColor: {
    color: 'moccasin'
  }
});
