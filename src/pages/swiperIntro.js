import React, { Component } from 'react';
import { Dimensions, Text, View, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import styles from '../css/styles';

class SwiperIntro extends Component {

    CreateUser = () => {
        this.props.navigation.navigate("CreateUser");
    };

    Login = () => {
        this.props.navigation.navigate("Login");
    };

    render() {
        return (
            <Swiper
                loop={false}
                style={styles.wrapper}
                
                showsButtons={false}>
                <LinearGradient
                    colors={['#8a4de8', '#4d5ee8']}
                    style={styles.linearGradient}>
                    <StatusBar
                        backgroundColor="#8a4de8"
                        barStyle="light-content" />
                </LinearGradient>
                <LinearGradient
                    colors={['#8a4de8', '#4d5ee8']}
                    style={styles.linearGradient}>
                </LinearGradient>
                <LinearGradient
                    colors={['#8a4de8', '#4d5ee8']}
                    style={styles.linearGradient}>
                    <View
                        style={[styles.buttonContainer, { flexDirection: 'row', position: 'absolute', bottom: 50 }]}>
                        <Button
                            dark={false}
                            style={styles.buttonSwiper}
                            contentStyle={{ borderColor: '#ffffff' }}
                            mode="outlined"
                            color="#ffffff"
                            icon="person"
                            onPress={this.CreateUser}>
                            Sign Up
                        </Button>
                        <Button
                            style={[styles.buttonSwiper, { backgroundColor: '#ffffff' }]}
                            mode="outlined"
                            color="#8a4de8"
                            icon="person-add"
                            onPress={this.Login}>
                            Sign In
                        </Button>
                    </View>
                </LinearGradient>
            </Swiper>
        );
    }
}

export default SwiperIntro;
//AppRegistry.registerComponent(appName, () => SwiperIntro);