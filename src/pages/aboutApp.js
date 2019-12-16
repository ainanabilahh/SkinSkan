import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { List } from 'react-native-paper';

class AboutApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      hidePassword: true
    }
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  UpdateEmail = () => {

    fetch('http://178.128.121.52/updateEmail.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        username: username,
        email: this.state.email,
        password: this.state.password

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson === 'Your account has been updated. Please pull to refresh.') {
          alert(responseJson);
          this.props.navigation.navigate('ViewUser');
        }
        else {
          alert(responseJson);
        }

      }).catch((error) => {
        alert("There is a network error. Please try again.")
        console.log(error);
      });
  }

  render() {

    return (
      <ScrollView style={{ backgroundColor: '#efefef' }}>
        <List.Section style={{ backgroundColor: '#fff' }}>
          <List.Subheader style={{ backgroundColor: '#efefef' }}>ABOUT</List.Subheader>
          <Text style={{ textAlign: 'center', margin: 15 }}>SkinSkan is a mobile application developed using React Native framework which implemented OCR (Optical Character Recognition) using Tesseract OCR and web scraping using Beautiful Soup to scan skincare product ingredients and narrow the result based on user skin and product preferences.</Text>
          <List.Subheader style={{ backgroundColor: '#efefef' }}>QnA</List.Subheader>
          <List.Accordion
            title="1. How does the app work?"
            titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
            expanded={this.state.expanded}
          >
            <Text style={{ margin: 15 }}>Just grab a skin care product, search for its ingredients behind the packaging, and use this apps to scan the ingredients.</Text>
          </List.Accordion>
          <List.Accordion
            title="2. Can this app be trusted?"
            titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
            expanded={this.state.expanded}
          >
            <Text style={{ margin: 15 }}>All the information gained and displayed in this app are scraped from SkinCarisma.</Text>
          </List.Accordion>
          <List.Accordion
            title="3. How do I report a bug?"
            titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
            expanded={this.state.expanded}
          >
            <Text style={{ margin: 15 }}>If you could email us at <Text style={{ color: "blue" }}>skinskan.official@gmail.com</Text> with full details of the bug, including how you ended up encountering the bug and information about the device you were using, it would help us fix it as quickly as possible.</Text>
          </List.Accordion>
        </List.Section>
      </ScrollView>
    );
  }
}

export default AboutApp;