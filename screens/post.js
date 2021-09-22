import React,{Component, useRef} from 'react'
import {View, 
    Text, 
    Image,
    StyleSheet,
    TouchableOpacity as Touch,
    PermissionsAndroid,
    TextInput,
    ScrollView,
    Platform,
    FlatList,
    TouchableHighlight,
    Alert} from 'react-native';
import { Card } from 'react-native-paper';
import CameraRoll from "@react-native-community/cameraroll";
import RBSheet from "react-native-raw-bottom-sheet";
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-picker/picker';




class PostScreen extends Component{

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
            
        };
        this.getSelectedImages = this.getSelectedImages.bind(this)
      }
    
      componentDidMount(){
      // retrieves current user data from database
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
                         sector: Items.sector,
                         token: Items.token,
                             
                     });
             
                 }
                 this.setState({userInfo: newItems})
            }
 
        });
        
      }

    // opens gallery      
     async handleImage(){
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
    
      };


      // handles post functionality
     async handlePost(){
          var uri = this.state.selected;
          const filename = uri.substring(uri.lastIndexOf('/') + 1);
        
          
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
      
                this.setState({url:url});          
              if(current != null){
                
                this.state.userInfo.map(item=>{
                    var newPostKey = Date.now();
                    //stores data in database
                    database().ref(`posts/entrepreneurs/${current.uid}/${newPostKey}`).set({
                        id: newPostKey,
                        projectImage: this.state.url,
                        uid: current.uid,
                        projectTitle: this.state.projectTitle,
                        projectStatus: this.state.projectStatus,
                        projectDescription: this.state.projectDescription,
                        username: item.username,
                        surname: item.surname,
                        profileImage: item.profileImage,
                        token:item.token,
                        sector:item.sector,
                      }).then(()=>{
                        Alert.alert('Upload Complete!',
                        'Your Post has Successfully been Uploaded!')
                      });
                      // savaes data to the public posts of the database.
                      database().ref(`public/posts/${newPostKey}`).set({
                        id: newPostKey,
                        projectImage: this.state.url,
                        projectTitle: this.state.projectTitle,
                        projectStatus: this.state.projectStatus,
                        uid: current.uid,
                        projectDescription: this.state.projectDescription,
                        username: item.username,
                        surname: item.surname,
                        profileImage: item.profileImage,
                        token:item.token,
                        sector:item.sector
                      })
                })
              }
            });
            
        })
        
      }
    
    render(){
        return(
            <ScrollView style={{backgroundColor:"#ede9e8"}}>
                <View style={styles.imageSection}>
                <Card style={styles.card}>
                    <Card.Cover
                    
                    source={{uri:this.state.selected}}
                    style={{
                        
                        height:280
                    }}
                    
                    />
                </Card>
                <Touch onPress={()=>{this.handleImage()}}>
                    <Text style={styles.imageText}>Select Image</Text>
                </Touch>
                <View style={styles.descriptionSection}>
                    <TextInput
                        style={styles.questionsTextInput}
                        placeholder= "Enter Project Name"
                        value={this.state.projectTitle}
                        onChangeText={(e)=>{this.setState({projectTitle:e})}}
                    />
                    <Picker
                    selectedValue={this.state.projectStatus}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onValueChange={(itemValue)=>this.setState({projectStatus:itemValue})}
                    >
                    <Picker.Item label="Select Project Status" value=""/>
                    <Picker.Item label="Beginning Stages" value="Beginning Stages"/>
                    <Picker.Item label = "Project In Development"  value = "Project In Development"/>
                    </Picker>
                   
                    <TextInput
                        style={styles.questionsTextInput}
                        placeholder= "Enter a description"
                        value={this.state.projectDescription}
                        onChangeText={(e)=>{this.setState({projectDescription:e})}}
                    />
                    <Touch onPress={()=>{this.handlePost()}}>
                        <Text style={styles.postBtn}>Post Project</Text>
                    </Touch>
                </View>
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
export default PostScreen;
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
        borderColor: 'black',
        padding: 10,
        borderRadius:25,
        
    },
    descriptionSection:{
        height:355,
        
        backgroundColor:'white',
        marginTop:0.05,
        borderBottomRightRadius:25,
        borderBottomLeftRadius:25,
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
        borderRadius:15,
    },
    imageSection:{
        
        margin:10,
        padding:10,
        borderRadius:25,
        backgroundColor:'white'
    }
})