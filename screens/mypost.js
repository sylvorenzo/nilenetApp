import React, {Component, useEffect, useState} from 'react'
import {ScrollView,View,Image, Text, StyleSheet} from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { DrawerItemList } from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Card,
  } from 'react-native-paper';

function MyPostScreen({route}){

    console.log(route.params.paramkey);
    var [ProjectPosts, setProjectPost] = useState([]);

    useEffect(()=>{

      //gets user posts from database and stores it in a variable
      database().ref(`posts/entrepreneurs/${route.params.paramkey}`).orderByValue().on('value',snapshot=>{
            
        if(snapshot.exists()){
            let projectId = Object.values(snapshot.val());  
            let newPosts = [];
            var extensionArray =[];

            let projectChildren = Object.values(projectId).forEach(childsnapshot =>{
       
              
                  newPosts.push({
                      profileImage: childsnapshot.profileImage,
                      username: childsnapshot.username,
                      projectImage: childsnapshot.projectImage,
                      projectId:childsnapshot.id,
                      projectTitle: childsnapshot.projectTitle,
                      projectStatus: childsnapshot.projectStatus,
                      projectDescription: childsnapshot.projectDescription
                  })
                  extensionArray =[...extensionArray, newPosts]
                setProjectPost(ProjectPosts = extensionArray);
            });                
        }
    })
    
    
    },[])
  
    return(
        <ScrollView>
            {ProjectPosts.map(item=>item.map(post=>{
                
                console.log(post)
    
                
                    return(
                        <View style={styles.feedContainer}>
                        <Card style={styles.card}>
                            <Card.Cover
                                source={{uri: post.projectImage}}
                                style={{
                                        width:340,      
                                        height:280
                                    }}
                            />
                            <Text style={styles.Title}>{post.projectTitle}</Text>
                            <Text>{post.projectStatus}</Text>
                            <Text>{post.projectDescription}</Text>
                        </Card>
                        
                            
                        
                            
                        </View>

                    )
                

                


                }
            ))}
        </ScrollView>
    )
   
}
export default MyPostScreen;
const styles = StyleSheet.create({
    Title:{
        color:'black',
        fontFamily:'Georgia, serif',
        fontWeight:'bold',
        paddingTop:10,
        fontSize:16,
        paddingLeft:10,
        
    },
    feedContainer:{
        
        margin:10,
        borderRadius:10,
        backgroundColor:'white',
        
        height:500,
    },
    card:{
        
        height: 200,
        justifyContent:'center'
    },

})