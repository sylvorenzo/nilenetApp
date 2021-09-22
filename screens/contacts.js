import React,{useEffect,useState,Component} from 'react';
import {View,Text,StatusBar,StyleSheet,ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Avatar } from 'react-native-paper';
import background from '../assets/launch_screen.jpg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

                // gets values from the database and loops through it.
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

    // function for removing a contact from contact list
    removeContact(uid){
        database().ref(`contacts/${auth().currentUser.uid}/${uid}`).remove();
    }
    render(){
        return(
            <ScrollView>
                <StatusBar backgroundColor="#f85900"/>
                <ImageBackground source={background} style={{flex:1, minHeight:800, paddingTop:10}}>
            
                {this.state.contacts.map(contact =>contact.map(item=>{
                    
                    return(
                        
                        <View style={styles.contactContainer}>
                        
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('userView', {paramkey:item.uid})}>
                            <Avatar.Image 
                            size={50}
                            source={{uri: item.profileImage}}/>
                        </TouchableOpacity>
                        <View style={{width:200}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Chat", {paramkey:item.uid})}>
                            <Text style={styles.contactTxt}>{item.username}</Text>
                        </TouchableOpacity>
                        </View>

                        <View style={{paddingLeft:50}}>
                        <TouchableOpacity onPress={()=>this.removeContact(item.uid)}>
                            <MaterialCommunityIcons
                                name="trash-can-outline"
                                size={30}
                                color='white'
                                
                            />
                        </TouchableOpacity>
                        </View>
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
        margin:1,
        flexDirection:'row',
        backgroundColor: '#f85900',
        borderColor:'#f85900',
        borderRadius:10,
        borderWidth:1,
    
    }
})