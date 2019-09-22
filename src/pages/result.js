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
            isVisible: true
        }
    }

    componentDidUpdate() {

        if (this.props.navigation.state.params.result !== this.state.result) {
            this.setState({ result: this.props.navigation.state.params.result })
        }
    }

    Back = () => {
        this.props.navigation.navigate('Ingredients');
    }

    render() {

        if (!this.state.result) {
            return (
                <Overlay height={200} isVisible={this.state.isVisible}>
                    <View style={styles.MainContainer}>
                        <Text style={{ paddingBottom: 50 }}>This will take just a short while.</Text>
                        <ActivityIndicator
                            animating={true}
                            style={styles.indicator}
                            size="large"
                        />
                    </View>
                </Overlay>
            );
        }

        return (
            <ScrollView style={{ backgroundColor: '#efefef' }}>
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>YOUR RESULT</List.Subheader>
                    <View style={[styles.MainContainer,{ paddingVertical: 100 }]}>
                        <Text style={[styles.usernameLabel, { fontSize: 50 }]}>{this.state.result}%</Text>
                        <Text style={styles.usernameLabel}>match with your skin preferences!</Text>
                    </View>
                </List.Section>
                <Button style={styles.button} mode="contained" icon="check" onPress={this.Back}>Back</Button>
            </ScrollView>

        );
    }
}

export default (Result);