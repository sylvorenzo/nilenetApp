import React,{Component} from 'react'
import {View, Text, ScrollView , StyleSheet, TouchableOpacity as Touch, StatusBar} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Card,
  } from 'react-native-paper';


class ResourcesScreen extends Component{

    render(){
        return(
            <ScrollView>
                <StatusBar backgroundColor="black"/>
                <Touch onPress={()=> this.props.navigation.navigate('finances')}>
                    <Card style={styles.card}>
                        <Title style={styles.title}>Finances</Title>
                    </Card>
                </Touch>
                <Touch onPress={()=> this.props.navigation.navigate('documents')}>
                    <Card style={styles.card}>
                        <Title style={styles.title}>Required Documentation</Title>
                    </Card>
                </Touch>
                <Touch onPress={()=> this.props.navigation.navigate('business')}>
                    <Card style={styles.card}>
                        <Title style={styles.title}>How To Register Your Business</Title>
                    </Card>
                </Touch>
                <Touch onPress={()=> this.props.navigation.navigate('tools')}>
                    <Card style={styles.card}>
                        <Title style={styles.title}>Tools For Success</Title>
                    </Card>
                </Touch>

            </ScrollView>
        )
    }
}
export default ResourcesScreen;

const styles = StyleSheet.create({

    title:{
        textAlign:'center',
        fontFamily: 'Georgia, serif',
        fontSize: 20,
        fontWeight:'bold',
        marginTop: 70,
    },
    card:{
        height: 200,
        margin: 5,
        justifyContent: 'center',
        textAlign:'center'
    }
})