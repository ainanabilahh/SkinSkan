import React, { Component } from 'react';
import { TextInput, Alert, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../css/styles';
import { Button } from 'react-native-paper';

class Ingredients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            ingredients: ''
        }
    }

    ListofIngredients = () => {

        fetch('http://192.168.49.185/skinskan/scan.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                ingredients: this.state.ingredients
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                Alert.alert(responseJson);

            }).catch((error) => {
                console.error(error);
            });
    }


    render() {

        return (
            <View style={styles.MainContainer}>
                <StatusBar backgroundColor="#512DA8" barStyle="light-content" />
                <TextInput
                    mode="flat"
                    multiline
                    numberOfLines={20}
                    maxLength={1000}
                    value={this.state.ingredients}
                    onChangeText={ingredients => this.setState({ ingredients })}
                    style={styles.inputBoxMultiLine}
                />
                <Button style={styles.button} mode="contained" icon="check" onPress={this.ListofIngredients}>Confirm</Button>
            </View >
        );

    }
}

export default (Ingredients);