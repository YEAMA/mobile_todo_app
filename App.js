import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Todos from './app/components/todos';

const Screens = StackNavigator({
    Todos: { screen: Todos }
  });

export default class App extends Component {
  constructor () {
    super();
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
    backgroundColor: '#34495e',
    height: Dimensions.get('window').height
  }
});
