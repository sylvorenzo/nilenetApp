import React,{Component} from 'react'
import {View, 
    Text, 
    TextInput, 
    StyleSheet,
    TouchableOpacity as Touch,
    ScrollView,
    StatusBar,
  
    
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {PieChart} from 'react-native-chart-kit';    
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// this is where the feed content is programmed
class FeedScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
       users:[],
       query: [],
       sectorOfBusiness: '',
       projects:[],
       Messages:[],
       behaviour: 'Position',
       key:'',
       search:'',
       status:'Add Contact',
       statistic: []
    }
  }
  
    
  

    componentDidMount(){
    //retreives user type from database.
    database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot=>{

      if(snapshot.exists()){
        let item = snapshot.val();
    
        //handles whether the user is an entrepreneur or investor
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

            // stores database keys in chart items.
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
                  extensionArray[x] = NewItems;
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
      // retrieves stats data from database.
      database().ref(`stats`).on('value',snapshot=>{
        if(snapshot.exists()){
           const stats = snapshot.val();
           
          // stores database keys in keys variable.
           var keys = Object.keys(stats);
          //loops through keys
           for(let x = 0; x < keys.length; x++){

              var key = keys[x];
              //accesses stats data for each key
             database().ref(`stats/` + `${key} `).on('value',snap=>{
               if(snap.exists()){
                  const items = snap.val();
                  const extensionArray = [];
                  console.log('items: ', items);
                  var newItems = [];
                  newItems.push({
                    Capital: items.Capital,
                    Competitors: items.Competitors,
                    Employees: items.Employees,
                    Experience: items.Experience,
                    Milestones: items.Milestones,
                    uid: items.uid,
                    sector: items.sectorOfBusiness
                  });
                  extensionArray[x] = newItems;
                  this.setState({statistic: extensionArray})


               }
             })
           }

        }
      })
    }

   
      // parses user id to the user view page
      userProfileDrawerOpener = (userid) => {
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
            <View style={{backgroundColor:'#f85900', height:100, borderBottomRightRadius:25,}}>
            <TextInput
                  style={styles.searchBar}
                  placeholder="Search..." 
                  value = {this.state.search}
                  onChangeText={(e)=> this.setState({search:e})}
              />
            </View>

              <ScrollView>
                  {
                      this.state.query.map(items=>items.map(item=>{
                        return(
                          <View style={styles.feedContainer}>
                          <StatusBar barStyle={'dark-content'} backgroundColor={"#f85900"} color="orange"/>
                          {this.state.users.map(user=>user.map(variable=>{                             
                            if(variable.sector == this.state.search){
                              if(item.id == variable.id){
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
                                              },
                                            ]
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
                                          backgroundColor={"black"}
                                          paddingLeft={'10'}
                                          relative
                                    />
                                    <View style={styles.descriptionContainer}>
                                        <Text style={styles.descriptionTxt}>{variable.companyName}</Text>
                                        <Text>{variable.companyDescription}</Text> 
                                        {this.state.statistic.map(values=>values.map(value=>{
  
                                          if(item.id === value.uid){
                                            return(
                                              <View>
                                                <Text style={styles.header}>EMPLOYEES </Text>
                                                    <Text style={styles.result}>{value.Employees} </Text>
                                                <Text style={styles.header}>CAPITAL </Text>
                                                  <Text style={styles.result}>R{value.Capital}</Text>
          
                                                <Text style={styles.header}>COMPETITORS  </Text>
                                                <Text style={styles.result}>{value.Competitors} </Text>
  
                                                <Text style={styles.header}>MANAGMENT EXPERIENCE </Text>
                                                <Text style={styles.result}>{value.Experience} </Text>
          
                                                <Text style={styles.header}>MILESTONES  </Text>
                                                <Text style={styles.result}>{value.Milestones} </Text>
                                                
                                                      </View>
                                                    )
                                                  }
                                                }))}
                                                              
                                            </View>
                                            
                                            </View>
                                            )
                                          }
                                          
                                        }else  if(this.state.search === ''){
                                          return(
                                           
                                              <View >
                                              {this.state.users.map(user=>user.map(variable=>{
                                                  if(item.id === variable.id){
                                                      return(
                                                        <View>
                                                          <View style={styles.profileSection}>
                                                          <Avatar.Image
                                                          
                                                              source={{uri:variable.profileImage}}
                                                              size={50}
                                                          />
                                                          <Touch onPress={()=>this.props.navigation.navigate('userView',{paramkey:variable.id})}>
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
                                                
                                                  <Text style={styles.descriptionTxt}>{variable.companyName}</Text>
                                                  <Text>{variable.companyDescription}</Text>    
                                                  {this.state.statistic.map(values=>values.map(value=>{
            
                                                    console.log('value: ', value);
                                                    if(item.id = value.uid){
                                                      return(
                                                        <View>
                                                    <Text style={styles.header}>EMPLOYEES </Text>
                                                      <Text style={styles.result}>{value.Employees} </Text>
                                                    <Text style={styles.header}>CAPITAL </Text>
                                                    <Text style={styles.result}>R{value.Capital}</Text>
            
                                                    <Text style={styles.header}>COMPETITORS  </Text>
                                                    <Text style={styles.result}>{value.Competitors} </Text>
            
                                                    <Text style={styles.header}>MANAGMENT EXPERIENCE </Text>
                                                    <Text style={styles.result}>{value.Experience} </Text>
            
                                                    <Text style={styles.header}>MILESTONES  </Text>
                                                    <Text style={styles.result}>{value.Milestones} </Text>
            
                                                        </View>
                                                      )
                                                    }
                                                    }))}                        
                                              </View>
            
                                              </View>
                                                      )
                                                  }
                                              }))}
            
                                            </View>
                                          ) 
                                    }
                                  }))}

                                  </View>
                              )
                    }))
                  }
              </ScrollView> 
          </View>
      )
  
    }
}
        
export default FeedScreen;

const styles = StyleSheet.create({

 header:{
  fontFamily:'Georgia,serif',
  alignSelf:'center',
  fontSize:15,
  marginTop: 10,
  fontWeight: 'bold',
 },
 result:{
    color: 'orange',
    fontFamily:'Georgia, serif',
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf:'center',
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
        minHeight:350,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        marginBottom:10,
        
    }, 
    feedContainer:{
        
        margin:10,
        borderRadius:10,
        backgroundColor:'black',
        
        height:600,
    },
    main:{
        backgroundColor:'#f0f8fa',
    },
    searchBar:{

        marginTop: 20,
        margin:10,
        borderRadius:25,
        borderColor: 'white',
        borderWidth: 1,
        height:50,
        padding: 12,
        color:'black',
        backgroundColor: 'white'
    }
})