import React, { useEffect, useState} from 'react'
import {ScrollView,View, Text, StyleSheet} from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Card} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

function MyPostScreen({route}){

    const [ProjectPosts, setProjectPost] = useState([]);

    useEffect(()=>{

      //gets user posts from database and stores it in a variable
      database().ref(`posts/entrepreneurs/${route.params.paramkey}`).orderByValue().on('value',snapshot=>{
            
        if(snapshot.exists()){
            let projectId = Object.values(snapshot.val());  
            let newPosts = [];
            

            Object.values(projectId).forEach(childsnapshot =>{
       
              
                  newPosts.push({
                      profileImage: childsnapshot.profileImage,
                      username: childsnapshot.username,
                      projectImage: childsnapshot.projectImage,
                      projectId:childsnapshot.id,
                      projectTitle: childsnapshot.projectTitle,
                      projectStatus: childsnapshot.projectStatus,
                      projectDescription: childsnapshot.projectDescription
                  })
                  
                setProjectPost([newPosts]);
            });                
        }
    })
    
    
    },[])
    // handles post delete functionality.
    function removePost(projectId){
        database().ref(`public/posts/${projectId}`).remove();
        database().ref(`posts/entrepreneurs/${auth().currentUser.uid}/${projectId}`).remove();
    }
  
    return(
        <ScrollView>
            {ProjectPosts.map(item=>item.map(post=>{
                
                console.log(item)
    
                
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
                            {
                                auth().currentUser.uid === route.params.paramkey ?(
                                    <View style={{paddingTop:110, paddingLeft:300}}>
                                        <TouchableOpacity onPress={()=>removePost(post.projectId)}>
                                            <MaterialCommunityIcons
                                                name="trash-can"
                                                size={30}
                                                color="#f85900"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ):(
                                    <View>

                                    </View>
                                )

                                
                            }
                            
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