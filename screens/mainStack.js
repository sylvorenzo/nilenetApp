import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomStackSection from './materialBottom';
import ResourcesScreen from './resources';
import ProfileScreen from './profile';
import ChatScreen from './chat';
import ContactsScreen from './contacts';
import FinanceScreen from './finances';
import BusinessRegistrationScreen from './business';
import ToolScreen from './tools';
import MyPostScreen from './mypost';
import EditProfileScreen from './editprofile';
import SupportScreen from './support';
import userViewerScreen from './userViewer';
import CopyRightScreen from './copyrights';



function MainStackScreen(){
    // creates navigation stack
    const  MainStack = createStackNavigator();
    return(
    
        <MainStack.Navigator screenOptions={{
            title:'NILENET',
            headerStyle:{
                backgroundColor: "#f85900",
    
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
                backgroundColor:'#f85900'
            }
        }} component={ResourcesScreen}/>
            <MainStack.Screen name = "Profile" component={ProfileScreen}/>
            <MainStack.Screen name = "Chat" 
                options={{title:'Messenger',headerTintColor:'white',
                headerStyle:{
                    backgroundColor:'#f85900'
                }
            }}
                component={ChatScreen}
            />
            <MainStack.Screen name = "Contacts" 
               options={{title:'Contacts',headerStyle:{
                   backgroundColor:'#f85900'
               }}} 
                component={ContactsScreen}
            />
            <MainStack.Screen name = "finances" 
                options={{title:'Finances',headerStyle:{
                    backgroundColor:'#f85900'
                }}
            } 
                component={FinanceScreen}
            />
            <MainStack.Screen name = "copyrights" 
                options={{title:'Copyrights and Intellectual Property',headerStyle:{
                    backgroundColor:'#f85900'
                }}} 
                component={CopyRightScreen}
            />
            <MainStack.Screen name = "business" 
                options={
            {title:'Register Your Business',
            headerStyle:{
                backgroundColor:'#f85900'
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