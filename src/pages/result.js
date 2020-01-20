import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator, Button, Chip, Divider, List } from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle';
import styles from '../css/styles';

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isVisible: true,
            // ingredients: '',
            // ing: null,
            notes: null,
            percent: null,
            skin: null,
            effects: null,
            ing_eff_string: null,
            prod_pref_string: null,
            skin_type_string: null,
            normal: false,
        }
    }

    componentDidUpdate() {

        // if (this.props.navigation.state.params.ing !== this.state.ing) {
        //     this.setState({ ing: this.props.navigation.state.params.ing })
        // }

        if (this.props.navigation.state.params.notes !== this.state.notes) {
            this.setState({ notes: this.props.navigation.state.params.notes })
        }

        if (this.props.navigation.state.params.effects !== this.state.effects) {
            this.setState({ effects: this.props.navigation.state.params.effects })
        }

        if (this.props.navigation.state.params.percent !== this.state.percent) {
            this.setState({ percent: this.props.navigation.state.params.percent })
        }

        if (this.props.navigation.state.params.skin !== this.state.skin) {
            this.setState({ skin: this.props.navigation.state.params.skin })
        }
    }

    componentDidMount() {

        username = this.props.navigation.state.params.username

        fetch('https://www.skinskan.me/viewSkinResult.php', {
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
                    skin_type_string: responseJson.skin_type,
                    ing_eff_string: responseJson.ing_eff,
                    prod_pref_string: responseJson.prod_pref
                })

                if (responseJson.skin_type == "Normal") {
                    this.setState({ normal: true })
                }

            }).catch((err) => {
                alert("There is a network error. Please try again.")
                if (err.name == 'AbortError') return
                throw err
            });
    }

    render() {

        prod = parseFloat(this.state.percent)
        prod = Math.round(this.state.percent)

        if (prod < 31)
            color = "#FF7344"
        else if (prod > 30 && prod < 61)
            color = "#FFE102"
        else if (prod > 60)
            color = "#95E819"

        if (!this.state.notes && !this.state.skin && !this.state.percent) {
            return (
                <Overlay height={220} isVisible={this.state.isVisible} overlayStyle={{ borderRadius: 20 }}>
                    <View>
                        <Text style={{ paddingTop: 20, textAlign: "center", fontFamily: 'ProximaNova-Regular' }}>This will take a while depends {"\n"} on your internet connection. {"\n"}Please do not close this window.</Text>
                        <ActivityIndicator
                            color="#8a4de8"
                            animating={true}
                            style={styles.indicator}
                            size="large"
                        />
                    </View>
                </Overlay>
            );
        }

        // var ingArr = this.state.ing

        // const ingredients = ingArr.map((item) => {
        //     ing = item.IngFound.split(", ")
        //     return ing
        // })

        // const i = ing.map((item, key) =>
        //     <Chip key={key} textStyle={{ fontSize: 9 }} mode="outlined">{item}</Chip>
        // )

        // const j = ingArr.map((item, key) => 
        //     <Text key={key} textStyle={{ fontSize: 11 }}>{item.IngNotFound}</Text>
        // )

        // var skin_type_string = this.state.skin_type_string + " Skin";

        // const skin =
        //     <List.Accordion
        //         title={skin_type_string}
        //     >
        //         <List.Item title="First item" />
        //         <List.Item title="Second item" />
        //     </List.Accordion>;

        var cond = true

        // SKIN TYPE SECTION
        let n = this.state.skin.map((item, key) =>
            <Text key={key} style={{ fontFamily: 'Proxima Nova Bold', fontSize: 16 }}>{item.GoodSkin} </Text>
        );

        let o = this.state.skin.map((item, key) =>
            <Text key={key} style={{ fontFamily: 'Proxima Nova Bold', fontSize: 16 }}>{item.BadSkin} </Text>
        );
        // END OF SKIN TYPE SECTION

        // INGREDIENT EFFECTS SECTION
        let a = this.state.ing_eff_string.map((item) => {
            a = item.split(", ");
            return a;
        })

        let m = this.state.effects.map((item) => {
            m = item.Ing
            return m;
        })

        // let n = m.map((item) => {
        //     n = item.split(", ")
        //     return n;
        // })

        let c = a.map((item, key) =>
            <List.Accordion
                key={key}
                titleStyle={{ fontSize: 14, fontFamily: 'ProximaNova-Regular' }}
                title={item}
                style={{ borderColor: '#ccc', borderRadius: 1 }}
            >
                <View>
                    {this.state.notes.map((itemN, keyN) =>
                        (itemN.Note == (item)) ?
                            (<Text
                                key={keyN}
                                style={{ fontFamily: 'ProximaNova-Regular', margin: 15 }}>
                                This product contains {itemN.Qty} ingredient(s) with {itemN.Note} effects
                                    </Text>)
                            : (null),
                    )}
                </View>

                {this.state.effects.map((itemE, keyE) =>
                    (itemE.Ing.map((itemI) =>
                        (itemE.Effect == (item)) ?
                            (<View style={{ alignSelf: 'baseline', marginBottom: 10, marginLeft: 15 }}>
                                <Chip
                                    key={keyE}
                                    textStyle={{ fontSize: 9, fontFamily: 'ProximaNova-Regular', }}
                                    mode="flat">{itemI}</Chip></View>)
                            : (null)
                    ))
                )}
                <Divider />
            </List.Accordion >
        );
        // END OF INGREDIENT EFFECTS SECTION

        // PRODUCT PREFERENCES SECTION
        let x = this.state.prod_pref_string.map((item) => {
            x = item.split(", ");
            return x;
        })

        let y = x.map((item, key) =>
            <List.Accordion
                key={key}
                titleStyle={{ fontFamily: 'ProximaNova-Regular', fontSize: 14 }}
                title={item}
            >
                {this.state.notes.map((itemN, key) =>
                    (itemN.Note == (item)) ?
                        (<Text
                            key={key}
                            style={{ margin: 15, fontFamily: 'ProximaNova-Regular' }}>
                            This product contains {itemN.Qty} ingredient(s) for {itemN.Note}</Text>)
                        : (null)
                )}
            </List.Accordion>
        );
        // END OF PRODUCT PREFERENCES SECTION

        return (
            <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={styles.listSubheaderStyle}>Result</List.Subheader>
                    <View style={styles.listStyle}>
                        {this.state.normal ? (
                            <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ fontFamily: 'Proxima Nova Bold', fontSize: 16 }}>Normal skin type is suitable for all products.</Text>
                            </View>
                        ) : (
                                <View>
                                    <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'center', }}>
                                        {n}
                                        <Text style={{ fontFamily: 'Proxima Nova Bold', fontSize: 16 }}>ingredient(s) <Text style={{ color: '#95E819' }}>good</Text> for {this.state.skin_type_string} skin</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'center', }}>
                                        {o}
                                        <Text style={{ fontFamily: 'Proxima Nova Bold', fontSize: 16 }}>ingredient(s) <Text style={{ color: '#FF7344' }}>bad</Text> for {this.state.skin_type_string} skin</Text>
                                    </View>
                                </View>)}
                        <Divider />
                        <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'center', }}>
                            <ProgressCircle
                                percent={prod}
                                radius={50}
                                borderWidth={8}
                                color={color}
                                shadowColor="#F5F5F5"
                                bgColor="#fff" >
                                <Text style={{ fontFamily: 'Proxima Nova Bold', fontSize: 18 }}>{prod}%</Text>
                            </ProgressCircle>
                            <Text style={[styles.usernameLabel, { marginTop: 20 }]}>matches with your {"\n"}product preferences!</Text>
                        </View>
                    </View>
                </List.Section>
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={styles.listSubheaderStyle}>Details</List.Subheader>
                    <View style={styles.listStyle}>
                        <Text style={{ fontFamily: 'Proxima Nova Bold', margin: 15, fontSize: 12 }}>Quick Notes : Your preferences that does not have result means there are no ingredients with it.</Text>
                        <Divider />
                        <Text style={{ fontFamily: 'Proxima Nova Bold', margin: 15 }}>Desired effects:</Text>
                        <Divider />
                        {c}
                        <Text style={{ fontFamily: 'Proxima Nova Bold', margin: 15 }}>Ingredients to avoid:</Text>
                        <Divider />
                        {y}
                        {/* <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Notes</DataTable.Title>
                            <DataTable.Title numeric>Quantity</DataTable.Title>
                        </DataTable.Header>
                        {this.state.notes.map((item, key) =>
                            <DataTable.Row key={item.Note}>
                                <DataTable.Title>{item.Note}</DataTable.Title>
                                <DataTable.Cell numeric>{item.Qty}</DataTable.Cell>
                            </DataTable.Row>
                        )}
                    </DataTable> */}
                    </View>
                </List.Section>
                {/* <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>INGREDIENTS</List.Subheader>
                    <Text style={{ fontSize: 11, margin:10 }}>INGREDIENTS FOUND</Text>
                    <Divider />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap',  margin:10  }}>
                        {i}
                    </View>
                    <Text style={{ fontSize: 11, margin:10 }}>INGREDIENTS NOT FOUND</Text>
                    <Divider />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap',  margin:10  }}>
                        {j}
                    </View>
                </List.Section> */}
                <Text style={{ textAlign: 'center', fontFamily: 'Proxima Nova Bold' }}>Not satisfied?</Text>
                <View
                    style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        mode="contained"
                        icon="check"
                        onPress={() => this.props.navigation.navigate('Scan')}>Scan Again
                        </Button>
                </View>
            </ScrollView >
        );
    }
}

export default (Result);