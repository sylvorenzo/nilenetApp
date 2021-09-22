import React, {useState,useEffect} from 'react';
import {ActivityIndicator,View,Text,StatusBar ,ImageBackground,StyleSheet, ScrollView,TextInput, TouchableOpacity as Touch} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import background from '../assets/launch_screen.jpg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// this is the page where the one-to-one chat occurs between users.
import {
    Avatar,
    Title,
    Caption,
    Card,
  } from 'react-native-paper';



function ChatScreen({route}){
  // this is where the parsed user id is stored.
  const parsedUser = route.params.paramkey;
  
  const [isLoading, setIsLoading] = useState(true); // this is the constant used to control the activity indicator.
    const  messageArray =[]; // the data is retrieved and stored in this array.
    const [token,setToken] = useState(''); // this is where the token is stored and used for cloud messaging.
    const [username, setUsername] = useState(''); // the username which is retrieved from database is stored in this state.
    const [surname, setSurname] = useState(''); // the surname which is retrieved from database is stored in this state.

    const[messages,setMessages] =useState([]);// used to store data from database
   var [users,setUsers] = useState([]);// used to store data from database
    const [items, setItems]= useState({
      message:'', // used to store user input.
      

    })

  useEffect(()=>{
    //Activity Indicator controller logic
    if(messages === null){
               
              
      setIsLoading(true);
    }else if(messages != null){
      setIsLoading(false);
    }
    // retrieves parsed user data from database.
    database().ref(`users/${parsedUser}`).once('value', snapshot =>{
      if(snapshot.exists()){
           const Items = snapshot.val();
          
           var newItems = [];
           
           
           for(let x = 0; x< 1; x++){

               newItems.push({
                   username: Items.username,
                   surname:Items.surname,
                   profileImage: Items.profileImage,
                   token: Items.token
                  
                       
               });
               // stores data in users variable.
               setUsers(users = newItems);
       
           }
          
      }

  });

  //gets the current users data from database.
  database().ref(`users/${auth().currentUser.uid}`).once('value', snapshot =>{
    if(snapshot.exists()){
         const Items = snapshot.val();

         setUsername(Items.username);
         setSurname(Items.surname);
         
         
         
        
    }

});

// gets parsed users token so that it may be used for cloud messaging.
database().ref(`mykey/${parsedUser}`).once('value', snap=>{
  if(snap.exists()){
    setToken(snap.val().token);
  }
})
  
      // retrieves chat information and stores it into a state variable.
      database().ref(`chats/${auth().currentUser.uid + parsedUser}/`).on('value', childshot=>{
        if(childshot.exists()){
          // gets database keys
          const keys = Object.keys(childshot.val());
          
          keys.sort();
          for(let x = 0; x < keys.length;x++){
            // use keys to gain access to the unique session
            database().ref(`chats/${auth().currentUser.uid + parsedUser}/${keys[x]}`).on('value', snap=>{
              if(snap.exists()){
                
                var data = {
                  chatUid: snap.val().chatUid,
                  time:snap.val().time,
                  message: snap.val().message,
                  uid: snap.val().uid,
                  messagId: snap.val().messageId,
                }
                messageArray[x] = data;
                
                
                
              }
              setMessages(messageArray);

            })
              
            

           
          
          }
          
            
          
         
            
        }

          
      })
  },[])
 
  
// handles message send functionality
 const handleMessage = ()=>{
    const CurrentUid = auth().currentUser.uid;
        
    const sessionId = CurrentUid + parsedUser;
    const alternateSessionId = parsedUser + CurrentUid;
  
    // these three variables are used to create the time in a specific format.
    var messageId = Date.now();
    var today = new Date();
    var time = today.getHours() + ':' + ((today.getMinutes() < 10 ? '0': '') + today.getMinutes());
  
  // saves data to database
    database().ref(`chats/${sessionId}/${messageId}`).set({
        messageId: messageId,
        chatUid: sessionId,
        message: items.message,
        time: time,
        uid: CurrentUid
    })
    // saves data to database for the other user
    database().ref(`chats/${alternateSessionId}/${messageId}`).set({
        messageId: messageId,
        chatUid: sessionId,
        message: items.message,
        time: time,
        uid: CurrentUid
    })
   
    // uses the api the send the cloud message.
    fetch('https://us-central1-nilenet-c9b39.cloudfunctions.net/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tokens: [token],
        notification:{
          title: username ,
          body:items.message
        }


      })
    });
    // clears message once it has been sent.
   setItems({message:''});

   
  
  }
  


    return(
      <View>
        
        <View>
          <StatusBar backgroundColor="#f85900"/>
        <ImageBackground source={background} style={{height:675}}>
          {users.map(item=>{
           
            return(
              <View style={{flexDirection:'column',backgroundColor:'transparent',padding:10,}}>
                <Avatar.Image
                  style={{borderWidth: 1,
                        borderColor:'white',
                      alignSelf:'center'}}
                        source={{
                        uri:item.profileImage
                        }}
                        size={80}
                />
                <Text style={styles.profileTxt}>{item.username} {item.surname}</Text>
              </View>
            )
          })}
          
          <ScrollView style={{height:520}}>
            
            {isLoading ?(

              <ActivityIndicator size="large" color="orange"/>
            ):(
              messages.map(item=>{
                
                if(item.chatUid === (auth().currentUser.uid + route.params.paramkey)){
                  if(item.uid === auth().currentUser.uid){
                    return(
                      <View style={styles.senderContainer}>
                        <Text style={styles.receiverTxt}>{item.message}</Text>
                        <Text style={styles.receiverTime}>{item.time}</Text>
                      </View>
                    
                    )
                  }else if(item.uid === route.params.paramkey){
                    return(
                    
                      <View style={styles.receiverContainer}>
                        <Text style={styles.receiverTxt}>{item.message}</Text>
                        <Text style={styles.receiverTime}>{item.time}</Text>
                      </View>
                    
                    )
                  }
                }else if(item.chatUid === route.params.paramkey + auth().currentUser.uid){
                  if(item.uid === route.params.paramkey){
                    return(
                      
                      <View style={styles.receiverContainer}>
                        <Text style={styles.receiverTxt}>{item.message}</Text>
                        <Text style={styles.receiverTime}>{item.time}</Text>
                      </View>
                    
                    )
                  }else if(item.uid === auth().currentUser.uid){
                    return(
                      <View style={styles.senderContainer}>
                        <Text style={styles.receiverTxt}>{item.message}</Text>
                        <Text style={styles.receiverTime}>{item.time}</Text>
                      </View>
                    
                    )
                  }
                }
                
                 
              })
            )}
            
            
          </ScrollView>
         
          <View style={{flexDirection:'row', paddingBottom:40,}}>
            
          <TextInput
                style={styles.textInput}
                placeholder={'Type a message...'}
                onChangeText={(e)=>setItems({message:e})}
                value={items.message}
              />
          <Touch onPress={React.useCallback(()=>handleMessage())}>
            
            <MaterialCommunityIcons name="arrow-right-circle" color="white" size={38} style={{marginTop:15,}} />
              
            
          </Touch>           
          </View>
          </ImageBackground>
        </View>
      
      </View>
  )
}
export default ChatScreen;

// styles constant for this specific page.
const styles = StyleSheet.create({
  textInput:{
    
    margin:10,
    paddingLeft:10,
    color: 'black',
    borderWidth: 1,
    width:300,
    borderColor:'orange',
    backgroundColor:'white',
    borderRadius: 25,
    
    


},
    profileTxt:{
      padding: 5,
      paddingTop:10,
      paddingLeft:5,
    
      color:'black',
      alignSelf:'center',
      fontFamily:'Georgia, serif',
      fontWeight:'bold',
      fontSize: 20,
      
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
      minWidth:5,
      maxWidth:200,
      
      
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
      fontSize:15,
      paddingTop: 5,
      paddingLeft: 10,
    },
  
    image:{
      width:150,
      height:150,
      resizeMode:'contain',
  },

   
    
  })