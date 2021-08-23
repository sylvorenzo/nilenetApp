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
import background from '../assets/launch_screen.jpg';
import {Picker} from '@react-native-picker/picker';
import {AuthContext} from '../components/context'


function SignUpScreen({navigation}){
    
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setComapanyName] = useState('');
    const [sector, setSector] =useState('');
    const [type, setType] =useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfimPassword] = useState('');
 
    const {signUp} = React.useContext(AuthContext);


    return(
    <ScrollView style={styles.main}>
        <StatusBar backgroundColor="#e6e3e3"/>
    
        
        <ImageBackground source={background} resizeMode="cover" style={{flex:1,}}>
        <View style={styles.first}>
        <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                value={email}
                onChangeText={(val)=>setEmail(val)}
                />
            </View>
            <Text style={styles.text_footer}>Name</Text>
            <View style={styles.action}>
                <TextInput
                placeholder="Your Name"
                style={styles.textInput}
                autoCapitalize="none"
                value={username}
                onChangeText={(val)=>setUsername(val)}
                />
            </View>
            <Text style={styles.text_footer}>Surname</Text>
            <View style={styles.action}>
                <TextInput
                placeholder="Your Surname"
                style={styles.textInput}
                autoCapitalize="none"
                value={surname}
                onChangeText={(val)=>setSurname(val)}
                />
            </View>
            <Text style={styles.text_footer}>Company Name</Text>
            <View style={styles.action}>
                <TextInput
                placeholder="Your Company Name"
                style={styles.textInput}
                autoCapitalize="none"
                value={companyName}
                onChangeText={(val)=>setComapanyName(val)}
                />
            </View>
            <Text style={styles.text_footer}></Text>
            <View style={styles.action}>
                <Picker
                selectedValue={sector}
                style={styles.textInput}
                autoCapitalize="none"
                onValueChange={(itemValue)=>setSector(itemValue)}
                >
                    <Picker.Item label="Select Sector Of Interest" value=""/>
                    <Picker.Item label="Tourism" value="tourism"/>
                    <Picker.Item label = "Manufacturing"  value = "manufacturing"/>
                    <Picker.Item label = "Finances"  value = "finances"/>
                    <Picker.Item label = "Agriculture"  value = "Agriculture"/>
                </Picker>
            </View>
            <Text style={styles.text_footer}></Text>
            <View style={styles.action}>
                <Picker
                selectedValue={type}
                style={styles.textInput}
                autoCapitalize="none"
                onValueChange={(itemValue)=>setType(itemValue)}
                >
                    <Picker.Item label="Select Type" value=""/>
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
                value={password}
                onChangeText={(val)=>setPassword(val)}
                />
            </View>
            <Text style={styles.text_footer}>Confirm Password</Text>
            <View style={styles.action}>

                <TextInput
                placeholder="Confirm Your Password"
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(e)=>setConfimPassword(e)}
                />
            </View>
            <View style={styles.button}>
                <Touch style={styles.SignIn}  onPress={()=>signUp(email,password,confirmPassword,type, username,surname,sector,companyName)}>
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
        </View>
 

        </ImageBackground>
        



    </ScrollView>
    );
}
const styles = StyleSheet.create({
    inputContainer:{
        backgroundColor:'rgba(0,0,0,0.5)',
        margin:10,
        borderRadius:25,
        padding:10,
    },
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

        color:'orange',
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