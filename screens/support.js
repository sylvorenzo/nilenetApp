import React,{Component} from 'react';
import {View,ScrollView, Text,StyleSheet,Linking,TouchableOpacity as Touch, TextInput} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
    Card
   
  } from 'react-native-paper';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import PushNotification from 'react-native-push-notification';
  import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class SupportScreen extends Component{
   

    constructor(props){
        super(props);

        this.state={
            username:'',
            email:'',
            msg:'',

        }

    }
    
      //submits information to database
    handleSubmit = ()=> {
     
    // sends data to database
    database().ref('feedback/').set({
      name:this.state.username,
      email:this.state.email,
      msg:this.state.msg,
    })

    this.setState({username:''});
    this.setState({email:''});
    this.setState({msg:''})
  };

    render(){
       
        return(
            <ScrollView>
                <Card style={styles.card}>
                    <Text style={styles.title}>FAQ's</Text>
                    <Text style={styles.titleb}>Will confidentitial information be shared with other users?</Text>
                    <Text style={styles.content}>
                    No, sensitive informatioon will only be accessible to the authorised personel.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.titleb}>How to register for your business?</Text>
                    <Text style={styles.content}>
                        Follow the given link.
                    </Text>
                   
                    <Touch onPress={()=>Linking.openURL('https://eservices.cipc.co.za').catch(ee=> console.error('An Error Occurred', ee))}>
                    <Text style={styles.link}>Link.</Text>
                    </Touch>
                    
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.titleb}>Are you required to share banking details?</Text>
                    <Text style={styles.content}>
                        No.
                    </Text>
                    <Text style ={styles.content}>
                        Legally we are not inclined to request or prompt you to share any banking details as that 
                        will be going against our user agreement policy.
                    </Text> 
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.titleb}>Update Profile</Text>
                    <Text style={styles.content}>
                        Follow The link below to Update Profile
                    </Text>
                    <Touch onPress={()=>this.props.navigation.navigate('editProfile')}>
                    <Text style={styles.link}>Update Profile.</Text>
                    </Touch>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.titleb}>Forgot Password?</Text>
                    <Text style={styles.content}>
                        Reset Your Password.
                    </Text>
                    <Text style={styles.content}>
                    Resetting your password is easy. We'll email or text you a link to reset 
                    it via the email address.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.titleb}>No access to email address?</Text>
                    <Text style={styles.content}>
                    There are instances when you no longer use or have access to the 
                    email address used to register your LinkedIn account. 
                    We suggest first trying to sign in with a secondary email address or phone 
                    number that's associated with your account. 
                    We allow you to sign in with any email address or phone number 
                    associated with your account.
                    </Text>
                    
                </Card>
              <Card style={styles.card}>
                  <Text style={styles.title}>Contact Us</Text>
                  <Card style={styles.card}>
                      <Text style={styles.title}>
                        <MaterialCommunityIcons name="pin" size={40}/> 
                      </Text> 
                      <Text style={styles.title}>
                          Perch Co-Working Office Space, 37 Bath Avenue, RoseBank Johannesburg South Africa
                      </Text> 
                  </Card>
                  <Card style={styles.card}>
                      <Text style={styles.title}>
                        <MaterialCommunityIcons name="card-account-phone" size={40}/> 
                      </Text> 
                      <Text style={styles.title}>
                      <Touch onPress={()=>Linking.openURL('tel:+27824455274').catch(ee=> console.error('An Error Occurred', ee))}>
                        <Text style={{
                            color:'orange', 
                            fontFamily:'georgia, serif',
                            fontSize:20,
                    }}>+27 82 445 5274</Text>
                    </Touch>
                    </Text> 
                  </Card>
                  <Card style={styles.card}>
                      <Text style={styles.title}>
                        <MaterialCommunityIcons name="email" size={40}/> 
                      </Text>  
                      <Text style={styles.title}>
                      <Touch onPress={()=>Linking.openURL('mailto:info@shiftimpact.africa').catch(ee=> console.error('An Error Occurred', ee))}>
                        <Text style={{
                            color:'orange', 
                            fontFamily:'georgia, serif',
                            fontSize:20,
                    }}>info@shiftimpact.africa</Text>
                    </Touch>
                      </Text>
                  </Card>
                  <Card style={styles.card}>
                      <Text style={styles.title}>Get In Touch With Us</Text>
                        <TextInput style={styles.textInput} 
                        placeholder="Your Email Address"
                        value={this.state.email}
                        onChangeText={(e)=> this.setState({email:e})}
                        />
                        <TextInput style={styles.textInput}
                            placeholder="Your Name"
                            value={this.state.username}
                            onChangeText={(e)=>this.setState({username:e})}
                        />
                        <TextInput style={styles.textInput}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Your Message"
                            value={this.state.msg}
                            onChangeText={(e)=>this.setState({msg:e})}
                        />
                    <Touch onPress={()=> this.handleSubmit()}>
                    <View style={styles.tenderContainer}>
                        <Text style={styles.project}>Submit</Text>   
                    </View>
                    </Touch>
                  </Card>
              </Card>
            </ScrollView>

        )
    }
}
export default SupportScreen;

const styles = StyleSheet.create({
    project:{
        fontFamily:'Georgia, Serif',
        fontSize: 20,
        textAlign:'center',
        color:'white',
        fontWeight:'bold',
        backgroundColor:'#f85900'
    },
    tenderContainer:{
        backgroundColor:'#f85900',
        margin:10,
        minHeight: 60,
        borderRadius:10,
        justifyContent: 'center',
        textAlign:'center'
    },
    textInput:{
        
        
        paddingLeft:10,
        color: 'black',
        borderWidth: 1,
        marginTop:20,
        borderRadius: 25,
        margin:10,
    

    },
    link:{
        fontFamily:'georgia,serif',
        fontSize:15,
        fontWeight:'bold',
        color:'orange',
        paddingTop:10,
        paddingLeft:5,
       
    },
    content:{
        padding:5,
        fontFamily:'Georgia,serif',
        fontSize: 15
    },
    title:{
        fontFamily:'Georgia, serif',
        fontSize: 20,
        marginTop: 15,
        margin:5,
        textAlign: 'center',
        

    },
    titleb:{
        fontFamily:'Georgia, serif',
        fontSize: 25,
        marginTop: 15,
        margin:5,
        textAlign: 'left',
        fontWeight:'bold'

    },
    card:{
        minHeight:200,
        margin: 5,
        justifyContent: 'center',
        textAlign:'center'
    }
})