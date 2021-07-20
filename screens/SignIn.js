
import React,{useState}from 'react';
import { StyleSheet,ScrollView,StatusBar,ImageBackground, Text, View,TextInput,TouchableOpacity as Touch,Image, Platform} from 'react-native';
import background from '../assets/background.png';
import auth from '@react-native-firebase/app';
import {AuthContext} from '../components/context';

function SignInScreen({navigation}){
    

    
    const[data, setData]= useState({
        email:'',
        password:'',
        check_textInputChange:false,
        secureTextEntry:true,
    });
    
    const {signIn} = React.useContext(AuthContext);
    
    const textInputChange = (val)=>{
        if(val.length !== 0){
             setData({
                 ...data,
                 email:val,
        
             })
        }else{
            setData({
                ...data,
                email:val,

            })
        }
    }
    const handlePasswordChange = (val)=>{
        if(val.length !== 0){
             setData({
                 ...data,
                 password:val,
                })
        }
        
    }

    const handleLogin = (email,password)=>{
        auth().signInWithEmailAndPassword(email,password).then(()=>{
        
            setValues({user:fire.auth().currentUser.uid})
      
          
          }).catch((e)=>{
            alert(e);
          })
    }

    
    return(
    <ScrollView style={{flex:1, backgroundColor:'white'}}>
        <StatusBar backgroundColor="white"/>
        <ImageBackground source={background} style={{flex:1}}>
        <View style={styles.first}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <View style={styles.footer}>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
       
                <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val)=>{textInputChange(val)}}
                />
            </View>
            <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>

                <TextInput
                placeholder="Your Password"
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={data.secureTextEntry ? true:false}
                onChangeText={(val)=>{handlePasswordChange(val)}}
                />

            </View>
            <View style={styles.button}>
                <Touch style={styles.SignIn} onPress={()=>{signIn(data.email,data.password)}}>
                    <Text style={styles.textSign}>Sign In</Text>
                </Touch>
                <Touch onPress={()=>navigation.navigate("Sign Up")}
                    style={styles.link}
                >
                    <Text style={{color:'black'}}> Don't Have An Account? 
                    
                    <Text style={{color:'red'}}> Sign Up.</Text> 
                    
                    </Text>
                </Touch>

                <Touch style={styles.link}>
                    <Text style={{color:'black'}}>Forgot Password?
                        <Text style={{color:'red'}}> Reset.</Text> 
                    </Text>
                </Touch>
                
            </View>
        </View>


        </ImageBackground>

    </ScrollView>
    )
}
const styles = StyleSheet.create({
    main:{
        backgroundColor:'white',
        flex:1,
        
    },
    first:{
        flex:1,
        justifyContent:'flex-end',
        paddingHorizontal:20,
        paddingBottom:50,
        color:'#fff',
        
      

    },
    footer:{
        flex:3,
        backgroundColor:'transparent',
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
        paddingHorizontal:25,
        paddingVertical:30,

    },
    text_header:{
        
        
        fontWeight:'bold',
        fontSize:30,
        color:'black'
    },
    text_footer:{

        color:'#05375a',
        fontSize:18,
        marginTop:35,
        marginBottom: 5,
        marginLeft: 20,
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderTopColor: 'black',
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5,
        marginLeft: 5,
        marginRight:5,
    },
    textInput:{
        flex:1,
        marginTop: Platform.OS ==='ios' ? 0:-12,
        paddingLeft:10,
        color: '#c2c2c2',
        borderWidth: 1,
        borderRadius: 25,
    

    },
    button:{
       alignItems:'center',
       marginTop:50,
    },
    SignIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        color:'white',
        backgroundColor:'orange'
    },
    SignUp:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        borderWidth:1, 
        borderColor:'black',
        marginTop:15,
        backgroundColor:'black',
        marginBottom:15
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold',
        color:'white',
    },
    link:{
        color:'orange',
        height:50,
        marginTop:15,
        marginBottom: 15,
    },
    logo:{
        height:250,
        width:450,

    }
})
export default SignInScreen;