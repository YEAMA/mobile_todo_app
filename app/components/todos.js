import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ListView, TouchableHighlight, AsyncStorage, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Todos extends Component {
  constructor (props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });	
    this.state = {
      todoDataSource: ds,
      todos: {}
    }

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const {navigate} = navigation;
    return {
      title: 'My Todos',
      headerRight: (
        <Button title="+ New Todo" onPress={() => navigate('Create_Todo')}
        />
      ),
    };
  };

  getTodos() {
    AsyncStorage.getItem('myTodos')
      .then((response) => {
        this.setState({
          todoDataSource: this.state.todoDataSource.cloneWithRows(JSON.parse(response)),
          todos: JSON.parse(response)
        });
      });
  }

  addNewTodo() {
    const { navigate } = this.props.navigation;
    navigate('Create_Todo');
  }

  pressRow(todo) {
    const { navigate } = this.props.navigation;
    navigate('Single_Todo', {
      todo, 
      refresherFunc: this.refresherFunc.bind(this)
    });
  }

  refresherFunc(input) {
    this.setState({
      todoDataSource: this.state.todoDataSource.cloneWithRows(JSON.parse(input)),
      todos: JSON.parse(input)
    });
  }

  renderRow(todo, sectionId, rowId, highlightRow) {
    let checkIcon = (<Icon name="check" size={15} color="white"/>);
    !todo.completed ? checkIcon = null : checkIcon = checkIcon;

    return (
      <TouchableHighlight
        onPress={() => { 
          this.pressRow(todo)
          }}
        underlayColor = 'white'>
        <View style={styles.listItem}>
          <View style={styles.start}>
            {checkIcon}
          </View>
          <View style={styles.middle}>
             <Text style={{fontSize: 15, color: '#3498db'}}>{todo.title}</Text> 
             <Text style={{fontSize: 12, color: '#7f8c8d'}}>{todo.description ? todo.description : "N/A"}</Text>
          </View>
          
          <View style={styles.last}>
            <Icon name="chevron-right" size={15} color="moccasin"/>
          </View>
          
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
        <View style={styles.container}>
          <ListView 
            dataSource={this.state.todoDataSource} 
            renderRow={this.renderRow}
          />
        </View>
    );
  }

  componentDidMount() {
    this.getTodos();
  }
}


const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#34495e',
  },

  text: {
    color: 'moccasin'
  },

  listItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: 'silver',
    margin: 0,
    backgroundColor: '#34495e',
  },

  start: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.1
  },
  
  middle: {
    flexWrap: "wrap",
    width: Dimensions.get('window').width * 0.75,
    paddingRight: 10
  },
  
  last: {
    width: Dimensions.get('window').width * 0.15,
    alignSelf: 'center',
  }
});



// const { navigate } = this.props.navigation;
    
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text} onPress={() => navigate('Home', { name: 'Jane' })} >Todos Component</Text>
//       </View>
//     );