import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { Button, List, Chip } from 'react-native-paper';
import styles from '../css/styles';

class Ingredients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            ingredients: '',
            ing: [],
            notes: [],
            ingY: [],
            ingArr: [],
            result: null,
        },
            ingredientsArr = []
    }

    ListofIngredients = () => {

        //username = await AsyncStorage.getItem('username') || 'undefined';

        this.props.navigation.navigate('Result', {
            ing: this.state.ing,
            notes: this.state.notes
        });

        fetch('https://www.skinskan.me/scan.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                username: "ainoarikaa",
                ingredients: this.state.ingredients
            })

        }).then((response) => response.text())
            .then((responseJson) => {

                var result = JSON.parse(responseJson)
                this.setState({ ing: result.Ingredients })
                this.setState({ notes: result.Notes })
                console.log(this.state.notes)
                this.props.navigation.navigate('Result', {
                    ing: this.state.ing,
                    notes: this.state.notes
                });

            }).catch((error) => {
                alert("There is a network error. Please try again.")
                console.log(error);
            });
    }

    Chip = () => {
        this.state.ingredients = this.state.ingredients.replace(/ *\([^)]*\) */g, "");
        this.state.ingredients = this.state.ingredients.split(", ");
        ingredientsArr = this.state.ingredients
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

                <Button style={styles.button} mode="contained" icon="check" onPress={this.Chip}>Test</Button>
                <Button style={styles.button} mode="contained" icon="check" onPress={this.ListofIngredients}>Proceed</Button>
            </ScrollView>
        );
    }
}

export default (Ingredients);