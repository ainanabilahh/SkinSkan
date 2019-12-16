import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Divider, ActivityIndicator, Button, List, DataTable, Chip } from 'react-native-paper';
import ProgressBar from 'react-native-progress/Bar';
import ProgressCircle from 'react-native-progress-circle'
import styles from '../css/styles';

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            // ingredients: '',
            // ing: null,
            // notes: null,
            isVisible: true,
            ingredients: '',
            ing: null,
            notes: [{ "Note": "Brightening", "Qty": "1" }, { "Note": "Acne-Fighting", "Qty": "1" }, { "Note": "Good for Dry Skin", "Qty": "4" }, { "Note": "Comedogenic Rating (1)", "Qty": "1" }, { "Note": "Comedogenic Rating (2)", "Qty": "2" }, { "Note": "Comedogenic Rating (3)", "Qty": "1" }],
            percent: '80.0',
            good: '4',
            bad: '0'
        }
    }

    // componentDidUpdate() {

    //     if (this.props.navigation.state.params.ing !== this.state.ing) {
    //         this.setState({ ing: this.props.navigation.state.params.ing })
    //     }

    //     if (this.props.navigation.state.params.notes !== this.state.notes) {
    //         this.setState({ notes: this.props.navigation.state.params.notes })
    //     }
    // }

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

        // if (!this.state.notes) {
        //     return (
        //         <Overlay height={200} isVisible={this.state.isVisible}>
        //             <View style={styles.MainContainer}>
        //                 <Text style={{ paddingBottom: 50, textAlign:"center" }}>This will take a while depends on your internet connection. Please do not close this window.</Text>
        //                 <ActivityIndicator
        //                     animating={true}
        //                     style={styles.indicator}
        //                     size="large"
        //                 />
        //             </View>
        //         </Overlay>
        //     );
        // }

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

        // console.log(j)

        return (
            <ScrollView style={{ backgroundColor: '#efefef' }}>
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>RESULT</List.Subheader>
                    <View style={{ flexDirection: 'row', padding: 20 }}>
                        
                        <Divider/>
                        <ProgressCircle
                            percent={prod}
                            radius={50}
                            borderWidth={8}
                            color={color}
                            shadowColor="#999"
                            bgColor="#fff" >
                            <Text style={{ fontSize: 18 }}>{prod}%</Text>
                        </ProgressCircle>
                        <Text style={styles.usernameLabel}>matches with your {"\n"}product preferences!</Text>
                        <Divider />
                    </View>
                </List.Section>
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>DETAILS</List.Subheader>
                    <DataTable>
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
                    </DataTable>
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
            </ScrollView>

        );
    }
}

export default (Result);