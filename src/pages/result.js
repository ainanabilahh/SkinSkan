import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView, TextInput, Alert, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../css/styles';
import { Button, ActivityIndicator, List } from 'react-native-paper';
import { Overlay } from 'react-native-elements';

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            ingredients: '',
            result: null,
        }
    }

    componentDidUpdate() {

        if (this.props.navigation.state.params.result !== this.state.result) {
            this.setState({ result: this.props.navigation.state.params.result })
        }
    }

    render() {

        if (!this.state.result) {
            return (
                <View style={styles.MainContainer}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"
                    />
                </View>
            );
        }

        return (
            <View style={styles.MainContainer}>
                <Text>{this.state.result}</Text>
            </View>
        );
    }
}

export default (Result);