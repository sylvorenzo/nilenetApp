import React, { useEffect, useState } from 'react';
import {View,Text, TouchableOpacity, StatusBar } from 'react-native';
import {AuthContext} from '../components/context';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './home';
import { NavigationContainer } from '@react-navigation/native';
import BottomStackSection from './materialBottom';
import ResourcesScreen from './resources';
import ProfileScreen from './profile';
import ChatScreen from './chat';
import ContactsScreen from './contacts';
import FinanceScreen from './finances';
import RequiredDocumentationScreen from './documentation';
import BusinessRegistrationScreen from './business';
import ToolScreen from './tools';
import MyPostScreen from './mypost';
import EditProfileScreen from './editprofile';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import PushNotification from 'react-native-push-notification';
import SupportScreen from './support';
import userViewerScreen from './userViewer';


function MainStackScreen({navigation}){

    var [msg, setMsg] = useState('');
        // Must be outside of any component LifeCycle (such as `componentDidMount`).

        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
              
            },
          
            
          
          
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
              alert: true,
              badge: true,
              sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
          });
          
          PushNotification.createChannel(
            {
              channelId:'not1',
              channelName:'My channel',
          
            },
            
          );
    useEffect(()=>{

        database().ref(`${auth().currentUser.uid}`).on('value',snap=>{
            
            if(snap.exists()){
        
                database().ref(`users/${snap.val().token}`).on('value', val =>{
                    
                    if(val.exists()){
                        database().ref(`chats/users/${auth().currentUser.uid}/${auth().currentUser.uid + snap.val().token}`).on('value',snapshot=>{
                           console.log( 'snapshot: ',snap.val().message)
                            if(snapshot.exists()){
                             
                                setMsg(msg = snapshot.val().message);
                                console.log('message:',msg);
                                if(msg != null){
                                    PushNotification.localNotification({
                                        channelId:'not1',
                                        id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                                        title: `You`,
                                        message: msg, // (required)
                                  })

                                  
                                }
                            }
                          
                          })//.then(()=>{
                            //PushNotification.localNotification({
                            //    channelId:'not1',
                            //    id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                            //    title: `${val.username} ${val.surname}`,
                            //    message: msg, // (required)
                            //  })
                          //})
                    }
         
                });
            }
        })

       
    },[])
    const  MainStack = createStackNavigator();
    return(
    
        <MainStack.Navigator screenOptions={{
            title:'NILENET',
            headerStyle:{
                backgroundColor: "#eb7434",
    
            },
            headerTintColor:'white',
            headerTitleStyle:{
                fontFamily:'Times New Roman',
                fontWeight:'bold',
                
                shadowColor:'rgba(0,0,0,0.75)',
                textShadowOffset:  {width: -1,height:1},
                textShadowRadius:7,
            }
        }}>
            
            <MainStack.Screen name="Home" component={BottomStackSection}/>
            <MainStack.Screen name = "Resources" options={{title:'Resources',
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:'#07adb3'
            }
        }} component={ResourcesScreen}/>
            <MainStack.Screen name = "Profile" component={ProfileScreen}/>
            <MainStack.Screen name = "Chat" 
                options={{title:'Messenger',headerTintColor:'white',
                headerStyle:{
                    backgroundColor:'#07adb3'
                }
            }}
                component={ChatScreen}
            />
            <MainStack.Screen name = "Contacts" 
               options={{title:'Contacts'}} 
                component={ContactsScreen}
            />
            <MainStack.Screen name = "finances" 
                options={{title:'Finances',headerStyle:{
                    backgroundColor:'#07adb3'
                }}
            } 
                component={FinanceScreen}
            />
            <MainStack.Screen name = "documents" 
                options={{title:'Documents',headerStyle:{
                    backgroundColor:'#07adb3'
                }}} 
                component={RequiredDocumentationScreen}
            />
            <MainStack.Screen name = "business" 
                options={
            {title:'Register Your Business',
            headerStyle:{
                backgroundColor:'gray'
            }
            
            }} 
                component={BusinessRegistrationScreen}
            />
            <MainStack.Screen name = "tools" 
                options={{title:'Tools For Success'}} 
                component={ToolScreen}
            />
            <MainStack.Screen name = "posts" 
                options={{title:'Posts'}} 
                component={MyPostScreen}
            />
            <MainStack.Screen name = "editProfile" 
                options={{title:'Edit Profile'}} 
                component={EditProfileScreen}
            />
            <MainStack.Screen name = "support" 
                options={{title:'Support'}} 
                component={SupportScreen}
            />
            <MainStack.Screen name = "userView" 
                options={{title:'Profile'}} 
                component={userViewerScreen}
            />

        </MainStack.Navigator>
        
        

    )
}
export default MainStackScreen;