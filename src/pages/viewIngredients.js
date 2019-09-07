import React, { Component } from 'react';
import { BackHandler, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../css/styles';

class ViewIngredients extends Component {

render() {
    const { memoStore } = this.props.store;
    const index = this.props.navigation.getParam('otherParam', 1);
    const header = memoStore.memoArray[index].name;
    let shareOptions = {
      title: 'React Native',
      message: memoStore.memoArray[index].content,
      social: Share.Social,
    };
    return (
      <Container style={styles.container}>
        <Content>
        <Text>{memoStore.memoArray[index].content}</Text>
        </Content>
      </Container>
    );
  }
}

export default inject('store')(observer(ViewIngredients));