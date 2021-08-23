import React,{useEffect,useState,Component} from 'react';
import {View,Text,StatusBar,StyleSheet,ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Avatar } from 'react-native-paper';
import background from '../assets/background.png';

class ContactsScreen extends Component{

    constructor(props){
        super(props);
// create states to store data from the database.
        this.state = {

            contacts:[],
        
        }

       
    }

    componentDidMount(){

         // retrieves profile information from database.
         database().ref(`contacts/${auth().currentUser.uid}`).on('value', snapshot=>{
            
            if(snapshot.exists()){

                var extensionArray = [];
                
                Object.values(snapshot.val()).forEach(item=>{
                    let contactItems = [];

                    contactItems.push({
                        profileImage: item.profileImage,
                        uid: item.uid,
                        username: item.username,
                    });
                        extensionArray = [...extensionArray, contactItems]
                    this.setState({contacts: extensionArray});
                    
                })
            }
        })
    }
    render(){
        return(
            <ScrollView>
                <StatusBar backgroundColor="gray"/>
                <ImageBackground source={background} style={{flex:1, minHeight:800, paddingTop:10}}>
            
                {this.state.contacts.map(contact =>contact.map(item=>{
                    
                    return(
                        
                        <View style={styles.contactContainer}>
                        <StatusBar backgroundColor="gray"/>

                        <TouchableOpacity>
                            <Avatar.Image 
                            size={50}
                            source={{uri: item.profileImage}}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Chat", {paramkey:item.uid})}>
                            <Text style={styles.contactTxt}>{item.username}</Text>
                        </TouchableOpacity>

                        </View>
                      

                    )
                }))}
                </ImageBackground>
            </ScrollView>
        )
    }

}
export default ContactsScreen;

const styles = StyleSheet.create({
    contactTxt:{
        paddingTop: 10,
        paddingLeft: 10,
        color:'white',
        fontFamily:'Georgia,serif',
        fontWeight:'bold',
        fontSize: 15,
    },
    contactContainer:{
        padding:10,
        margin:0.1,
        flexDirection:'row',
        backgroundColor: 'orange',
        borderColor:'white',
        borderWidth:1,
    
    }
})