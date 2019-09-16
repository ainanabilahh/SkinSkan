import React, { Component } from 'react';
import { View, ScrollView, Text, Styl } from 'react-native';
import { Button, RadioButton, Avatar, Divider, List } from 'react-native-paper';
import { CheckBox, ButtonGroup } from 'react-native-elements';
import styles from '../css/styles';
import { Alert } from 'react-native';

class Skin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            skintype: false,
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
        }
    }


    Check2 = () => {
        if (this.state.paraben == true)
            Alert.alert("paraben")
        console.log(this.state.sulfate)
        console.log(this.state.alcohol)
        console.log(this.state.silicone)
        console.log(this.state.allergen)
        console.log(this.state.fungal)
    };

    render() {

        const { skintype } = this.state;
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
                                <RadioButton value="Dry" color="#2289dc" />
                                <Text style={styles.radioButtonStyle}> Dry Skin</Text>
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton value="Normal" color="#2289dc" />
                                <Text style={styles.radioButtonStyle}> Normal Skin</Text>
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton value="Combination" color="#2289dc" />
                                <Text style={styles.radioButtonStyle}> Combination Skin</Text>
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton value="Oily" color="#2289dc" />
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
                <Button style={styles.button} mode="contained" icon="check" onPress={this.Check2}>Submit</Button>
            </ScrollView >
        );
    }
}

export default Skin;

