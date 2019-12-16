import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, List, RadioButton } from 'react-native-paper';
import styles from '../css/styles';

class SkinRules extends Component {

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

    ruleBasedCalc = () =>
    {
        if (this.state.one == "1")
        {
            if (this.state.two == "1")
            {
                if (this.state.three == "1")
                {
                    return "Combination Skin";
                }
            }
            else if (this.state.two == "2") {

            }
            else if (this.state.two == "3") {}
            else if (this.state.two == "4") {}
            else if (this.state.two == "5") {}
        }
        else if (this.state.one == "2")
        {
            if (this.state.two == "2")
            {
                if (this.state.three == "2")
                {
                    return "Sensitive Skin";
                }
            }
            else if (this.state.two == "1") {}
            else if (this.state.two == "3") {}
            else if (this.state.two == "4") {}
            else if (this.state.two == "5") {}
        }
        else if (this.state.one == "3")
        {
            if (this.state.two == "3")
            {
                if (this.state.three == "3")
                {
                    return "Normal Skin";
                }
            }
            else if (this.state.two == "1") {}
            else if (this.state.two == "2") {}
            else if (this.state.two == "4") {}
            else if (this.state.two == "5") {}
        }
        else if (this.state.one == "4")
        {
            if (this.state.two == "4")
            {
                if (this.state.three == "4")
                {
                    return "Oily Skin";
                }
            }
            else if (this.state.two == "1") {}
            else if (this.state.two == "2") {}
            else if (this.state.two == "3") {}
            else if (this.state.two == "5") {}
                    }
        else if (this.state.one == "5")
        {
            if (this.state.two == "5")
            {
                if (this.state.three == "5")
                {
                    return "Dry Skin";
                }
            }
            else if (this.state.two == "1") {}
            else if (this.state.two == "2") {}
            else if (this.state.two == "3") {}
            else if (this.state.two == "4") {}
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
        
    }
}

export default (SkinQuiz);