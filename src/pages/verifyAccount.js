import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import styles from '../css/styles';

class VerifyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: null,
            isVisible: true
        }
    }

    componentDidMount() {

        fetch('http://192.168.49.185/skinskan/verifyAccount.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                alert(responseJson.message);

            }).catch((error) => {
                alert("There is a network error. Please try again.")
                console.log(error);
            });
        this.props.navigation.navigate('ViewUser')
    }

    render() {
        return (
            <Overlay height={200} isVisible={this.state.isVisible}>
                <View style={styles.MainContainer}>
                    <Text style={{ paddingBottom: 50 }}>Please wait a moment.</Text>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"
                    />
                </View>
            </Overlay>
        );
    }
}

export default VerifyAccount;