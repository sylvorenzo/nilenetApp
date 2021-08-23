import React,{Component,useRef, useEffect, useState, createRef} from 'react'
import {View, 
    Text, 
    TextInput, 
    StyleSheet,
    TouchableOpacity as Touch,
    ScrollView,
    StatusBar,
    KeyboardAvoidingView
    
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Card,
  } from 'react-native-paper';
import {PieChart} from 'react-native-chart-kit';    
import RBSheet from "react-native-raw-bottom-sheet";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


class FeedScreen extends Component{
  constructor(props){
    super(props);
      this.refRBSheet = createRef();
      this.refRBSheet1 = createRef();
      this.messageContainer =createRef();
    this.state = {
       users:[],
       query: [],
       sectorOfBusiness: '',
       projects:[],
       Messages:[],
       behaviour: 'Position',
       key:'',
       search:'',
       status:'Add Contact'
    }
  }
  
    
  

    componentDidMount(){
    //retreives user type from database.
    database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot=>{

      if(snapshot.exists()){
        let item = snapshot.val();
    
  
        if(item.type === 'Entrepreneur'){
          database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot=>{
            let Item = snapshot.val();
            this.setState({sectorOfBusiness: Item.sector});
      
      
          })
        }else if(item.type === 'Investor'){
          database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot=>{
            this.setState({sectorOfBusiness:  snapshot.val().sector});
            
          })
        }
      }
    })
  // retrieves entrepreneur Information and then stores it into a state.
  database().ref(`users`).on('value', snapshot =>{
      
      if(snapshot.exists()){
          let userInfo = snapshot.val();
          let userKeys = Object.keys(userInfo);
          const extensionArray = [];
        for(let x = 0; x< userKeys.length; x++){
          
          var key = userKeys[x];
          
          var array = [userInfo[key]];
          array.map(item=>{
            let newItems=[];
            newItems.push({
              id:userKeys[x],
              profileImage: item.profileImage,
              username: item.username,
              surname: item.surname,
              sector: item.sector,
              companyName: item.companyName,
              companyDescription: item.companyDescription,
              token:item.token
            })
            extensionArray[x] = newItems;
            this.setState({users: extensionArray});
          })
              
      
        }    
      }
    });
  
        // retrieves charts data and stores it in a state.
        database().ref(`charts`).on('value', snapshot=>{
          if(snapshot.exists()){
            var chartValues = snapshot.val();
            let chartItems = Object.keys(snapshot.val());
            
            let extensionArray = [];
            for (var x = 0; x < chartItems.length; x++){
      
             var key = chartItems[x];
             var array = [chartValues[key]];
  
                array.map(item =>{
                  let NewItems =[];
                  NewItems.push({
        
                    id: chartItems[x],
                    point1: item.point1,
                    point2: item.point2,
                    point3: item.point3,
                    tag1: item.tag1,
                    tag2: item.tag2,
                    tag3: item.tag3,
                    sectorOfBusiness: item.sector,
                  })
                  extensionArray = [...extensionArray, NewItems];
                  this.setState({query:extensionArray});
                })
            }
          }
        });
  
      // retrieves posts from database and stores it in a state
      database().ref(`posts/entrepreneurs/${this.state.key}`).on('value', snapshot=>{
        if(snapshot.exists()){
          let postValues = snapshot.val();
          let postKeys = Object.keys(postValues);
      
          const extensionArray = [];
            let newItems = [];
          for(let x = 0; x < postKeys.length; x++){
            var keys = postKeys[x];
    
            var parentkey = Object.values(postValues[keys]);
      
            parentkey.map(item=>{
                newItems.push({
                  profileImage: item.profileImage,
                  username: item.username,
                  projectImage: item.projectImage,
                  projectId:item.id,
                  uid: item.uid,
                  projectTitle: item.projectTitle,
                  projectStatus: item.projectStatus,
                  projectDescription: item.projectDescription,
                  token:item.token
                })
                extensionArray[x] =  newItems;
                this.setState({projects: newItems});
            })
          }
        }
  
      })
    }

   

      userProfileDrawerOpener = (userid) => {
        this.refRBSheet.current.open()
        this.setState({key: userid});

      
      
      }
      //handles follow functionality
handleFollow(uid,username,profileImage){
  
  if(this.state.status === 'Add Contact'){

    // stores follower in the contacts section of database of the current user
    database().ref(`contacts/${auth().currentUser.uid}/${this.state.key}`).set({
      uid: uid,
      username: username,
      profileImage: profileImage,
    }).then(this.setState({status: 'Added'}));
  }


  if(this.state.status === 'Added'){
    // if the user unfollows their information is removed from the database.
    database().ref(`contacts/${fire.auth().currentUser.uid}/${this.state.key}`).remove().then(this.setState({status: 'Follow'}))
  }
}

      render(){
        return(
          <View>
            
              <TextInput
                  style={styles.searchBar}
                  placeholder="Search..." 
                  value = {this.state.search}
                  onChangeText={(e)=> this.setState({search:e})}
              />
              <ScrollView>


                  
                  {
                      this.state.query.map(items=>items.map(item=>{
                        
                          if(this.state.sectorOfBusiness.indexOf(this.state.search)>-1){
                              return(
                                  <View style={styles.feedContainer}>
                                  {this.state.users.map(user=>user.map(variable=>{
                                    console.log('sector: ',variable.sector);
                                      if(item.id === variable.id){
                                          return(
                                            <View>
                                              <View style={styles.profileSection}>
                                              <Avatar.Image
                                              
                                                  source={{uri:variable.profileImage}}
                                                  size={50}
                                              />
                                              <Touch onPress={()=> this.props.navigation.navigate('userView',{paramkey:variable.id})}>
                                              <Text style={styles.Title}>{variable.username} {variable.surname}</Text>
                                              </Touch>
                                          
                                              </View>
                                              <PieChart
                                      data={
                                          [
                                              {
                                                name:  item.tag1,
                                                result: item.point1,
                                                color: '#3da6e3',
                                                legendFontColor: "white",
                                                legendFontSize: 10
                                              },
                                              {
                                                name: item.tag2,
                                                result: item.point2,
                                                color: "white",
                                                legendFontColor: "white",
                                                legendFontSize: 10
                                              },
                                              {
                                                name: item.tag3,
                                                result: item.point3,
                                                color: "orange",
                                                legendFontColor: "white",
                                                legendFontSize: 10
                                              },]
                                      }
                                      width={300}
                                      height={200}
                                      chartConfig={{
                                        backgroundGradientFrom: "purple",
                                        backgroundGradientFromOpacity: 0,
                                        backgroundGradientTo: "orange",
                                        backgroundGradientToOpacity: 0.5,
                                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                        strokeWidth: 2, // optional, default 3
                                        barPercentage: 0.5,
                                        useShadowColorFromDataset: false // optional
                                      }}
                                      accessor={"result"}
                                      backgroundColor={"transparent"}
                                      paddingLeft={'10'}
                                      relative
                                  />
                                  <View style={styles.descriptionContainer}>
                                      <Text style={styles.descriptionTxt}>{variable.companyName}</Text>
                                      <Text>{variable.companyDescription}</Text>                            
                                  </View>
                                              </View>
                                          )
                                      }
                                  }))}

                                  </View>
                              )
                          }else if(this.state.sectorOfBusiness.indexOf(this.state.sectorOfBusiness)> -1){
                              return(
                               
                                  <View style={styles.feedContainer}>
                                  {this.state.users.map(user=>user.map(variable=>{
                                      if(item.id === variable.id){
                                          return(
                                            <View>
                                              <View style={styles.profileSection}>
                                              <Avatar.Image
                                              
                                                  source={{uri:variable.profileImage}}
                                                  size={50}
                                              />
                                              <Touch onPress={()=>userProfileDrawerOpener(variable.id)}>
                                                  <Text style={styles.Title}>{variable.username}</Text>
                                              </Touch>
                                              
                                              </View>
                                              <PieChart
                                      data={
                                          [
                                              {
                                                name:  item.tag1,
                                                result: item.point1,
                                                color: 'orange',
                                                legendFontColor: "white",
                                                legendFontSize: 10
                                              },
                                              {
                                                name: item.tag2,
                                                result: item.point2,
                                                color: "white",
                                                legendFontColor: "white",
                                                legendFontSize: 10
                                              },
                                              {
                                                name: item.tag3,
                                                result: item.point3,
                                                color: "gray",
                                                legendFontColor: "white",
                                                legendFontSize: 10
                                              },]                                            
                                      }
                                      width={300}
                                      height={200}
                                      chartConfig={
                                        {
                                          backgroundGradientFrom: "purple",
                                          backgroundGradientFromOpacity: 0,
                                          backgroundGradientTo: "orange",
                                          backgroundGradientToOpacity: 0.5,
                                          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                          strokeWidth: 2, // optional, default 3
                                          barPercentage: 0.5,
                                          useShadowColorFromDataset: false // optional
                                        }
                                      }
                                      accessor={"result"}
                                      backgroundColor={"transparent"}
                                      paddingLeft={'10'}
                                      relative
                                  />
                                  <View style={styles.descriptionContainer}>
                                    <StatusBar barStyle={'dark-content'} backgroundColor={"#e3ded8"} color="orange"/>
                                      <Text style={styles.descriptionTxt}>{variable.companyName}</Text>
                                      <Text>{variable.companyDescription}</Text>                            
                                  </View>

                                              </View>
                                          )
                                      }
                                  }))}

                                </View>
                              ) 
                          }
                      }))
                  }

                  <RBSheet
                    ref={this.refRBSheet}
                    closeOnDragDown={false}
                    closeOnPressMask={false}
                     customStyles={{
                        wrapper: {
                          backgroundColor: "transparent"
                        },
                        draggableIcon: {
                        backgroundColor: "orange"
                        }
                        }}
                        height={800}
                          animationType="fade"
                        >
                        {
                          this.state.users.map(user=>user.map(variable=>{
                            
                              while(variable.id === this.state.key){
                                return(
                                  <ScrollView>
                                  <View style={styles.banner}>
                                    <Touch onPress={()=> this.refRBSheet.current.close()}>
                                       <Text style={styles.bannerBack}>Back</Text>
                                    </Touch>

                                    <Text style={styles.bannerTxt}>{variable.companyName}</Text>
                                  </View>
                               
                                    <View style={styles.child}>
                                        <View style={styles.profileViewerSection}>
                                          <Avatar.Image
                                            source={{uri: variable.profileImage}}
                                            size={150}
                                          />
                                          <Title style={styles.profileViewerSectionTxt}>{variable.username} {variable.surname}</Title>
                                        </View>
                                        <View style={styles.subChild}>
                                            <Touch onPress={()=>this.handleFollow(variable.id, variable.username, variable.profileImage)}>
                                              <Text style={styles.btn}>{this.state.status}</Text>
                                            </Touch>
                                            <Touch onPress={()=>{
                                              this.props.navigation.navigate('Chat', {paramkey: this.state.key, token:variable.token });
                                              this.refRBSheet.current.close()}}>
                                              <Text style={styles.btn}>Message</Text>
                                            </Touch>
                                            
                                        </View>
                                        <View style={styles.projectContainer}>

                                        <Text style={styles.projectTitle}>Projects</Text>
                                        <ScrollView>
                                        <View style={{flexDirection:'row',height:600}}>
                                          {
                                            this.state.projects.map(post=>{
                                              if(variable.id === post.uid){
                                                return(
                                                  <Touch onPress={()=> this.props.navigation.navigate('posts',{paramkey: post.uid})}>
                                                 <Card
                                                  style={{width:150,
                                                    height:150,
                                                    backgroundColor:'transparent',
                                                    margin:10,
                                                    borderColor:'white',
                                                    borderWidth:0

                                                    }}
                                                  >
                                                    <Card.Cover 
                                                    
                                                    style={styles.image}
                                                    source={{uri:post.projectImage}} />
                                                  </Card>                                                
                                                  </Touch>

                                                   
                                                ) 
                                              }
                                            })
                                          }
                                        </View>
                                        </ScrollView>

                                        </View>
                                    </View>

                                  


                                  </ScrollView>

                                  
                                )
                              }
                            
                          }))
                        }
                  </RBSheet>
               
              </ScrollView>
          </View>
      )
  
}
      }
        
export default FeedScreen;

const styles = StyleSheet.create({

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
        backgroundColor:'black',
        
        height:500,
    },
    main:{
        backgroundColor:'#f0f8fa',
    },
    searchBar:{

        marginTop: 20,
        margin:10,
        borderRadius:25,
        borderColor: 'gray',
        borderWidth: 1,
        height:50,
        padding: 12,
        backgroundColor: 'gray'
    }
})