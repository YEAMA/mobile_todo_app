import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Todos from './app/components/todos';
import Single_Todo from './app/components/single_todo';
import Create_Todo from './app/components/create_todo'; 

const Screens = StackNavigator({
    Todos: { screen: Todos },
    Single_Todo: { 
      screen: Single_Todo, 
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
      })},
    Create_Todo: {
      screen: Create_Todo
    }
  });

export default class App extends Component {
  constructor () {
    super();
  }

  componentDidMount() {
    // const data = JSON.stringify([
    //   {title: "test", description: "text description", completed: false},
    //   {title: "test 2", completed: true},
    //   {title: "test 3", description: "test desciption for number threeeeeeee", completed: true}
    // ]);

    // AsyncStorage.setItem("myTodos", data);

  }
  
  render() {
    return (
      <View style={styles.screen}>
        <Screens />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  screen: {
    backgroundColor: '#34495e',  //'#34495e'
    height: Dimensions.get('window').height
  }
});
