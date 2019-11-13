import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, List, RadioButton } from 'react-native-paper';
import styles from '../css/styles';

class SkinQuiz extends Component {

    constructor(props) {
        super(props)
        this.state = {
            one: null,
            two: null,
            three: null,
            four: null,
            five: null,
            current: 0,
            skin: null,
            skinDesc: null,
        }
    }

    startQuiz = () => {
        this.setState({ current: this.state.current + 1 })
    }

    nextPage = () => {
        switch (this.state.current) {

            case 1:
                if (this.state.one == null) {
                    alert("Please choose one before proceed");
                }
                else {
                    this.setState({ current: this.state.current + 1 })
                    this.props.navigation.navigate('SkinQuiz', {
                        current: this.state.current,
                    });
                }
                break;

            case 2:
                if (this.state.two == null)
                    alert("Please choose one before proceed");
                else {
                    this.setState({ current: this.state.current + 1 })
                    this.props.navigation.navigate('SkinQuiz', {
                        current: this.state.current,
                    });
                }
                break;

            case 3:
                if (this.state.three == null)
                    alert("Please choose one before proceed");
                else {
                    this.setState({ current: this.state.current + 1 })
                    this.props.navigation.navigate('SkinQuiz', {
                        current: this.state.current,
                    });
                }
                break;

            case 4:
                if (this.state.four == null)
                    alert("Please choose one before proceed");
                else {
                    this.setState({ current: this.state.current + 1 })
                    this.props.navigation.navigate('SkinQuiz', {
                        current: this.state.current,
                    });
                }
                break;
            case 5:
                if (this.state.five == null)
                    alert("Please choose one before proceed");
                else {
                    this.setState({ current: this.state.current + 1 })
                    this.props.navigation.navigate('SkinQuiz', {
                        current: this.state.current,
                    });
                }
                break;
        }
    }

    determineSkin = () => {

        let normal = 0;
        let dry = 0;
        let sensitive = 0;
        let combination = 0;
        let oily = 0;

        switch (this.state.one) {
            case '1':
                normal++
                break;
            case '2':
                dry++
                break;
            case '3':
                sensitive++
                break;
            case '4':
                combination++
                break;
            case '5':
                oily++
                break;
        }

        switch (this.state.two) {
            case '1':
                normal++
                break;
            case '2':
                dry++
                break;
            case '3':
                sensitive++
                break;
            case '4':
                combination++
                break;
            case '5':
                oily++
                break;
        }

        switch (this.state.three) {
            case '1':
                normal++
                break;
            case '2':
                dry++
                break;
            case '3':
                sensitive++
                break;
            case '4':
                combination++
                break;
            case '5':
                oily++
                break;
        }

        switch (this.state.four) {
            case '1':
                normal++
                break;
            case '2':
                dry++
                break;
            case '3':
                sensitive++
                break;
            case '4':
                combination++
                break;
            case '5':
                oily++
                break;
        }

        switch (this.state.five) {
            case '1':
                normal++
                break;
            case '2':
                dry++
                break;
            case '3':
                sensitive++
                break;
            case '4':
                combination++
                break;
            case '5':
                oily++
                break;
        }

        var objects = [{
            name: 'Normal Skin',
            val: normal,
            desc: "Little, barely visible pores. Rare breakouts and radiant skin complexion."
        },
        {
            name: 'Dry Skin',
            val: dry,
            desc: "Almost no pores and more visible lines. Skin feels rough and tight. Slightly dull complexion."
        },
        {
            name: 'Sensitive Skin',
            val: sensitive,
            desc: "Red, dry and itchy skin which reacts easily to products and changes in environment."
        },
        {
            name: 'Combination Skin',
            val: combination,
            desc: "Oily T-zone and dry in some areas. Shiny skin with slightly larger pores and have blackheads."
        },
        {
            name: 'Oily Skin',
            val: oily,
            desc: "Large pores, pimples, blackheads and frequent breakouts. Dull or shiny skin."
        }];

        var maximum = objects.reduce(function (obj1, obj2) {
            return (obj1.val > obj2.val) ? obj1 : obj2;
        });

        this.setState({ skin: maximum.name })
        this.setState({ skinDesc: maximum.desc })
        this.setState({ current: this.state.current + 1 })
        this.props.navigation.navigate('SkinQuiz', {
            current: this.state.current,
            skin: this.state.skin,
            skinDesc: this.state.skinDesc,
        });
    }

    backCurrent = () => {
        this.setState({ current: this.state.current - 1 })
        this.props.navigation.navigate('SkinQuiz', {
            current: this.state.current,
        });
    }

    back = () => {

        this.setState({ current: 0 })

        this.setState({
            one: null,
            two: null,
            three: null,
            four: null,
            five: null,
            current: 0,
            skin: null,
            skinDesc: null,
        });

        this.props.navigation.navigate('SkinQuiz', {
            current: this.state.current,
        });
    }

    render() {

        if (this.state.current == 0) {
            return (
                <View style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 30, textAlign: 'center', margin: 10 }}> Take this quiz to find your skin type suggestion!</Text>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, textAlign: 'center', margin: 30, color: 'red' }}> *For more accurate result, {"\n"} please seek dermatologist.</Text>
                    <Button style={[styles.button, { width: 200 }]} mode="contained" icon="arrow-forward" onPress={this.startQuiz}>Start</Button>
                </View>
            );
        }

        if (this.state.current == 1) {
            return (
                <ScrollView style={{ backgroundColor: '#efefef' }} >
                    <List.Section style={{ backgroundColor: '#fff' }}>
                        <Text style={{ textAlign: 'center', backgroundColor: '#efefef', paddingBottom: 20 }}> 1/5</Text>
                        <List.Subheader style={{ backgroundColor: '#efefef' }}>1. How would you describe the shine on you skin?</List.Subheader>
                        <RadioButton.Group
                            onValueChange={value => this.setState({ one: value })}
                            value={this.state.one}
                        >
                            <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="1" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Not too shine, not too dull {/*Normal*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="2" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Dull everywhere {/*Dry*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="3" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> I get more stinging than shine. {/*Sensitive*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="4" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Shiny in my T-zone, but dull on my cheeks {/*Combination*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="5" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Bright like a diamond {/*Oily*/}</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </List.Section>
                    <Button style={styles.button} mode="contained" icon="arrow-forward" onPress={this.nextPage}>Next</Button>
                    <Button style={styles.button} mode="contained" icon="arrow-back" onPress={this.backCurrent}>Back</Button>
                </ScrollView >
            );
        }

        if (this.state.current == 2) {
            return (
                <ScrollView style={{ backgroundColor: '#efefef' }} >
                    <List.Section style={{ backgroundColor: '#fff' }}>
                        <Text style={{ textAlign: 'center', backgroundColor: '#efefef', paddingBottom: 20 }}> 2/5</Text>
                        <List.Subheader style={{ backgroundColor: '#efefef' }}>2. Which most closely describes the look of your pores?</List.Subheader>
                        <RadioButton.Group
                            onValueChange={value => this.setState({ two: value })}
                            value={this.state.two}
                        >
                            <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="1" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Seems unnoticeable {/*Normal*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="2" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Small, not easily noticed all over {/*Dry*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="3" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Medium-sized all over {/*Sensitive*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="4" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Larger or medium and only visible in the T-zone {/*Combination*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="5" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Large and visible all over {/*Oily*/}</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </List.Section>
                    <Button style={styles.button} mode="contained" icon="arrow-forward" onPress={this.nextPage}>Next</Button>
                    <Button style={styles.button} mode="contained" icon="arrow-back" onPress={this.backCurrent}>Back</Button>
                </ScrollView >
            );
        }

        if (this.state.current == 3) {
            return (
                <ScrollView style={{ backgroundColor: '#efefef' }} >
                    <List.Section style={{ backgroundColor: '#fff' }}>
                        <Text style={{ textAlign: 'center', backgroundColor: '#efefef', paddingBottom: 20 }}> 3/5</Text>
                        <List.Subheader style={{ backgroundColor: '#efefef' }}>3. How does it feel when you touch your skin?</List.Subheader>
                        <RadioButton.Group
                            onValueChange={value => this.setState({ three: value })}
                            value={this.state.three}
                        >
                            <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="1" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Feels nothing {/*Normal*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="2" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Rough and scaly {/*Dry*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="3" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Irritated and angry {/*Sensitive*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="4" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Oily in places and dry in others {/*Combination*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="5" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Slick and greasy {/*Oily*/}</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </List.Section>
                    <Button style={styles.button} mode="contained" icon="arrow-forward" onPress={this.nextPage}>Next</Button>
                    <Button style={styles.button} mode="contained" icon="arrow-back" onPress={this.backCurrent}>Back</Button>
                </ScrollView >
            );
        }

        if (this.state.current == 4) {
            return (
                <ScrollView style={{ backgroundColor: '#efefef' }} >
                    <List.Section style={{ backgroundColor: '#fff' }}>
                        <Text style={{ textAlign: 'center', backgroundColor: '#efefef', paddingBottom: 20 }}> 4/5</Text>
                        <List.Subheader style={{ backgroundColor: '#efefef' }}>4. How does your skin feel after you wash your face?</List.Subheader>
                        <RadioButton.Group
                            onValueChange={value => this.setState({ four: value })}
                            value={this.state.four}
                        >
                            <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="1" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Feels clean {/*Normal*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="2" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Stripped of moisture {/*Dry*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="3" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Itchy and a little bit dry {/*Sensitive*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="4" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Clean and great in my T-zone,  {"\n"} but my cheeks are a little bit dried out {/*Combination*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="5" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Clean, for now, but the oil is coming soon {/*Oily*/}</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </List.Section>
                    <Button style={styles.button} mode="contained" icon="arrow-forward" onPress={this.nextPage}>Next</Button>
                    <Button style={styles.button} mode="contained" icon="arrow-back" onPress={this.backCurrent}>Back</Button>
                </ScrollView >
            );
        }

        if (this.state.current == 5) {
            return (
                <ScrollView style={{ backgroundColor: '#efefef' }} >
                    <List.Section style={{ backgroundColor: '#fff' }}>
                        <Text style={{ textAlign: 'center', backgroundColor: '#efefef', paddingBottom: 20 }}> 5/5</Text>
                        <List.Subheader style={{ backgroundColor: '#efefef' }}>5. In the afternoon, what your skin need the most?</List.Subheader>
                        <RadioButton.Group
                            onValueChange={value => this.setState({ five: value })}
                            value={this.state.five}
                        >
                            <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="1" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> I need nothing {/*Normal*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="2" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Moisturizing, moisturizing, moisturizing {/*Dry*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="3" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> A refreshing spritz of facial spray. {/*Sensitive*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="4" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Blotting or powdering on the forehead,{"\n"} nose, and or chin {/*Combination*/}</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton value="5" color="#2289dc" />
                                    <Text style={styles.radioButtonStyle}> Blotting or powder all over {/*Oily*/}</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </List.Section>
                    <Button style={styles.button} mode="contained" icon="arrow-forward" onPress={this.determineSkin}>Next</Button>
                    <Button style={styles.button} mode="contained" icon="arrow-back" onPress={this.backCurrent}>Back</Button>
                </ScrollView >
            );
        }

        if (this.state.current == 6) {
            return (
                <View style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20, textAlign: 'center', margin: 10 }}> You got</Text>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 40, textAlign: 'center', margin: 10 }}>{this.state.skin}</Text>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, textAlign: 'center', margin: 30 }}>{this.state.skinDesc}</Text>
                    <Button style={[styles.button, { width: 200 }]} mode="contained" icon="arrow-back" onPress={this.back}>Back</Button>
                </View >
            );
        }
    }
}
export default (SkinQuiz);

