import React,{Component} from  'react'
import { ScrollView, Text,View,StyleSheet, 
    TouchableOpacity as Touch,
    TextInput,    
    PermissionsAndroid,
    TouchableHighlight,
    Image,Alert
 } from 'react-native'
import { Card } from 'react-native-paper';
import CameraRoll from "@react-native-community/cameraroll";
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import RBSheet from "react-native-raw-bottom-sheet";
import {Picker} from '@react-native-picker/picker';

class EditProfileScreen extends Component{

    constructor(props) {
        super(props);
        this.refRBSheet = React.createRef();
        this.state = {
            data:'',
            photo:'',
            num:'',
            images:[],
            url:'',
            projectTitle:'',
            projectStatus:'',
            userInfo:[],
            projectDescription:'',
            sector:'',
            type:'',
            companyDescription:'',
            
        };
        this.getSelectedImages = this.getSelectedImages.bind(this)
    }

    componentDidMount(){
        database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot =>{
            if(snapshot.exists()){
                 let Items = snapshot.val();
                 let newItems = [];
                 for(let x = 0; x< 1; x++){
                 
                     newItems.push({
                         username: Items.username,
                         surname: Items.surname,
                         type: Items.type,
                         companyName: Items.companyName,
                         profileImage: Items.profileImage,
                         sectorOfBusiness: Items.sector,
                
                             
                     });
             
                 }
                 this.setState({userInfo: newItems})
            }
 
        });
    }
    async PhotoHandler(){
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: 'Permission Explanation',
                message: 'ReactNativeForYou would like to access your photos!',
              },
            );
            if (result !== 'granted') {
              console.log('Access to pictures was denied');
              return;
            }
          }
    
          CameraRoll.getPhotos({
            first: 500,
            assetType: 'Photos',
          })
          .then(res => {
            const assets = res.edges;
            const images = assets.map(asset => asset.node.image);
            this.setState({images:images});
          })
          .catch((error) => {
             console.log(error);
          });

          this.refRBSheet.current.open();
      }
    

      getSelectedImages(uri) {
        
    
        this.setState({
         
          selected: uri,
        });
        this.refRBSheet.current.close()
    
        
        console.log('image selected: ',this.state.selected);
      };
      async handlePost(){
        var uri = this.state.selected;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
      
         console.log(filename);
       
        const uploadUri =  uri.replace('file://','');

        const task = storage().ref("images/"+ filename).putFile(uploadUri);

        task.on("state_changed", snapshot =>{
     
      }, error =>{
        //logs error
          console.log(error )
      },()=>{
        //gets url of image
          storage().ref("images").child(filename).getDownloadURL().then(url =>{
              const current = auth().currentUser;
          
              
              console.log(url);
              this.setState({url:url});
              
              
      
            if(this.state.url != ''){
              //stores information in database
              this.state.userInfo.map(item=>{
                  database().ref(`users/${auth().currentUser.uid}`).set({
                      
                      username: item.username,
                      surname:item.surname,
                      type: item.type,
                      companyName:item.companyName,
                      sector: this.state.sector,
                      profileImage: this.state.url,
                      companyDescription: this.state.companyDescription,
                    }).then(()=>{
                      Alert.alert('Update Complete',
                      'Your Profile has Successfully been Updated!')
                    });
        
                    
              })
              
          
  
            }
          });
          
      })
      
    }



    render(){
        return(
            <ScrollView style={{backgroundColor:'gray'}}>
                <View style={styles.imageSection}>
                <Card style={styles.card}>
                    <Card.Cover
                    
                    source={{uri:this.state.selected}}
                    style={{
                        width:350,
                        height:280
                    }}
                    
                    />
                </Card>
                <Touch onPress={()=>this.PhotoHandler()}>
                    <Text style={styles.imageText}>Select Image</Text>
                </Touch>

                </View>
               

                
                <View style={styles.descriptionSection}>
                <Picker
                selectedValue={this.state.sector}
                style={styles.textInput}
                autoCapitalize="none"
                onValueChange={(itemValue)=>this.setState({sector:itemValue})}
                >
                    <Picker.Item label="Tourism" value="tourism"/>
                    <Picker.Item label = "Manufacturing"  value = "manufacturing"/>
                    <Picker.Item label = "Finances"  value = "finances"/>
                    <Picker.Item label = "Agriculture"  value = "Agriculture"/>
                </Picker>
                <TextInput
                style={styles.textInput}
                multiline={true}
                placeholder="Describe your company in a few words"
                value={this.state.companyDescription}
                onChangeText={(e)=>this.setState({companyDescription:e})}
                />
                    <Touch onPress={()=>{this.handlePost()}}>
                        <Text style={styles.postBtn}>Update Profile</Text>
                    </Touch>
                </View>
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
                    <ScrollView style={{ backgroundColor:'#f5fcff'}}>
                    <View style={{flexDirection:'row',flexWrap:'wrap', justifyContent:'center'}}>
                    {this.state.images.map(image=>{
                     return(
                         <TouchableHighlight onPress={()=> this.getSelectedImages(image.uri)}>
                             <Image style={{
                                 width:100,
                                 height:100,
                                 margin:2
                             }}
                             source={{uri: image.uri}}
                             />
                         </TouchableHighlight>
                     )
                 })}
                    </View>

                </ScrollView>
                    </RBSheet>
            </ScrollView>
        )
    }
}
export default EditProfileScreen;

const styles = StyleSheet.create({
    card:{
        height: 280,
        justifyContent:'center'
    },
    postBtn:{
        color:'white',
        marginTop:30,
        height:50,
        paddingTop:10,
        marginLeft:10,
        width:320,
        textAlign:'center',
        fontFamily:'Georgia, serif',
        fontWeight:'bold',
        fontSize:18,
        backgroundColor:'black',
        borderRadius:10,
    },
    questionsTextInput:{
        marginTop:20,
        margin: 5,
        color:'black',
        backgroundColor:'white',
        borderTopWidth: 0,
        borderRightWidth:0,
        borderLeftWidth:0,
        borderWidth: 0.5,
        borderColor: 'white',
        padding: 10,
        borderRadius:25,
        
    },
    descriptionSection:{
        height:355,
        backgroundColor:'gray',
        margin:10,
        borderTopRightRadius:25,
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
    imageText:{
        margin:10,
        color:'white',
        backgroundColor:'orange',
        paddingTop:15,
        height:50,
        textAlign:'center',
        fontFamily:'Georgia, serif',
        fontWeight:'bold',
        borderBottomLeftRadius:50,
    },
    imageSection:{
        height: 350,
        marginTop:-1,
        borderBottomLeftRadius:50,
        backgroundColor:'white'
    },
    textInput:{
      flex:1,
      marginTop: Platform.OS ==='ios' ? 0:-12,
      paddingLeft:10,
      color: 'black',
      borderWidth: 1,
      borderRadius: 25,
  

  },
})