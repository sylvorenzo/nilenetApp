import React,{useState}from 'react';
import { StyleSheet, 
    Text, 
    View,
    TextInput,
    TouchableOpacity as Touch,
    ImageBackground,
    StatusBar, 
    Platform,
    ScrollView
    } from 'react-native';
import background from '../assets/background.png';
import {Picker} from '@react-native-picker/picker';
import {AuthContext} from '../components/context'


function SignUpScreen({navigation}){
    
    const[data, setData]= useState({
        email:'',
        password:'',
        confirmpassword:'',
        check_textInputChange:false,
        secureTextEntry:true,
        confirm_secureTextEntry:true,
        type:'Select Type'
    });
    const {signUp} = React.useContext(AuthContext);
    const textInputChange = (val)=>{
        if(val.length !== 0){
             setData({
                 ...data,
                 email:val,
                 check_textInputChange:true,
             })
        }else{
            setData({
                ...data,
                email:val,
                check_textInputChange:false,
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
    const handleConfirmPasswordChange = (val)=>{
        if(val.length !== 0){
             setData({
                 ...data,
                 confirmpassword:val,
                })
        }
        
    }

    return(
    <ScrollView style={styles.main}>
        <StatusBar backgroundColor="white"/>
    
        
        <ImageBackground source={background} resizeMode="cover" style={{flex:1,}}>
        <View style={styles.first}>
        <Text style={styles.text_header}>Register Now!</Text>
        </View>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val)=>textInputChange(val)}
                />
            </View>
            <Text style={styles.text_footer}></Text>
            <View style={styles.action}>
                <Picker
                selectedValue={data.type}
                style={styles.textInput}
                autoCapitalize="none"
                onValueChange={(itemValue, index)=>setData({type:itemValue})}
                >
                    <Picker.Item label="Entrepreneur" value="Entrepreneur"/>
                    <Picker.Item label = "Investor"  value = "Investor"/>
                </Picker>
            </View>
            <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>
   
                <TextInput
                placeholder="Your Password"
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(val)=>handlePasswordChange(val)}
                />
            </View>
            <Text style={styles.text_footer}>Confirm Password</Text>
            <View style={styles.action}>

                <TextInput
                placeholder="Confirm Your Password"
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(val)=>handlePasswordChange(val)}
                />
            </View>
            <View style={styles.button}>
                <Touch style={styles.SignIn}  onPress={()=>signUp(data.email,data.password,data.type)}>
                    <Text style={styles.textSign}>Sign Up</Text>
                </Touch>
                <Touch onPress={()=>navigation.navigate("Sign In")}
                    style={styles.link}
                >
                    <Text style={{color: 'black'}}>Already Have An Account? 
                        <Text style={{color:'red'}}> Sign In.</Text>
                    </Text>
                </Touch>
                
            </View>

        </ImageBackground>
        



    </ScrollView>
    );
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
        backgroundColor:'#fff',
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
        color: 'black',
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
export default SignUpScreen;