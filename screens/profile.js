import React,{useRef,useEffect,useState,Component} from 'react';
import {View,Text,StatusBar,StyleSheet,Image,TouchableOpacity as Touch,ScrollView,TouchableHighlight} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";

import {
    Avatar,
    Title,
    Caption,
    Card,
   
  } from 'react-native-paper';
  import database from '@react-native-firebase/database';
  import auth from '@react-native-firebase/auth';
  


class ProfileScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            items: [],
            type: [],
            typeReader:'entrepreneur',
            Posts:[],

        }
    }


    componentDidMount(){
        // retrieves data from user database.
        database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot =>{
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
                 this.setState({items:newItems});
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
                  extensionArray =[...extensionArray, newPosts]
              this.setState({Posts:newPosts});
            });                
        }
    })
    }

    render(){
        return(
            <View>
                <StatusBar backgroundColor="#f85900"/>
                <View>
                {this.state.items.map(item=>{
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
                                <Touch onPress={()=>this.props.navigation.navigate("Contacts")}>
                                    <Text style={styles.btn}>Contacts</Text>
                                </Touch>
                                <Touch onPress={()=>this.props.navigation.navigate("editProfile")}>
                                    <Text style={styles.btn}>Edit Profile</Text>
                                </Touch>
                                </View>
                                <View style={styles.projectContainer}>
                                    <Text style={styles.projectTitle}>Projects</Text>
                                    <ScrollView>
                                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                    {
                                        this.state.Posts.map(item=>{
                                            
                                            return(
                                             
                                                <Touch onPress={()=>this.props.navigation.navigate('posts', {paramkey: auth().currentUser.uid})}>
                                                
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

}
export default ProfileScreen;
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
        backgroundColor:"#eb7434"
    
        
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
        backgroundColor:"#eb7434",
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