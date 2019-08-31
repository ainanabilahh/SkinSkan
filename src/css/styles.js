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
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },

  inputBox: {
    width: 300,
    height: 60,
    margin: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    marginVertical: 10
  },

  inputBoxInside: {
    marginTop: -15,
    height: 60,
    fontSize: 16,
    color: '#333367',
  },
  inputBox2: {
    width: 265,
    height: 60,
    marginHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 16,
    marginVertical: 10,
    backgroundColor: 'rgba(243, 243, 243, 0.5)',
    color: '#9a9a9a',
  },
  floatingLabel: {
    fontSize: 16,
    marginTop: 5,
    marginHorizontal: 10,
    color: '#b7b7b7',
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    color: '#b7b7b7',
  },

  button: {
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 13,
    marginVertical: 20
  },

  buttonText: {
    margin: 5,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center'
  },

  usernameLabel: {
    fontFamily: 'Moonbright-JRmWo',
    marginVertical: 20,
    fontSize: 50,
    color: '#70ebdb',
    marginTop: 100,
    fontWeight: '500',
    textAlign: 'center'
  },

  headerText: {
    marginVertical: 5,
    paddingTop: 10,
    fontSize: 25,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center'
  },
  InsideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff'
  },
  //End of Global

  //Logo
  LogoContainer: {
    paddingBottom: 10
  },
  //End of Logo

  //Footer
  footerContainer: {
    paddingTop: 16,
    paddingVertical: 16,
    flexDirection: 'row'
  },

  footerText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16
  },

  footerButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  //End of Footer

  //ViewProfile
  header: {
    backgroundColor: "#70ebdb",
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: 'center',
    position: 'absolute',
  },

  ContentContainer: {
    flex: 3,
    backgroundColor: '#fff',
  },

  TextInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    //marginTop:50,
    backgroundColor: '#fff'
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
