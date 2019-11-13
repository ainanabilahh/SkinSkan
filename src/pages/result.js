import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Divider, ActivityIndicator, Button, List, DataTable, Chip } from 'react-native-paper';
import ProgressBar from 'react-native-progress/Bar';
import styles from '../css/styles';

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            ingredients: '',
            ing: null,
            notes: null,
            isVisible: true
        }
    }

    componentDidUpdate() {

        if (this.props.navigation.state.params.ing !== this.state.ing) {
            this.setState({ ing: this.props.navigation.state.params.ing })
        }

        if (this.props.navigation.state.params.notes !== this.state.notes) {
            this.setState({ notes: this.props.navigation.state.params.notes })
        }
    }

    Back = () => {
        this.props.navigation.navigate('Scan');
    }

    render() {

        /*ing = parseFloat(this.state.ing)
        ing = ing / 100

        if (ing < 0.31)
            color = "#eb0000"
        else if (ing > 0.3 && ing < 0.61)
            color = "#ebeb00"
        else if (ing > 0.6)
            color = "#76eb00"*/

        if (!this.state.notes) {
            return (
                <Overlay height={200} isVisible={this.state.isVisible}>
                    <View style={styles.MainContainer}>
                        <Text style={{ paddingBottom: 50 }}>This will take just a while depends on your internet connection.</Text>
                        <ActivityIndicator
                            animating={true}
                            style={styles.indicator}
                            size="large"
                        />
                    </View>
                </Overlay>
            );
        }

        var ingArr = this.state.ing

        const ingredients = ingArr.map((item) => {
            ing = item.IngFound.split(", ")
            return ing
        })

        const i = ing.map((item, key) =>
            <Chip key={key} textStyle={{ fontSize: 9 }} mode="outlined">{item}</Chip>
        )

        const j = ingArr.map((item, key) => 
            <Text key={key} textStyle={{ fontSize: 11 }}>{item.IngNotFound}</Text>
        )

        console.log(j)

        return (
            <ScrollView style={{ backgroundColor: '#efefef' }}>
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>RESULT</List.Subheader>
                    <View style={[styles.MainContainer, { paddingVertical: 100 }]}>
                        {/*<Text style={[styles.usernameLabel, { fontSize: 50 }]}>{this.state.ing}%</Text>
                        <ProgressBar
                            style={{ marginVertical: 10 }}
                            progress={0.5}
                            borderRadius={100}
                            color={'#66ccff'}
                            width={200}
                            height={20} />
                        <Text style={styles.usernameLabel}>match with your skin preferences!</Text>*/}
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
                <List.Section style={{ backgroundColor: '#fff' }}>
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
                </List.Section>
                <Button style={styles.button} mode="contained" icon="check" onPress={this.Back}>Scan Again</Button>
            </ScrollView>

        );
    }
}

export default (Result);