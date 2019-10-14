import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator, Button, List } from 'react-native-paper';
import ProgressBar from 'react-native-progress/Bar';
import styles from '../css/styles';

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            ingredients: '',
            result: null,
            isVisible: true
        }
    }

    componentDidUpdate() {

        if (this.props.navigation.state.params.result !== this.state.result) {
            this.setState({ result: this.props.navigation.state.params.result })
        }
    }

    Back = () => {
        this.props.navigation.navigate('Ingredients');
    }

    render() {

        /*result = parseFloat(this.state.result)
        result = result / 100

        if (result < 0.31)
            color = "#eb0000"
        else if (result > 0.3 && result < 0.61)
            color = "#ebeb00"
        else if (result > 0.6)
            color = "#76eb00"*/

        const data = [{ 'Note': 'Silicone', 'Qty': '2' }, { 'Note': 'Alcohol', 'Qty': '1' }, { 'Note': 'Allergen', 'Qty': '1' }, { 'Note': 'Anti-Aging', 'Qty': '2' }, { 'Note': 'Acne-Fighting', 'Qty': '1' }, { 'Note': 'Promotes Wound Healing', 'Qty': '3' }, { 'Note': 'Good for Dry Skin', 'Qty': '5' }, { 'Note': 'Comedogenic Rating (1)', 'Qty': '2' }, { 'Note': 'Comedogenic Rating (2)', 'Qty': '2' }, { 'Note': 'Comedogenic Rating (3)', 'Qty': '1' }];
        const listItems = data.map((item, key) =>
            <Text key={item.Note}>{item.Note}:{item.Qty}</Text>
        );

        if (!this.state.result) {
            return (
                <Overlay height={200} isVisible={this.state.isVisible}>
                    <View style={styles.MainContainer}>
                        <Text style={{ paddingBottom: 50 }}>This will take just a short while.</Text>
                        <ActivityIndicator
                            animating={true}
                            style={styles.indicator}
                            size="large"
                        />
                    </View>
                </Overlay>
            );
        }
        return (
            <ScrollView style={{ backgroundColor: '#efefef' }}>
                <List.Section style={{ backgroundColor: '#fff' }}>
                    <List.Subheader style={{ backgroundColor: '#efefef' }}>YOUR RESULT</List.Subheader>
                    <View style={[styles.MainContainer, { paddingVertical: 100 }]}>
                        {/*<Text style={[styles.usernameLabel, { fontSize: 50 }]}>{this.state.result}%</Text>*/}
                        {listItems}
                        <ProgressBar
                            style={{ marginVertical: 10 }}
                            progress={0.5}
                            borderRadius={100}
                            color={'#66ccff'}
                            width={200}
                            height={20} />
                        <Text style={styles.usernameLabel}>match with your skin preferences!</Text>
                    </View>
                </List.Section>
                <Button style={styles.button} mode="contained" icon="check" onPress={this.Back}>Back</Button>
            </ScrollView>

        );
    }
}

export default (Result);