import React, { Component } from 'react';
import { Dimensions, Text, View, StatusBar, Image } from 'react-native';
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
                showsButtons={false}
                showsPagination={true}>
                <LinearGradient
                    colors={['#8a4de8', '#4d5ee8']}
                    style={[styles.linearGradient, { alignItems: 'center', justifyContent: 'center' }]}>
                    <StatusBar
                        backgroundColor="#8a4de8"
                        barStyle="light-content" />
                    <Image
                        style={{ marginBottom: 50, width: 220, height: 442 }}
                        source={require('../images/mockup1.png')} />
                    <Text style={{ fontFamily: 'Proxima Nova Bold', color: '#FFFFFF', fontSize: 16 }}>Choose your product preferences.</Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#8a4de8', '#4d5ee8']}
                    style={[styles.linearGradient, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Image
                        style={{ marginBottom: 50, width: 220, height: 442 }}
                        source={require('../images/mockup2.png')} />
                    <Text style={{ fontFamily: 'Proxima Nova Bold', color: '#FFFFFF', fontSize: 16 }}>Select your option.</Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#8a4de8', '#4d5ee8']}
                    style={[styles.linearGradient, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Image
                        style={{ marginBottom: 50, width: 220, height: 442 }}
                        source={require('../images/mockup3.png')} />
    <Text style={{  textAlign: 'center', fontFamily: 'Proxima Nova Bold', color: '#FFFFFF', fontSize: 16 }}>Crop your image into ingredients-only {"\n"}image and wait for the result.</Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#8a4de8', '#4d5ee8']}
                    style={[styles.linearGradient, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Image
                        style={{ marginBottom: 50, width: 220, height: 442 }}
                        source={require('../images/mockup5.png')} />
                    <Text style={{ fontFamily: 'Proxima Nova Bold', color: '#FFFFFF', fontSize: 16 }}>Voila. You are good to go!</Text>
                    <View
                        style={[styles.buttonContainer, { flexDirection: 'row', position: 'absolute', bottom: 50 }]}>
                        <Button
                            dark={false}
                            style={styles.buttonSwiper}
                            contentStyle={{ borderColor: '#ffffff' }}
                            mode="outlined"
                            color="#ffffff"
                            icon="person-add"
                            onPress={this.CreateUser}>
                            Sign Up
                        </Button>
                        <Button
                            style={[styles.buttonSwiper, { backgroundColor: '#ffffff' }]}
                            mode="outlined"
                            color="#8a4de8"
                            icon="person"
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