import React,{useContext, useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
 
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../components/context';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export function DrawerContent(props){
    // create state variable.
    var [items, setItems] = useState([]);
    useEffect(()=>{
        // retrieves current users data from database.
        database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot =>{
            if(snapshot.exists()){
                 let Items = snapshot.val();
                 let newItems = [];
                 for(let x = 0; x< 1; x++){
                 
                     newItems.push({
                         username: Items.username,
                         surname: Items.surname,
                         companyName: Items.companyName,
                         profileImage: Items.profileImage,
                         sectorOfBusiness: Items.sector,
                         type:Items.type,
                         token: Items.token
                             
                     });
             
                 }
                 setItems(items = newItems);
            }
 
        });

    },[]);
    // retrieves signout function from App.js
    const {signOut} = useContext(AuthContext);
    return(
        <View style={{flex:1}}>
           <DrawerContentScrollView {...props} style={styles.Parent}>
               <StatusBar backgroundColor="#f85900"/>
                
                    <View style={styles.userInfoSection}>
                        
                            {items.map(item=>{
                            
                                return(
                                    <View style={{paddingTop:10,position:'absolute', backgroundColor:'#f85900',  width:300, }}>
                                    <Avatar.Image
                                    style={{marginLeft:100,}}
                                    source={{
                                    uri:item.profileImage
                                    }}
                                    size={60}
                                    />
                                 
                                        <Title style={styles.title}>{item.username} {item.surname}</Title>
                                        <Caption style={styles.caption}>{item.type}</Caption>
                                    
                                    </View>

                                )
                            })}
                    
                        
                   
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <Drawer.Item
                            icon={({size}) => (
                            <MaterialCommunityIcons
                                name='account-outline'
                                color='white'
                                size={size}
                            />)}
                            label='Profile'
                            onPress={()=>{props.navigation.navigate('Profile')}}
                        />
                        <Drawer.Item
                            icon={({size}) => (
                            <MaterialCommunityIcons
                                name='book-multiple-outline'
                                color='white'
                                size={size}
                            />)}
                            label='Resources'
                            onPress={()=>{props.navigation.navigate('Resources')}}
                        />
                        <Drawer.Item
                            icon={({size}) => (
                            <MaterialCommunityIcons
                                name='account-group-outline'
                                color='white'
                                size={size}
                            />)}
                            label='Support'
                            onPress={()=>{props.navigation.navigate('support')}}
                        />

                    </Drawer.Section>
           </DrawerContentScrollView>
           <Drawer.Section style={styles.bottomDrawerSection}>
                        <Drawer.Item
                            icon={({color,size}) => (
                            <MaterialCommunityIcons
                                name='logout'
                                color={color}
                                size={size}
                            />)}
                            label='SignOut'
                            onPress={()=>{signOut()}}
                        />
           </Drawer.Section>
        </View>
    );
}
const styles = StyleSheet.create({
    Parent:{
        position: 'absolute',

    },
    userInfoSection:{
        position:'relative',
        backgroundColor:'#eb7434',
        width:400,
        borderBottomRightRadius:25,
        

        
    },
    title:{
        fontSize:16,
        color:'white',
        marginTop:3,
        fontWeight:'bold',
        marginLeft:80,
    },
    caption:{
        fontSize:14,
        lineHeight:14,
        color:'white',
        marginLeft:80,
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
    },
    section:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:15,
    },
    paragraph:{
        fontWeight:'bold',
        marginRight:3,

    },
    drawerSection:{
        backgroundColor:'#f85900',
        marginTop:120,
        borderBottomLeftRadius:25,
        

    },
    bottomDrawerSection:{
        marginTop:670,
        marginBottom:15,
        borderTopColor:'#f4f4f4',
        borderTopWidth:1,
    },
    preference:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:12,
        paddingHorizontal:16,
    }
})