import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TermsScreen from './terms';
import SignUpScreen from './signup';
import SignInScreen from './SignIn';

const RootStack = createStackNavigator();

const RootStackScreen=()=>{
// this is the pages that is being displayed before authentication

    return(
    <RootStack.Navigator initialRouteName="Terms Of Use" headerMode="none">
        <RootStack.Screen name="Terms of Use" component={TermsScreen}/>
        <RootStack.Screen name="Sign In" component={SignInScreen}/>
        <RootStack.Screen name="Sign Up" component={SignUpScreen}/>
    


    </RootStack.Navigator>
    );

}
export default RootStackScreen;