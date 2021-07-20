
import React, { useEffect,useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
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




const App = () => {
  const Drawer = createDrawerNavigator();

  const Stack = createStackNavigator();

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken]  =  useState(null);

  const authContext = React.useMemo(()=>({

    signIn: (email,password)=>{
      auth().signInWithEmailAndPassword(email,password).catch(error=>{
        alert(error);
      }).then(()=>{
        setUserToken(auth().currentUser.uid);
        setIsLoading(false);
      });

    },
    signUp: (email,password,type)=>{
      auth().createUserWithEmailAndPassword(email,password).catch(error=>{
        alert(error)
      }).then(
        database().ref(`users/${auth().currentUser.uid}`).set({
          type:type,
        })
      ).finally(()=>{
        setUserToken('something');
        setIsLoading(false)
      })

    },
    signOut: ()=>{
      auth().signOut().catch(error=>{
        alert(error);
      }).then(()=>{
        setUserToken(null);
        setIsLoading(false)    
      })

    }
  }));

useEffect(()=>{

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
