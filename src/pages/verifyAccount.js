import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator, Button, Dialog, Portal, Provider } from 'react-native-paper';
import styles from '../css/styles';


class VerifyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: null,
            isVisible: true,
            visible: false,
            color: null,
            response: null,
            alert: null,
        }
    }

    componentDidMount() {

        fetch('https://www.skinskan.me/verifyAccount.php', {
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
                if (responseJson.message == "Please check your email.")
                    this.setState({
                        alert: 'Success',
                        color: '#5CA51C',
                        response: responseJson.message,
                        visible: true
                    });
                else
                    this.setState({
                        alert: 'Error',
                        color: '#E22E16',
                        response: responseJson.message,
                        visible: true,
                    });
            }).catch((error) => {
                alert("There is a network error. Please try again.")
                console.log(error);
            });
        this.props.navigation.navigate('ViewUser')
    }

    render() {
        return (

            <Overlay height={200} overlayStyle={{ borderRadius: 10 }} isVisible={this.state.isVisible}>
                <Provider>
                    <Portal>
                        <Dialog
                            style={{ borderRadius: 10 }}
                            visible={this.state.visible}
                            onDismiss={() => this.setState({ visible: false })}
                            dismissable={true}>
                            <Dialog.Title style={{ fontFamily: 'Proxima Nova Bold', color: this.state.color }}>{this.state.alert}</Dialog.Title>
                            <Dialog.Content>
                                <Text style={{ fontFamily: 'ProximaNova-Regular' }}>{this.state.response}</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => this.setState({ visible: false })}>Ok</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <View>
                        <Text style={{ paddingTop: 20, textAlign: "center", fontFamily: 'ProximaNova-Regular' }}>This will take a moment.</Text>
                        <ActivityIndicator
                            animating={true}
                            style={styles.indicator}
                            size="large"
                        />
                    </View>
                </Provider>
            </Overlay>
        );
    }
}

export default VerifyAccount;