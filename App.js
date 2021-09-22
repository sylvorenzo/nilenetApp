
import React, { useEffect,useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import {AuthContext} from './components/context'
import { DrawerContent } from './screens/DrawerContent';
import MainStackScreen from './screens/mainStack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootStackScreen from './screens/RootStackScreen';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";




// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
  
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  


});

const App = () => {


  const Drawer = createDrawerNavigator();
  const [userToken, setUserToken]  =  useState(null);
 

  
  

 
  async function Token(){
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const to = await messaging().getToken();

    // Save the token
    setToken(to);
    console.log('Token: ', to);
   }

   // create function that can be used on any screen
  const authContext = React.useMemo(()=>({

    signIn: (email,password)=>{
      var eRR = '';
      if(email === ''){
        alert('An error has occurred');
        eRR ='error';
      }
      if(password === ''){
        alert('An error has occurred');
        eRR ='error';
      }
      if((email && password !== '') ){
        auth().signInWithEmailAndPassword(email,password).catch(error=>{
          alert(error);
          eRR =error;
          
        }).then(()=>{
          if(eRR === ''){
            setUserToken(auth().currentUser.uid);
            setIsLoading(false);
          }
          
        });
      }


    },
    // create sign up function
   signUp: (email,password,confirmPassword, type,name, surname, sector,companyName)=>{
      var SIError = '';
      if(email === ''){
        Alert.alert('Email Error! ', 'Email error!');
        SIError = 'error';
      }
      if(password === ''){
        Alert.alert('Password Error: ', 'Password Error!');
        SIError = 'error';
      }
      if(confirmPassword === ''){
        Alert.alert(' Password Error: ', 'Password Error!');
        SIError = 'error';
      }
      if(type === ''){
        Alert.alert('Error: ', 'select Error!');
        SIError = 'error';
      }
      if(sector === ''){
        Alert.alert('Error: ', 'Sector cannot be null.');
        SIError = 'error';
      }
      if(name.length < 4){
        Alert.alert('Error: ', 'name error!.');
        SIError = 'error';
      }
      if(surname.length < 4 ){
        Alert.alert('Error: ', 'Surname error!' );
        SIError = 'error';
      
      }
      if(companyName === ''){
        Alert.alert('Error: ', 'Company Error!');
        SIError = 'error';
      }
      if(companyName.length < 4){
        Alert.alert('Error: ', 'Company Error!' );
        SIError = 'error';
      }

      if(confirmPassword !== password){
        Alert.alert('Error: ', 'Match Error!.');
        SIError = 'error';
      }
      if(confirmPassword.length < 8){
        Alert.alert('Error: ', 'Password error!');
        SIError = 'error';
      }

      if(SIError === ''){
        auth().createUserWithEmailAndPassword(email,password).catch(er=> 
          alert(er),
          SIError = 'error'
        ).then(()=>{
          auth().sendSignInLinkToEmail;
          auth().currentUser.sendEmailVerification();
          database().ref(`users/${auth().currentUser.uid}`).set({
  
            
            username: name,
            surname: surname,
            sector: sector,
            companyName:companyName,
            type:type,
            companyDescription:'',
            profileImage:'',
          }).catch(err=>
            console.log(err)
            ).then(()=>{
              setUserToken(auth().currentUser.uid);
              setIsLoading(false)
            }
  
            )
        })
          

  
      
      }


    },
    //sign out functionality
    signOut: ()=>{
      auth().signOut().catch(error=>{
        alert('Error',error);
      }).then(()=>{
        setUserToken(null);
        setIsLoading(false)    
      })

    }
  }));

useEffect(()=>{


  // checks for messages while app is in the background.
  messaging().setBackgroundMessageHandler( async remoteMessage=>{
    Alert.alert('message handled in background',JSON.stringify(remoteMessage.notification.body));
  });
  // sends push notification when a message is sent.
  messaging().onMessage(async remoteMessage => {
    PushNotification.localNotification({
      id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    title: remoteMessage.notification.title, // (optional)
    message: remoteMessage.notification.body, // (required)
    color:'red',
    showWhen:'true',
    })
  });

  
  

  

  setInterval(()=>{
    <MainStackScreen/>;
    <RootStackScreen/>
  },2000)

  SplashScreen.hide();
  
},[])



  return (
    <View style={{flex:1}}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {userToken !== null ?(
        
          <Drawer.Navigator  drawerContent={props=> <DrawerContent {...props}/>} >
          <Drawer.Screen name = "HomeStack" component={MainStackScreen} />
          </Drawer.Navigator>
      

      ):(

      
        <RootStackScreen/>
      
      )}
      </NavigationContainer>

    </AuthContext.Provider>
    </View>

 




  
  );
};

const styles = StyleSheet.create({
  mainView:{
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'orange',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
