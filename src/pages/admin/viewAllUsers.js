import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import styles from '../../css/styles';

class ViewUser extends Component {

  static navigationOptions =
  {
     title: 'List of Users',
  };
  
  constructor(props) { 
    super(props);
    this.state = {
      isLoading: true
    }
  }

  /*componentDidMount() {
    
    return fetch('http://192.168.49.185/skinskan/viewUser.php')
    .then((response) => response.json())
    .then((responseJson) => {
       this.setState({
         isLoading: false,
          dataSource: responseJson
       }, function() {
          });
    })
    .catch((error) => {
      console.error(error);
    });
  }*/
  
  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: 1,
        width: "100%",
        backgroundColor: "#607D8B",}}
      />
    );
  }

  GetStudentIDFunction=(username,email)=>{
    this.props.navigation.navigate('Third', { 
      username : username,
      email : email,
    });
  }
   
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
   
    return (
      <View style={styles.ViewContainer}>
        <FlatList
          data={ this.state.dataSource }
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={ ({item: rowData}) => 
            <Text style={styles.FlatListItemStyle}
              onPress={this.GetStudentIDFunction.bind(this, rowData.username,rowData.email,)}>{rowData.username} 
            </Text> }
          />
      </View>
      );
  }
}

export default ViewUser;