import React,{Component} from 'react'
import {View, Text, Image,StyleSheet,TouchableOpacity as Touch} from 'react-native';



class PostScreen extends Component{

    render(){
        return(
            <View>
                <Text>Post Screen</Text>
                <View style={styles.imageSection}>
                <Image />
                <Touch>
                    <Text style={styles.imageText}>Select Image</Text>
                </Touch>

                </View>
                <View style={styles.descriptionSection}>

                </View>
            </View>
        )
    }
}
export default PostScreen;
const styles = StyleSheet.create({
    descriptionSection:{
        height:150,
        backgroundColor:'gray',
        margin:10,
    },
    imageText:{
        margin:10,
        color:'white',
        fontFamily:'Georgia, serif',
        fontWeight:'bold',
    },
    imageSection:{
        height: 250,
        margin: 10,
        borderRadius:10,
        backgroundColor:'black'
    }
})