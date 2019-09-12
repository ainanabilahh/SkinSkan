import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';

class Skin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: 'first',
        }
    }

    render() {

        const { checked } = this.state;

        return (
            <ScrollView>
                <RadioButton.Group
                    onValueChange={value => this.setState({ value })}
                    value={this.state.value}
                >
                    <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                        <Text>First</Text>
                        <RadioButton value="first" />
                    </View>
                    <View>
                        <Text>Second</Text>
                        <RadioButton value="second" />
                    </View>
                </RadioButton.Group>
            </ScrollView>
        );
    }
}

export default Skin;

