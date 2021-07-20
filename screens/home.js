import React from 'react';
import {View,Text,StatusBar} from 'react-native';


function HomeScreen({navigation}){

    return(
        <View>
            <StatusBar backgroundColor="#ffffff"/>
            <Text>Home Screen</Text>
        </View>
    )
}
export default HomeScreen;