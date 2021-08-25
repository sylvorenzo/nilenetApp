import React, {Component} from 'react'
import { ScrollView, StatusBar, Text } from 'react-native'

class RequiredDocumentationScreen extends Component{

    render(){
        return(
            <ScrollView>
                <StatusBar backgroundColor="#07adb3"/>
                <Text>Required Documentation Screen</Text>
            </ScrollView>
        );
    }
}
export default RequiredDocumentationScreen;