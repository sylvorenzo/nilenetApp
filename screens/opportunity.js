import React from 'react';
import {View,
    Text,
    StatusBar, 
    StyleSheet,
    Image, 
    ScrollView,
    TouchableOpacity as Touch,
    Linking} from 'react-native';
import SVA1 from '../assets/opp.jpg';
import opp from '../assets/opp3.jpg'

function OpportunityScreen({navigation}){

    return(
        <ScrollView>
            <StatusBar backgroundColor="#f85900"/>
            <View style={styles.contentContainer}> 
            <Touch onPress={()=>Linking.openURL('https://www.africasharedvaluesummit.com/Call-for-Entries').catch(ee=> console.error('An Error Occurred', ee))}>
             <Image source={SVA1} style={
                { 
                    width:400,
                    height:500, 
                    width:'100%',
                    
                }
                 } 
                 
                 />
            </Touch>
             
            </View>
            <View style={styles.contentContainer}> 
            <Touch onPress={()=>Linking.openURL('https://evolve.eventoptions.co.za/register/investor_workshop/details').catch(ee=> console.error('An Error Occurred', ee))}>
             <Image source={opp} style={
                { 
                    width:400,
                    height:500, 
                    width:'100%',
                    
                }
                 } 
                 
                 />
            </Touch>
             
            </View>
            <Touch onPress={()=>navigation.navigate('project')}>
            <View style={styles.projectsContainer}>
                <Text style={styles.project}>Projects</Text>
            </View>
            </Touch>
            <Touch onPress={()=>Linking.openURL('https://www.eTenders.gov.za').catch(ee=> console.error('An Error Occurred', ee))}>
            <View style={styles.tenderContainer}>
                <Text style={styles.project}>Tenders</Text>   
            </View>
            </Touch>

        </ScrollView>
    )
}
export default OpportunityScreen;

const styles = StyleSheet.create({
    tenderContainer:{
        backgroundColor:'black',
        margin:10,
        minHeight: 70,
        borderRadius:10,
        justifyContent: 'center',
        textAlign:'center'
    },
    project:{
        fontFamily:'Georgia, Serif',
        fontSize: 20,
        textAlign:'center',
        color:'white',
        fontWeight:'bold'
    },
    projectsContainer:{
        backgroundColor:'orange',
        margin:10,
        minHeight: 70,
        borderRadius:10,
        justifyContent: 'center',
        textAlign:'center'
    },
    contentContainer:{
        margin:10,
        borderRadius:10,
        
        backgroundColor: '#e0e0e0'
    },
    content:{
        fontFamily:'Georgia,serif',
        margin:5,
        marginLeft:10,
        paddingBottom:10,
        fontSize: 15,
    },
    heading:{
        marginTop: 20,
        fontFamily: 'Georgia, Serif',
        fontSize: 30,
        textAlign: 'center'
    }
})