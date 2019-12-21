import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Divider, ActivityIndicator, Button, List, DataTable, Chip } from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle'
import styles from '../css/styles';
import AsyncStorage from '@react-native-community/async-storage';

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
            ing_eff_string: null,
            prod_pref_string: null,
            skin_type_string: null,
        }
    }

    componentDidUpdate() {

        // if (this.props.navigation.state.params.ing !== this.state.ing) {
        //     this.setState({ ing: this.props.navigation.state.params.ing })
        // }

        if (this.props.navigation.state.params.notes !== this.state.notes) {
            this.setState({ notes: this.props.navigation.state.params.notes })
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

        fetch('http://178.128.121.52/viewSkinResult.php', {
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

            }).catch((err) => {
                alert("There is a network error. Please try again.")
                if (err.name == 'AbortError') return
                throw err
            });
    }

    Back = () => {
        this.props.navigation.navigate('Scan');
    }

    render() {

        prod = parseFloat(this.state.percent)
        prod = Math.round(this.state.percent)

        if (prod < 31)
            color = "#eb0000"
        else if (prod > 30 && prod < 61)
            color = "#ebeb00"
        else if (prod > 60)
            color = "#76eb00"

        if (!this.state.notes && !this.state.skin && !this.state.percent) {
            return (
                <Overlay height={200} isVisible={this.state.isVisible}>
                    <View>
                        <Text style={{ paddingBottom: 50, textAlign: "center" }}>This will take a while depends {"\n"} on your internet connection. {"\n"}Please do not close this window.</Text>
                        <ActivityIndicator
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

        var skin = this.state.skin
        var ing_eff_string = this.state.ing_eff_string
        var prod_pref_string = this.state.prod_pref_string

        let n = skin.map((item, key) =>
            <Text key={key} style={[styles.usernameLabel, { color: '#6adb28' }]}>{item.GoodSkin}</Text>
        );

        let o = skin.map((item, key) =>
            <Text key={key} style={[styles.usernameLabel, { color: '#db286a' }]}>{item.BadSkin}</Text>
        );

        let a = ing_eff_string.map((item) => {
            a = item.split(", ")
            return a
        })

        let b = a.map((item, key) =>
            <List.Accordion
                key={key}
                titleStyle={{ fontSize: 14 }}
                title={item}
            >
                {this.state.notes.map((itemN, keyN) =>
                    (itemN.Note == (item)) ? (<Text key={keyN} style={{ margin: 15 }}>This product contains {itemN.Qty} ingredient(s) with {itemN.Note} effects</Text>) : ((keyN == 0) ? (<Text key={keyN} style={{ margin: 15 }}>This product contains 0 ingredient(s) with {item} effects</Text>) : (null))
                    )}
            </List.Accordion>
        );

        let x = prod_pref_string.map((item) => {
            x = item.split(", ");
            return x;
        })

        let y = x.map((item, key) =>
            <List.Accordion
                key={key}
                titleStyle={{ fontSize: 14 }}
                title={item}
            >
                {this.state.notes.map((itemN, key) =>
                    (itemN.Note == (item)) ? (<Text key={key} style={{ margin: 15 }}>This product contains {itemN.Qty} ingredient(s) for {itemN.Note}</Text>) : ((key == 0) ? (<Text key={key} style={{ margin: 15 }}>This product contains 0 ingredient(s) with {item}</Text>) : (null))
                )}
            </List.Accordion>
        );

        return (
            <ScrollView style={{ backgroundColor: '#efefef' }}>
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>RESULT</List.Subheader>
                    <View style={{ flexDirection: 'row', padding: 20 }}>
                        {n}
                        <Text style={[styles.usernameLabel, { fontSize: 16, marginTop: 5 }]}>ingredient(s) <Text style={{ color: '#6adb28' }}>good</Text> for your skin type!</Text>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 20 }}>
                        {o}
                        <Text style={[styles.usernameLabel, { fontSize: 16, marginTop: 5 }]}>ingredient(s) <Text style={{ color: '#db286a' }}>bad</Text> for your skin type!</Text>
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'row', padding: 20 }}>
                        <ProgressCircle
                            percent={prod}
                            radius={50}
                            borderWidth={8}
                            color={color}
                            shadowColor="#999"
                            bgColor="#fff" >
                            <Text style={{ fontSize: 18 }}>{prod}%</Text>
                        </ProgressCircle>
                        <Text style={[styles.usernameLabel, { marginTop: 20 }]}>matches with your {"\n"}product preferences!</Text>
                        <Divider />
                    </View>
                </List.Section>
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>DETAILS</List.Subheader>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 15 }}>Effects wanted to have:</Text>
                    <Divider />
                    {b}
                    <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 15 }}>Ingredients wanted to avoid:</Text>
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
                <Text style={{ textAlign: 'center' }}>Not satisfied?</Text>
                <Button style={[styles.button, { width: 0.95 * Dimensions.get('window').width }]} mode="contained" icon="arrow-back" onPress={this.Back}>Scan Again</Button>
            </ScrollView >

        );
    }
}

export default (Result);