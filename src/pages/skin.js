import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Button, Dialog, List, Portal, Provider, RadioButton } from 'react-native-paper';
import styles from '../css/styles';

class Skin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            ing_eff: null,
            prod_pref: null,
            paraben: false,
            sulfate: false,
            alcohol: false,
            silicone: false,
            allergen: false,
            fungal: false,
            antiaging: false,
            woundhealing: false,
            acnefight: false,
            brightening: false,
            uvprotect: false,
            value: '',
            skin_input: 0,
            visible: false,
            color: null,
            response: null,
            alert: null,
        }
    }

    async componentDidMount() {

        username = await AsyncStorage.getItem('username');

        fetch('https://www.skinskan.me/viewSkin.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    value: responseJson.skin_type,
                    ing_eff: responseJson.ing_eff,
                    prod_pref: responseJson.prod_pref,
                    skin_input: responseJson.skin_input
                })

                if (this.state.ing_eff == null)
                    ing_eff = []
                else
                    ing_eff = this.state.ing_eff

                if (this.state.prod_pref == null)
                    prod_pref = []
                else
                    prod_pref = this.state.prod_pref

                for (i = 0; i < ing_eff.length; i++) {
                    if (ing_eff[i].includes("1"))
                        this.setState({ antiaging: true })
                    if (ing_eff[i].includes("2"))
                        this.setState({ woundhealing: true })
                    if (ing_eff.includes("3"))
                        this.setState({ acnefight: true })
                    if (ing_eff.includes("4"))
                        this.setState({ brightening: true })
                    if (ing_eff.includes("5"))
                        this.setState({ uvprotect: true })
                }

                for (i = 0; i < prod_pref.length; i++) {
                    if (prod_pref.includes("1"))
                        this.setState({ paraben: true })
                    if (prod_pref.includes("2"))
                        this.setState({ sulfate: true })
                    if (prod_pref.includes("3"))
                        this.setState({ alcohol: true })
                    if (prod_pref.includes("4"))
                        this.setState({ silicone: true })
                    if (prod_pref.includes("5"))
                        this.setState({ allergen: true })
                    if (prod_pref.includes("6"))
                        this.setState({ fungal: true })
                }
            }).catch((err) => {
                alert("There is a network error. Please try again.")
                if (err.name == 'AbortError') return
                throw err
            });
    }

    _refreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.componentDidMount()} />
        )
    }

    InsertSkinPreferences = () => {

        const ing_eff = [];
        const prod_pref = [];

        if (this.state.antiaging)
            ing_eff.push("1")
        if (this.state.woundhealing)
            ing_eff.push("2")
        if (this.state.acnefight)
            ing_eff.push("3")
        if (this.state.brightening)
            ing_eff.push("4")
        if (this.state.uvprotect)
            ing_eff.push("5")

        if (this.state.paraben == true)
            prod_pref.push("1")
        if (this.state.sulfate == true)
            prod_pref.push("2")
        if (this.state.alcohol == true)
            prod_pref.push("3")
        if (this.state.silicone == true)
            prod_pref.push("4")
        if (this.state.allergen == true)
            prod_pref.push("5")
        if (this.state.fungal == true)
            prod_pref.push("6")

        if (this.state.value == null)
            this.setState({
                alert: 'Error',
                visible: true,
                color: '#E22E16',
                response: 'Please answer question number 1.'
            });
        else if (ing_eff.length == 0)
            this.setState({
                alert: 'Error',
                visible: true,
                color: '#E22E16',
                response: 'Please answer question number 2.'
            });
        else if (prod_pref.length == 0)
            this.setState({
                alert: 'Error',
                visible: true,
                color: '#E22E16',
                response: 'Please answer question number 3.'
            });
        else {
            fetch('https://www.skinskan.me/updateSkin.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    skin_type: this.state.value,
                    prod_pref: prod_pref,
                    ing_eff: ing_eff
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)

                    if (responseJson == "Your product preferences has been updated. Please swipe down to refresh.") {
                        this.setState({
                            alert: 'Success',
                            color: '#5CA51C',
                            response: responseJson,
                            visible: true
                        });
                    }
                    else {
                        this.setState({
                            alert: 'Error',
                            color: '#E22E16',
                            response: responseJson,
                            visible: true
                        });
                    }
                }).catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {

        const { paraben, sulfate, alcohol, allergen, fungal, silicone } = this.state;
        const { antiaging, woundhealing, acnefight, brightening, uvprotect } = this.state;

        return (
            <Provider>
                <Portal>
                    <Dialog
                        style={{ borderRadius: 10, }}
                        visible={this.state.visible}
                        onDismiss={() => this.setState({ visible: false })}
                        dismissable={true}>
                        <Dialog.Title style={{ fontFamily: 'Proxima Nova Bold', color: this.state.color }}>{this.state.alert}</Dialog.Title>
                        <Dialog.Content>
                            <Text style={{ fontFamily: 'ProximaNova-Regular' }}>{this.state.response}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => { this.props.navigation.navigate("Scan"); this.setState({ visible: false }) }}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <ScrollView style={{ backgroundColor: '#F5F5F5' }} refreshControl={this._refreshControl()}>
                    {/* {(this.state.skin_input == 0) ? (
                    <TouchableOpacity onPress={this.Skip}>
                        <Text style={[styles.footerButton, { color: 'black', textAlign: 'right', marginTop: 10, marginHorizontal: 15 }]}>SKIP?</Text>
                    </TouchableOpacity>) : (null)} */}
                    <List.Section style={{ backgroundColor: '#fff' }}>
                        <List.Subheader style={styles.listSubheaderStyle}>1. WHAT IS YOUR SKIN TYPE?</List.Subheader>
                        <RadioButton.Group
                            onValueChange={value => this.setState({ value })}
                            value={this.state.value}
                        >
                            <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                                {/* <View style={styles.radioButtonContainer}>
                                <RadioButton value="6" color="#8a4de8" />
                                <Text style={styles.radioButtonStyle}> I don't know</Text>
                            </View> */}
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="1" color="#8a4de8" />
                                    <Text style={styles.radioButtonStyle}> Normal Skin</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="2" color="#8a4de8" />
                                    <Text style={styles.radioButtonStyle}> Dry Skin</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="3" color="#8a4de8" />
                                    <Text style={styles.radioButtonStyle}> Sensitive Skin</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="4" color="#8a4de8" />
                                    <Text style={styles.radioButtonStyle}> Combination Skin</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="5" color="#8a4de8" />
                                    <Text style={styles.radioButtonStyle}> Oily Skin</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                        <List.Subheader style={styles.listSubheaderStyle}>2. WHAT KIND OF PRODUCT DO YOU SEEK?</List.Subheader>
                        <View>
                            <CheckBox
                                title='Anti-Aging'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.antiaging}
                                onPress={() => { this.setState({ antiaging: !antiaging }); }}
                            />
                            <CheckBox
                                title='Promotes Wound Healing'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.woundhealing}
                                onPress={() => { this.setState({ woundhealing: !woundhealing }); }}
                            />
                            <CheckBox
                                title='Acne-Fighting'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.acnefight}
                                onPress={() => { this.setState({ acnefight: !acnefight }); }}
                            />
                            <CheckBox
                                title='Brightening'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.brightening}
                                onPress={() => { this.setState({ brightening: !brightening }); }}
                            />
                            <CheckBox
                                title='UV Protection'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.uvprotect}
                                onPress={() => { this.setState({ uvprotect: !uvprotect }); }}
                            />
                        </View>
                        <List.Subheader style={styles.listSubheaderStyle}>3. WHAT INGREDIENTS YOU WANT TO AVOID?</List.Subheader>
                        <View>
                            <CheckBox
                                title='Paraben-Free'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.paraben}
                                onPress={() => { this.setState({ paraben: !paraben }); }}
                            />
                            <CheckBox
                                title='Sulfate-Free'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.sulfate}
                                onPress={() => { this.setState({ sulfate: !sulfate }); }}
                            />
                            <CheckBox
                                title='Alcohol-Free'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.alcohol}
                                onPress={() => { this.setState({ alcohol: !alcohol }); }}
                            />
                            <CheckBox
                                title='Silicone-Free'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.silicone}
                                onPress={() => { this.setState({ silicone: !silicone }); }}
                            />
                            <CheckBox
                                title='Allergen-Free'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.allergen}
                                onPress={() => { this.setState({ allergen: !allergen }); }}
                            />
                            <CheckBox
                                title='Fungal Acne Safe'
                                checkedColor='#8a4de8'
                                containerStyle={styles.checkBoxContainer}
                                checked={this.state.fungal}
                                onPress={() => { this.setState({ fungal: !fungal }); }}
                            />
                        </View>
                    </List.Section>
                    <View
                        style={styles.buttonContainer}>
                        <Button
                            style={styles.button}
                            mode="contained"
                            icon="check"
                            onPress={this.InsertSkinPreferences}>Submit
                        </Button>
                    </View>
                </ScrollView >
            </Provider>
        );
    }
}

export default Skin;

