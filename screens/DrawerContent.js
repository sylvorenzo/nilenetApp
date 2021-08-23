import React,{useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
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
    // create state variables.
    var [items, setItems] = useState([]);
    var [type, setType] = useState('entrepreneur');
    var [typeReader, setTypeReader] = useState('');
    useEffect(()=>{

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

    },[])
    const {signOut} = useContext(AuthContext);
    return(
        <View style={{flex:1}}>
           <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',paddingTop:15, backgroundColor:'gray'}}>
                            {items.map(item=>{
                            
                                return(
                                    <View>
                                    <Avatar.Image
                                    style={{alignSelf:'center', }}
                                    source={{
                                    uri:item.profileImage
                                    }}
                                    size={60}
                                    />
                                    <View style={{marginLeft:15, flexDirection:'column'}}>
                                        <Title style={styles.title}>{item.username} {item.surname}</Title>
                                        <Caption style={styles.caption}>{item.type}</Caption>
                                    </View>
                                    </View>

                                )
                            })}
                    
                        </View>
                       
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                    <Drawer.Item
                            icon={({color,size}) => (
                            <MaterialCommunityIcons
                                name='account-outline'
                                color={color}
                                size={size}
                            />)}
                            label='Profile'
                            onPress={()=>{props.navigation.navigate('Profile')}}
                        />
                        <Drawer.Item
                            icon={({color,size}) => (
                            <MaterialCommunityIcons
                                name='book-multiple-outline'
                                color={color}
                                size={size}
                            />)}
                            label='Resources'
                            onPress={()=>{props.navigation.navigate('Resources')}}
                        />
                        <Drawer.Item
                            icon={({color,size}) => (
                            <MaterialCommunityIcons
                                name='account-group-outline'
                                color={color}
                                size={size}
                            />)}
                            label='Support'
                            onPress={()=>{props.navigation.navigate('support')}}
                        />

                    </Drawer.Section>
                </View>
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
    drawerContent:{
        
    },
    userInfoSection:{
        backgroundColor:'black'
    },
    title:{
        fontSize:16,
        color:'white',
        marginTop:3,
        fontWeight:'bold',
    },
    caption:{
        fontSize:14,
        lineHeight:14,
        color:'white'
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
        marginTop:15,

    },
    bottomDrawerSection:{
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