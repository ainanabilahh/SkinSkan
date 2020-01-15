import { Dimensions } from 'react-native';

export default {

  //Global
  MainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
    marginTop: 5,
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },

  checkBoxContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ebebeb',
    backgroundColor: '#fff'
  },

  radioButtonContainer: {
    flexDirection: 'row',
    borderColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    borderColor: '#ebebeb'
  },

  radioButtonStyle: {
    marginTop: 10,
    fontFamily: 'Proxima Nova Bold',
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
    height: 50,
    margin: 8,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'ProximaNova-Regular',
    paddingBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fafafa',
    borderColor: '#efefef',
    borderWidth: 1
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

  surface: {
    borderRadius: 50,
    elevation: 4,
    marginBottom: 10,
  },

  imageMenu: {
    marginBottom: 10,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 20
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#8a4de8',
    color: '#ffffff',
    paddingVertical: 5,
    marginVertical: 5,
    borderRadius: 100,
    width: 0.90 * Dimensions.get('window').width,
    elevation: 4
  },

  buttonSwiper: {
    color: '#8a4de8',
    paddingVertical: 5,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 100,
    width: 0.45 * Dimensions.get('window').width,
  },

  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
  },

  greenButton: {
    backgroundColor: '#72A310',
    fontFamily: 'ProximaNova-Regular',
    width: 0.45 * Dimensions.get('window').width
  },

  redButton: {
    backgroundColor: '#D1481B',
    fontFamily: 'ProximaNova-Regular',
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
    fontFamily: 'Proxima Nova Bold'
  },

  listDescriptionStyle: {
    fontFamily: 'Proxima Nova Bold',
    margin: 15
  },

  listAboutDescStyle: {
    fontFamily: 'ProximaNova-Regular',
    margin: 15
  },

  listMiniDescStyle: {
    fontFamily: 'Proxima Nova Bold',
    marginHorizontal: 15,
    marginBottom: 15,
    fontSize: 12,
    color: '#a3a3a3'
  },

  listSubheaderStyle: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'Proxima Nova Bold'
  },

  listTextStyle: {
    fontFamily: 'ProximaNova-Regular'
  },

  listStyle: {
    borderColor: '#e3e3e3',
    borderTopWidth: 0.65,
    borderBottomWidth: 0.65
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
    flexDirection: 'row',
    marginVertical: 8,
    margin: 60,
  },

  footerText: {
    fontFamily: 'ProximaNova-Regular',
    color: '#8a4de8',
    fontSize: 16
  },

  footerButton: {
    fontFamily: 'Proxima Nova Bold',
    color: '#8a4de8',
    fontSize: 16,
  },
  //End of Footer

  //ViewProfile
  ContentContainer: {
    flex: 3,
    backgroundColor: '#fff',
  },

  //End of ViewProfile

  wrapper: {
  },
  slide1: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
  },
}
