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
            result: null,
        },
        ingredientsArr = []
    }

    ListofIngredients = async () => {

        this.props.navigation.navigate('Result', { result: this.state.result })

        username = await AsyncStorage.getItem('username') || 'undefined';

        fetch('http://127.0.0.1/skinskan/scan.php', {
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
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {ingredientsArr.map((ing,index) =>
                            <Chip key={index} mode="outlined">{ing}</Chip>
                        )}
                    </View>
                </List.Section>

                <Button style={styles.button} mode="contained" icon="check" onPress={this.Chip}>Test</Button>
                <Button style={styles.button} mode="contained" icon="check" onPress={this.ListofIngredients}>Proceed</Button>
            </ScrollView>
        );
    }
}

export default (Ingredients);