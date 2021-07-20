import React from 'react';
import {View,Text, TouchableOpacity, StatusBar } from 'react-native';
import {AuthContext} from '../components/context';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './home';
import { NavigationContainer } from '@react-navigation/native';
import BottomStackSection from './materialBottom';
import ResourcesScreen from './resources';


function MainStackScreen({navigation}){
    const  MainStack = createStackNavigator();
    return(
        
        <MainStack.Navigator screenOptions={{
            title:'NILENET',
            headerStyle:{
                backgroundColor: "white",
    
            }
        }}>
            
            <MainStack.Screen name="Home" component={BottomStackSection}/>
            <MainStack.Screen name = "Resources" component={ResourcesScreen}/>
        </MainStack.Navigator>
        
        

    )
}
export default MainStackScreen;