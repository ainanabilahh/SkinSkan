import { Platform } from 'react-native';

export default {

  //Global
  MainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
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
    marginVertical: 8
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
    marginHorizontal: 8,
    paddingVertical: 8,
    marginVertical: 8
  },

  usernameLabel: {
    fontSize: 20,
    marginHorizontal: 20, 
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
    flexDirection: 'row'
  },

  footerText: {
    color: '#673AB7',
    fontSize: 16
  },

  footerButton: {
    color: '#673AB7',
    fontSize: 16,
    fontWeight: 'bold'
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

  MainContainer_For_Show_StudentList_Activity: {
    flex: 1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
  },

  //ViewUser
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  //End of ViewUser

}
