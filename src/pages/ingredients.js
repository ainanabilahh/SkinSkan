import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { Button, List } from 'react-native-paper';
import styles from '../css/styles';

class Ingredients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            ingredients: '',
            result: null,
        }
    }

    ListofIngredients = async () => {

        this.props.navigation.navigate('Result', { result: this.state.result })

        username = await AsyncStorage.getItem('username') || 'undefined';

        fetch('http://192.168.49.185/skinskan/scan.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                username: username,
                ingredients: this.state.ingredients
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({ result: responseJson })
                this.props.navigation.navigate('Result', { result: this.state.result })

            }).catch((error) => {
                console.error(error);
            });
    }

    ActivityIndicator = () => {

        return (<Text>Aina</Text>)
    }


    render() {
        return (
            <ScrollView style={{ backgroundColor: '#efefef' }}>
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>LIST OF INGREDIENTS</List.Subheader>
                    <Text style={{ margin: 15 }}>Please re-check the ingredients below before proceed.</Text>
                    <TextInput
                        mode="flat"
                        multiline
                        numberOfLines={20}
                        maxLength={1000}
                        value={this.state.ingredients}
                        onChangeText={ingredients => this.setState({ ingredients })}
                        style={styles.inputBoxMultiLine}
                    />
                </List.Section>
                <Button style={styles.button} mode="contained" icon="check" onPress={this.ListofIngredients}>Proceed</Button>
            </ScrollView>
        );
    }
}

export default (Ingredients);