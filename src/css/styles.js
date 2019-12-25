import { Platform, Dimensions } from 'react-native';

export default {

  //Global
  MainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#673AB7',
  },

  textBoxBtnHolder:
  {
    position: 'relative',
    justifyContent: 'center'
  },
  
  visibilityBtn:
  {
    position: 'absolute',
    bottom: 20,
    right: 70,
    height: 40,
    width: 35,
    padding: 5
  },
 
  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },

  radioButtonContainer: {
    flexDirection: 'row', 
    backgroundColor: '#fafafa', 
    borderColor: 'transparent', 
    borderRadius: 5, 
    borderWidth: 1,
    marginVertical: 5,
    padding: 5, 
    borderColor: '#efefef'
  },

  radioButtonStyle: {
    marginTop: 7,
    fontWeight: 'bold', 
    color: '#484d51'
  },

  inputBox: {
    backgroundColor: '#fff',
    width: 300,
    height: 60,
    margin: 60,
    paddingHorizontal: 8,
    marginVertical: 8,
  },


  inputBox2: {
    height: 60,
    marginHorizontal: 8,
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 8,
    marginVertical: 8,
    backgroundColor: 'rgba(243, 243, 243, 0.5)',
  },

  buttonContainer: {
    marginTop: 15,
  },

  inputBoxMultiLine: {
    height: 200,
    marginHorizontal: 8,
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 8,
    marginVertical: 8,
    backgroundColor: 'rgba(243, 243, 243, 0.5)',
  },

  button: {
    backgroundColor: '#673AB7',
    paddingVertical: 8,
    marginVertical: 8,
    width: 300,
    margin: 10,
  },

  greenButton: {
    backgroundColor: '#6adb28', 
    width: 0.45 * Dimensions.get('window').width
  },

  redButton: {
    backgroundColor: '#db286a', 
    width: 0.45 * Dimensions.get('window').width
  },

  whiteButton: {
    backgroundColor: "#fff",
    margin: 60
  },

  usernameLabel: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 10, 
    color: '#000',
    fontWeight: 'bold',
  },

  headerText: {
    marginVertical: 5,
    paddingTop: 10,
    fontSize: 25,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center'
  },
  //End of Global

  //Logo
  LogoContainer: {
    elevation: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.0)'
  },
  //End of Logo

  //Footer
  footerContainer: {
    paddingTop: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    paddingVertical: 8,
    marginVertical: 8,
    margin: 60,
  },

  footerText: {
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    fontSize: 16
  },

  footerButton: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  //End of Footer

  //ViewProfile
  header: {
    backgroundColor: "#673AB7",
  },

  ContentContainer: {
    flex: 3,
    backgroundColor: '#fff',
  },

  //End of ViewProfile

  //ViewUser
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  //End of ViewUser

}
