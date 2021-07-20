import React from 'react';
import {View,Text,StatusBar, StyleSheet, TouchableOpacity as Touch} from 'react-native';


function OpportunityScreen({navigation}){

    return(
        <View>
            <StatusBar backgroundColor="#ffffff"/>
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>Opportunities</Text>
                <Text style={styles.content}>
                        Opportunities are a time or a set of circumstances that makes it possible to do 
                        something. Furthermore, NILENET provides Entrepreneurs with the opportunity to gain access 
                        to markets by placing all the necessary information with links to government Tenders, and projects 
                        which parties with similar interests can come together and work on something that would be most beneficial 
                        to society and all parties involved.
                </Text>

                <Text style={styles.content}>
                        Entrepreneurs can collaborate with each other 24/7, government Tenders however, does not have those benefits.
                        To find out more about tenders visit the tender site.
                </Text>
            </View>
            <View style={styles.projectsContainer}>
                <Touch>
                    <Text style={styles.project}>Projects</Text>
                </Touch>
            </View>
            <View style={styles.tenderContainer}>
                <Touch>
                    <Text style={styles.project}>Tenders</Text>
                </Touch>
            </View>

        </View>
    )
}
export default OpportunityScreen;

const styles = StyleSheet.create({
    tenderContainer:{
        backgroundColor:'black',
        margin:10,
        minHeight: 100,
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
        minHeight: 100,
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