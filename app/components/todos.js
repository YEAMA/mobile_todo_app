import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class Todos extends Component {

  static navigationOptions = {
    title: 'My Todos',
  };

  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={() => navigate('Home', { name: 'Jane' })} >Todos Component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'moccasin'
  },
});
