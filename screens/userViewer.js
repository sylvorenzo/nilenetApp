import React,{useEffect,useState} from 'react';
import {Text, View, StyleSheet,ScrollView, TouchableOpacity as Touch,Image } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {
    Avatar,
    Title,
    Caption,
    Card,
   
  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function userViewerScreen({route}){
    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const [Posts, setPosts] = useState([]);
    const [status, setStatus] = useState('Add Contact');
    const key  = route.params.paramkey;
    useEffect(()=>{
        database().ref(`users/${route.params.paramkey}`).on('value', snapshot =>{
            if(snapshot.exists()){
                 let Items = snapshot.val();
                 let newItems = [];
                 for(let x = 0; x< 1; x++){
                 
                     newItems.push({
                         username: Items.username,
                         surname:Items.surname,
                         companyName: Items.companyName,
                         profileImage: Items.profileImage,
                         sector: Items.sector,
                         type:Items.type
                             
                     });
             
                 }
                 setItems(newItems);
            }
 
        });

            //gets user posts from database and stores it in a variable
    database().ref(`posts/entrepreneurs/${auth().currentUser.uid}`).orderByValue().on('value',snapshot=>{
            
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
                  extensionArray = [...extensionArray,newPosts];
              setPosts(newPosts);
            });                
        }
    })
    },[]);

          //handles follow functionality
function handleFollow(uid,username,profileImage){
  
    if(status === 'Add Contact'){
  
      // stores follower in the contacts section of database of the current user
      database().ref(`contacts/${auth().currentUser.uid}/${route.params.paramkey}`).set({
        uid: uid,
        username: username,
        profileImage: profileImage,
      }).then(setStatus('Added'));
    }
  
  
    if(status === 'Added'){
      // if the user unfollows their information is removed from the database.
      database().ref(`contacts/${auth().currentUser.uid}/${route.params.paramkey}`).remove().then(setStatus('Add Contact'));
    }
  }

    return(
        <View>
          <View>
                {items.map(item=>{
                    console.log(item)
                    return(
                        <ScrollView>
                            <View style={styles.profileContainer}>
                            <View style={styles.profileSection}>
                
                                <Avatar.Image
                                style={{borderWidth: 1,
                                    borderColor:'white'}}
                                source={{
                                uri:item.profileImage
                            }}
                                size={150}
                                />
                            <Title style={styles.title}>{item.username} {item.surname}</Title>
                           
                           <Text style={styles.caption}>{item.type}</Text>  
                            
                            </View>
    
                            <View style={styles.childContainer}>
                                <View style={{flexDirection:'row'}}>
                                <Touch onPress={()=>handleFollow(item.uid,item.username,item.profileImage)}>
                                    <Text style={styles.btn}>{status}</Text>
                                </Touch>
                                <Touch onPress={()=>navigation.navigate("Chat",{paramkey: key })}>
                                    <Text style={styles.btn}>Message</Text>
                                </Touch>
                                </View>
                                <View style={styles.projectContainer}>
                                    <Text style={styles.projectTitle}>Projects</Text>
                                    <ScrollView>
                                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                    {
                                        Posts.map(item=>{
                                            console.log(item.projectImage)
                                            return(
                                             
                                                <Touch onPress={()=>navigation.navigate('posts', {paramkey: key})}>
                                                
                                                <Image style={{
                                                    width:170,
                                                    height:170,
                                                    margin:2
                                                }}
                                                source={{uri: item.projectImage}}
                                                />    
                                                

                                            </Touch>
                                              

                                              
                                              
                                            )
                                        })
                                    }
    
                                    </View>
                                    </ScrollView>
                                </View>
                            </View>
                            </View>
                        </ScrollView>
    
                    )
                    })}
                </View>
            </View>
                                  
        
    )
}
export default userViewerScreen;

const styles = StyleSheet.create({
    image:{
        width:150,
        height:150,
        resizeMode:'contain',
        
    
    },
    projectTitle:{
        textAlign:'center',
        fontFamily:'Georgia,serif',
        fontSize:25,
        fontWeight: 'bold',
        paddingTop: 50,
        paddingBottom:5,
        borderBottomWidth: 1,

    },
    projectContainer:{
        textAlign:'center',
        height:600,
        backgroundColor:'white'
    },
    childContainer:{
    
        borderTopRightRadius:15,
        borderTopLeftRadius: 15,
        backgroundColor:'white'
    },
    profileContainer:{
        backgroundColor:'black'
    
        
    },
    btn:{
        marginTop: 20,
        marginLeft:10,
        width: 165,
        padding:10,
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        borderRadius: 5,
        fontSize:20,
        fontFamily:'Georgia,serif',
        backgroundColor:'orange',
    },
    profileSection:{

        paddingTop: 30,
        paddingLeft: 100,
        backgroundColor:'black',
        justifyContent:'center',
        
    },
    title:{
        fontSize:16,
        margin:0,
        paddingTop:20,
        marginRight:75,
        fontWeight:'bold',
        textAlign: 'center',
        color:'white',
        fontFamily:'Georgia, serif',
        backgroundColor:'black',
        fontSize: 20,
    },
    caption:{
        flexDirection:'column',
        fontSize:14,
        lineHeight:20,
        marginTop:10,
        fontSize:20,
        marginRight:65,
        marginBottom:30,
        textAlign:'center',
        color:'white',
    },
})