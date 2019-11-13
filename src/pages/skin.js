import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Button, List, RadioButton } from 'react-native-paper';
import styles from '../css/styles';

class Skin extends Component {

    constructor(props) {
        super(props)
        this.state = {
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
        }
    }

    async componentDidMount() {

        username = await AsyncStorage.getItem('username') || 'undefined';

        fetch('http://178.128.121.52/viewSkin.php', {
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
                    prod_pref: responseJson.prod_pref
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

        fetch('http://178.128.121.52/updateSkin.php', {
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
                alert(responseJson);

            }).catch((error) => {
                console.error(error);
            });
        this.props.navigation.navigate("Homepage");

    }

    render() {

        const { paraben, sulfate, alcohol, allergen, fungal, silicone } = this.state;
        const { antiaging, woundhealing, acnefight, brightening, uvprotect } = this.state;

        return (

            <ScrollView style={{ backgroundColor: '#efefef' }} >
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>SKIN TYPE</List.Subheader>
                    <RadioButton.Group
                        onValueChange={value => this.setState({ value })}
                        value={this.state.value}
                    >
                        <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton value="6" color="#2289dc" />
                                <Text style={styles.radioButtonStyle}> I don't know</Text>
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton value="1" color="#2289dc" />
                                <Text style={styles.radioButtonStyle}> Normal Skin</Text>
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton value="2" color="#2289dc" />
                                <Text style={styles.radioButtonStyle}> Dry Skin</Text>
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton value="3" color="#2289dc" />
                                <Text style={styles.radioButtonStyle}> Sensitive Skin</Text>
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton value="4" color="#2289dc" />
                                <Text style={styles.radioButtonStyle}> Combination Skin</Text>
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton value="5" color="#2289dc" />
                                <Text style={styles.radioButtonStyle}> Oily Skin</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>INGREDIENTS EFFECTS</List.Subheader>
                    <View>
                        <CheckBox
                            title='Anti-Aging'
                            checked={this.state.antiaging}
                            onPress={() => { this.setState({ antiaging: !antiaging }); }}
                        />
                        <CheckBox
                            title='Promotes Wound Healing'
                            checked={this.state.woundhealing}
                            onPress={() => { this.setState({ woundhealing: !woundhealing }); }}
                        />
                        <CheckBox
                            title='Acne-Fighting'
                            checked={this.state.acnefight}
                            onPress={() => { this.setState({ acnefight: !acnefight }); }}
                        />
                        <CheckBox
                            title='Brightening'
                            checked={this.state.brightening}
                            onPress={() => { this.setState({ brightening: !brightening }); }}
                        />
                        <CheckBox
                            title='UV Protection'
                            checked={this.state.uvprotect}
                            onPress={() => { this.setState({ uvprotect: !uvprotect }); }}
                        />
                    </View>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>PRODUCT PREFERENCES</List.Subheader>
                    <View>
                        <CheckBox
                            title='Paraben-Free'
                            checked={this.state.paraben}
                            onPress={() => { this.setState({ paraben: !paraben }); }}
                        />
                        <CheckBox
                            title='Sulfate-Free'
                            checked={this.state.sulfate}
                            onPress={() => { this.setState({ sulfate: !sulfate }); }}
                        />
                        <CheckBox
                            title='Alcohol-Free'
                            checked={this.state.alcohol}
                            onPress={() => { this.setState({ alcohol: !alcohol }); }}
                        />
                        <CheckBox
                            title='Silicone-Free'
                            checked={this.state.silicone}
                            onPress={() => { this.setState({ silicone: !silicone }); }}
                        />
                        <CheckBox
                            title='Allergen-Free'
                            checked={this.state.allergen}
                            onPress={() => { this.setState({ allergen: !allergen }); }}
                        />
                        <CheckBox
                            title='Fungal Acne Safe'
                            checked={this.state.fungal}
                            onPress={() => { this.setState({ fungal: !fungal }); }}
                        />

                    </View>
                </List.Section>
                <Button style={styles.button} mode="contained" icon="check" onPress={this.InsertSkinPreferences}>Submit</Button>
            </ScrollView >
        );
    }
}

export default Skin;

