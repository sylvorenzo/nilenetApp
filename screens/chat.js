import React, {useState,useCallback,useEffect} from 'react';
import {Alert ,ActivityIndicator,View,Text,StatusBar ,ImageBackground,StyleSheet, ScrollView,TextInput, TouchableOpacity as Touch} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import io from "socket.io-client";
import { GiftedChat } from 'react-native-gifted-chat';
import background from '../assets/launch_screen.jpg';


import {
    Avatar,
    Title,
    Caption,
    Card,
  } from 'react-native-paper';



function ChatScreen({route}){
  
  const parsedUser = route.params.paramkey;
  const [isLoading, setIsLoading] = useState(true);

    
    const  messageArray =[];
    const [token,setToken] = useState('');
    const [username, setUsername] = useState('')
    const [surname, setSurname] = useState('');

    const[messages,setMessages] =useState([]);
    const[users,setUsers] = useState([]);
    const [items, setItems]= useState({
      message:'',
      

    })

 
   




  useEffect(()=>{
    if(messages === null){
               
              
      setIsLoading(true);
    }else if(messages != null){
      setIsLoading(false);
    }
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

               setUsers(newItems);
       
           }
          
      }

  });
  database().ref(`users/${auth().currentUser.uid}`).once('value', snapshot =>{
    if(snapshot.exists()){
         const Items = snapshot.val();
         setUsername(Items.username);
         setSurname(Items.surname);
         
         
         
        
    }

});
database().ref(`mykey/${parsedUser}`).once('value', snap=>{
  if(snap.exists()){
    setToken(snap.val().token);
  }
})
  
      // retrieves chat information and stores it into a state variable.
      database().ref(`chats/${auth().currentUser.uid + parsedUser}/`).on('value', childshot=>{
        if(childshot.exists()){
          const keys = Object.keys(childshot.val());
        
          keys.sort();
          for(let x = 0; x < keys.length;x++){
            
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
 
  

 const handleMessage = (e,parsedUid)=>{
    const CurrentUid = auth().currentUser.uid;
        
    const sessionId = CurrentUid + parsedUser;
    const alternateSessionId = parsedUser + CurrentUid;
  
     console.log("session id: ", sessionId)
     
    
  
    var messageId = Date.now();
    var today = new Date();
    var time = today.getHours() + ':' + ((today.getMinutes() < 10 ? '0': '') + today.getMinutes());
  
  
    database().ref(`chats/${sessionId}/${messageId}`).set({
        messageId: messageId,
        chatUid: sessionId,
        message: items.message,
        time: time,
        uid: CurrentUid
    })
    database().ref(`chats/${alternateSessionId}/${messageId}`).set({
        messageId: messageId,
        chatUid: sessionId,
        message: items.message,
        time: time,
        uid: CurrentUid
    })
    database().ref(`messageInstance/${auth().currentUser.uid}`).set({
        token: token,
        title: `${username} ${surname}`,
        body:items.message
    });

    fetch('https://us-central1-nilenet-c9b39.cloudfunctions.net/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tokens: [token],
        notification:{
          title: username,
          body:items.message
        }


      })
    });
   setItems({message:''});

   
  
  }
  


    return(
      <View>
        
        <View>
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
                console.log(item);
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
         
          <View style={{flexDirection:'row'}}>
          <TextInput
                style={styles.textInput}
                placeholder={'Type a message...'}
                onChangeText={(e)=>setItems({message:e})}
                value={items.message}
              />
          <Touch onPress={React.useCallback(()=>handleMessage())}>
            <Text>Send</Text>
          </Touch>           
          </View>
          </ImageBackground>
        </View>
      
      </View>
  )
}
export default ChatScreen;
const styles = StyleSheet.create({
  textInput:{
    
    margin:10,
    paddingLeft:10,
    color: 'black',
    borderWidth: 1,
    width:300,
    
    
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