
import React, { useEffect,useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './components/context'
import { DrawerContent } from './screens/DrawerContent';
import MainStackScreen from './screens/mainStack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootStackScreen from './screens/RootStackScreen';
import messaging from '@react-native-firebase/messaging';





const App = () => {


  const Drawer = createDrawerNavigator();

  const Stack = createStackNavigator();

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken]  =  useState(null);
  var [token, setToken] = useState('');

  
  

 
  async function Token(){
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const to = await messaging().getToken();

  // Save the token
  setToken(to);
  console.log('Token: ', to);
   }
  const authContext = React.useMemo(()=>({

    signIn: (email,password)=>{

      if(email === ''){
        alert('Email cannot be blank')
      }
      if(password === ''){
        alert('password cannot be blank');
      }
      if((email && password !== '') ){
        auth().signInWithEmailAndPassword(email,password).catch(error=>{
          alert(error);
          
        }).then(()=>{
          setUserToken(auth().currentUser.uid);
          setIsLoading(false);
        });
      }


    },
   signUp: (email,password,confirmPassword, type,name, surname, sector,companyName)=>{
    var SIerror = '';
      if(email === ''){
        Alert.alert('Email Error: ', 'email cannot be blank');
        SIerror = 'error'
      }
      if(password === ''){
        Alert.alert('Password Error: ', 'Password cannot be blank');
        SIerror = 'error'
      }
      if(confirmPassword === ''){
        Alert.alert('Confirm Password Error: ', 'Confirm Password cannot be blank');
        SIerror = 'error'
      }
      if(type === ''){
        Alert.alert('Error: ', 'Please select whether you are an entrepreneur or investor.');
        SIerror = 'error'
      }
      if(sector === ''){
        Alert.alert('Error: ', 'Sector cannot be null.');
        SIerror = 'error'
      }
      if(name.length < 4){
        Alert.alert('Error: ', 'name is too short.');
        SIerror = 'error'
      }
      if(surname.length < 4 ){
        Alert.alert('Error: ', 'Surname is too short' );
        SIerror = 'error'
      
      }
      if(companyName === ''){
        Alert.alert('Error: ', 'Company Name cannot be empty');
        SIerror = 'error'
      }
      if(companyName.length < 4){
        Alert.alert('Error: ', 'Company name cannot be less than 4 characters' );
        SIerror = 'error'
      }

      if(confirmPassword !== password){
        Alert.alert('Error: ', 'Passwords do not Match.');
        SIerror = 'error'
      }
      if(confirmPassword.length < 8){
        Alert.alert('Error: ', 'Password cannot be less than 8 characters');
        SIerror = 'error'
      }

      if(SIerror === ''){
        auth().createUserWithEmailAndPassword(email,password).catch(error=> 
          alert(error),
          SIerror = error
        )
          if(SIerror === ''){
            database().ref(`users/${auth().currentUser.uid}`).set({
  
            
              username: name,
              surname: surname,
              sector: sector,
              companyName:companyName,
              type:type,
              companyDescription:'',
              profileImage:'',
            }).catch(error=>
              alert(error)
              ).then(()=>{
                setUserToken(auth().currentUser.uid);
                setIsLoading(false)
              }
    
              )
          }

  
      
      }


    },
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


  
  messaging().setBackgroundMessageHandler( async remoteMessage=>{
    Alert.alert('message handled in background',JSON.stringify(remoteMessage.notification.body));
  })

  
  

  

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
