import React,{Component} from 'react';
import {View,
    Text,
    StatusBar,
    TextInput, 
    StyleSheet,
    ScrollView,
    TouchableOpacity as Touch,
    Image} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {
    Avatar,
    Title,
    Caption,
    Card,
  } from 'react-native-paper';


class ProjectScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            Posts:[],
            search:'',
            items:[], 
            currentToken:''
        }
    }
    componentDidMount(){
        // retrieves posts from database
   database().ref(`public/posts/`).on('value',snapshot=>{
        if(snapshot.exists()){
        let projectId = Object.values(snapshot.val());
        let newPosts = [];
        Object.values(projectId).forEach(childsnapshot =>{
    
            
                newPosts.push({
                    projectImage: childsnapshot.projectImage,
                    projectId:childsnapshot.id,
                    projectTitle: childsnapshot.projectTitle,
                    projectStatus: childsnapshot.projectStatus,
                    projectDescription: childsnapshot.projectDescription,
                    username: childsnapshot.username,
                    surname: childsnapshot.surname,
                    profileImage: childsnapshot.profileImage,
                    uid: childsnapshot.uid,
                })
            
            this.setState({Posts: newPosts});
      
            });       
        }
        });

            // retrieves entrepreneur data from database
     database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot =>{
        if(snapshot.exists()){
            let Items = snapshot.val();
            this.setState({
                username: Items.username,
                surname:Items.surname,
                profileImage: Items.profileImage,
                sectorOfBusiness:Items.sector
            });
    
           let newItems = [];
           for(let x = 0; x< 1; x++){
                newItems.push({
                username: Items.username,
                surname:Items.surname,
                profileImage: Items.profileImage,
                sectorOfBusiness:Items.sector
                 });
            } 
            this.setState({items: newItems});
        }

    });

    messaging()
    .getToken()
    .then((fcmToken) => {
      

      //saves token data to database.
      database().ref(`mykey/${auth().currentUser.uid}`).set({
        token: fcmToken
      }).catch(error=>{
        console.log("error: ",error)
      }).then(console.log('Token success'));
    });


    
    }
    render(){
     
        return(
            <View>
                <StatusBar backgroundColor="#f85900"/>
                <View style={{backgroundColor:'#f85900', height:100, borderBottomRightRadius:25,}}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search..." 
                    value={this.state.search}
                    onChangeText={(e)=> this.setState({search:e})}
                />
                </View>

                <ScrollView>
                  {
                  this.state.Posts.map(items=>{
                    if(items !=null){
                        return(
                            <View style={styles.feedContainer}>
                                {this.state.items.map(item=>{
                              
                                    if(item.sectorOfBusiness == this.state.search){
                                          return(
                                              <View>
                                              <View style={styles.profileSection}>

                                                <Touch onPress={()=>this.props.navigation.navigate('userView', {paramkey:items.uid})} >
                                                <Avatar.Image
                                                  
                                                  source={{uri:items.profileImage}}
                                                  size={50}
                                              />
                                                </Touch>

                                              <Touch onPress={()=>this.props.navigation.navigate('Chat',{paramkey: items.uid})}>
                                                  <Text style={styles.Title}>{items.username} {items.surname}</Text>
                                              </Touch>
                                              </View>
                                              <Card style={styles.card}>
                                                  <Card.Cover
                                                      source={{uri: items.projectImage}}
                                                      style={{
                                                          width:340,
                                                      
                                                          height:280
                                                      }}
                                                  />
                                                  <Text style={styles.Title}>{items.projectTitle}</Text>
                                                  <Text>{items.projectStatus}</Text>
                                                  <Text>{items.projectDescription}</Text>
                                              </Card>
                                              <View>
                                               
                                              </View>
  
                                              </View>
                                              
                                          )
                                    }else if(this.state.search === ''){
                                      
                                      return(
                                          <View>
                                          <View style={styles.profileSection}>
                                            <Touch onPress={()=>this.props.navigation.navigate('userView',{paramkey:items.uid})}>
                                            
                                          <Avatar.Image
                                              
                                              source={{uri:items.profileImage}}
                                              size={60}
                                          />
                                          </Touch>
                                      
                                          <Touch onPress={()=> this.props.navigation.navigate('Chat',{paramkey: items.uid})} >
                                              <Text style={styles.Title}>{items.username} {items.surname}</Text>
                                          </Touch>
                                          </View>
                                          <Card style={styles.card}>
                                              <Card.Cover
                                                  source={{uri: items.projectImage}}
                                                  style={{
                                                      width:340,
                                                  
                                                      height:280
                                                  }}
                                              />
                                          <Text style={styles.Title}>{items.projectTitle}</Text>
                                          <Text>{items.projectStatus}</Text>
                                          <Text>{items.projectDescription}</Text>
                                          </Card>
                                  
  
                      
                                          </View>
                                          
                                      )
                                    }
                                })}
                            </View>
                        )                        
                    }

                  })}  
                </ScrollView>

            </View>
        )
    }

}
export default ProjectScreen;

const styles = StyleSheet.create({
    card:{
        marginTop:25,
        height: 200,
        justifyContent:'center'
    },
    sendContainer:{
        backgroundColor:'white',
        height:100,
    },
   
    receiverTime:{
      color:'white',
    },
    receiverTxt:{
    
      color:'white',
      fontFamily:'Georgia,serif',
      fontSize:15,
    },
  
    receiverContainer:{
        backgroundColor:'orange',
        minHeight:50,
        maxWidth:300,
        padding:10,
        marginTop:10,
        marginLeft:53,
        borderTopLeftRadius:30,
        
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30
    },
  
    senderContainer:{
      backgroundColor:'black',
      padding:10,
      borderBottomRightRadius:30,
      borderTopRightRadius:30,
      borderTopLeftRadius:30,
      maxWidth:300,
      minHeight:50,
      marginTop:10,
      marginLeft: 5,
    },
    senderTime:{
      flexDirection:'column',
      color:'white',
      marginLeft:235,
  
    },
    senderTxt:{
      color:'white',
      fontFamily:'Georgia,serif',
      fontSize:15,
      backgroundColor:'black',
    },
  
    messageContainer:{
      height:520,
      backgroundColor:'gray',
      marginBottom:10,
    },
    messageTitle:{
      color:'white',
      fontFamily: 'Georgia,serif',
      fontWeight:'bold',
      fontSize:20,
      paddingTop: 20,
      paddingLeft: 30,
    },
  
    image:{
      width:150,
      height:150,
      resizeMode:'contain',
  },
    projectTitle:{
      textAlign:'center',
      fontFamily:'Georgia,serif',
      fontSize:25,
      color:'black',
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
    child:{
      backgroundColor:'black'
    },
    subChild:{
      flexDirection:'row',
      backgroundColor:'white',
      borderTopLeftRadius: 50,
    },  
    profileViewerSectionTxt:{
      color:'white',
      fontFamily:'Georgia,serif',
      fontWeight:'bold',
      fontSize:20,
      paddingTop: 10,
    
    },
      profileViewerSection:{
  
        paddingLeft: 100,
        paddingTop:30,
        backgroundColor:'black',
        justifyContent:'center',
      },
      bannerBack:{
          padding: 10,
          fontFamily:'Georgia,serif',
          fontSize:20,
      },
      bannerTxt:{
        fontFamily:'Georgia,serif',
        fontSize: 25,
        fontWeight:'bold',
        paddingTop: 10,
        paddingLeft:70,
      },
      banner:{
        flexDirection:'row',
        backgroundColor:'#e3ded8',
        height:50,
  
      },
      Title:{
          color:'black',
          fontFamily:'Georgia, serif',
          fontWeight:'bold',
          paddingTop:10,
          fontSize:16,
          paddingLeft:10,
          
      },
      profileSection:{
          flexDirection:'row',
          backgroundColor:'white',
          height:50,
          padding:10,
          borderTopRightRadius:10,
          borderTopLeftRadius:10
      },
      descriptionTxt:{
          padding:10,
          color:'black',
          fontFamily:'Georgia, serif',
          fontSize: 20,
  
      },
      descriptionContainer:{
          backgroundColor:'white',
          minHeight:250,
          borderBottomRightRadius:10,
          borderBottomLeftRadius:10,
          marginBottom:10,
          
      }, 
      feedContainer:{
          
          margin:10,
          borderRadius:10,
          backgroundColor:'white',
          
          height:500,
      },
      main:{
          backgroundColor:'#f0f8fa',
      },
      searchBar:{
  
          marginTop: 20,
          margin:10,
          borderRadius:25,
          borderColor: 'white',
          height:50,
          borderWidth: 1,
          padding: 12,
          color:'black',
          backgroundColor: 'white'
      }
  })