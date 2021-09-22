
import React,{Component} from 'react';
import {StyleSheet,View,Text,StatusBar,ScrollView, TouchableOpacity as Touch} from 'react-native';



class TermsScreen extends Component{
    // content for the terms and conditions
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.parent}>
                <StatusBar  backgroundColor="white"/>
                <View style={styles.conditions}>
                <ScrollView >
                    <Text style={styles.conditionsHeading}>TERMS & CONDITIONS:</Text>
                    <Text>  Updated at 2021-07-15</Text>
                    <Text style={styles.conditionsSubHeading}>General Terms:</Text>
                    <Text style={styles.conditionsTxt}>
                        By accessing and placing an order with, you confirm that you are in 
                        agreement with and bound by the terms of service contained in the Terms & 
                        Conditions outlined below. These terms supply to the entire website and any email 
                        or other type of communication between you and NILENET.
                    </Text>
                    <Text style={styles.conditionsTxt}>
                        Under no circumstances shall the NILENET team be liable for any direct, indirect, special, 
                        incidental or consequential damages, including, but not limited to, loss of data or profit, arising 
                        out of the use, or the inability to use, the materials on this site, even if NILENET or authorized representative 
                        has been advised of the possibility of such damages. If your use of materials from this application results in the need 
                        for servicing, repair or correction of equipment or data, you assume any costs thereof.
                    </Text>
                    <Text style={styles.conditionsTxt}>
                        Will not be responsible for any outcome that may occur during the course of usage of our resources. We reserve the rights to 
                        change prices and revise the resources usage policy in any moment.
                    </Text>
                    <Text style={styles.conditionsSubHeading}>
                        License:
                    </Text>
                    <Text style={styles.conditionsTxt}>
                        NILENET grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use our service strictly 
                        in accordance with the terms of this Agreement.
                    </Text>
                    <Text style={styles.conditionsTxt}>
                        These Terms & Conditions are a contract between you and NILENET (referred to in these Terms & Conditions as "NILENET","us","we", or "our"), 
                        the provider of the NILENET application and the services accessible from the NILENET application (which are collectively referred to in these 
                        Terms & Conditions as the "NILENET service").
                    </Text>
                    <Text style={styles.conditionsTxt}>
                        You are agreeing to be bound by these Terms & Conditions, please do not use the Service. In these Terms & Conditions, "you" refers both to you as an individual 
                        and to the entity you represent. If you violate any of these Terms & Conditions, we reserve the right to cancel your account or block access to your account without notice.
                    </Text>

                </ScrollView>
                </View>

                <View style={styles.child}>
                    
                    <Touch style={styles.conditionsBtn} onPress={()=>this.props.navigation.navigate("Sign In")}>
                        <Text style={styles.conditionsBtnText}>I Agree</Text>
                    </Touch>
                </View>

            </View>
        );
    }
}
export default TermsScreen;

const styles = StyleSheet.create({

    parent:{
        flex:1, 
        textAlign: 'center',
        justifyContent: 'center',
    },
    conditions:{
        flex:7,
        marginTop: 20,
        height:200,
        fontFamily:'Georgia, Serif', 
        fontSize: 20,

    },
    conditionsTxt:{
        marginLeft: 5,
        marginRight: 5,
        marginTop:10,
        fontFamily:'Georgia, Serif', 
        fontSize: 20,

    },
    conditionsHeading:{
        marginLeft: 5,
        marginRight: 5,
        marginBottom:10,
        fontFamily:'Georgia, Serif', 
        fontSize: 28,
        textAlign:'left'


    },
    conditionsSubHeading:{
        marginLeft: 5,
        marginRight: 5,
        marginTop:10,
        marginBottom:5,
        fontFamily:'Georgia, Serif', 
        fontSize: 25,
        textAlign:'left',
        fontWeight: 'bold'


    },
    child:{
        flex:1,
        textAlign: 'left',
        justifyContent:'center',
        paddingLeft: 20,
        bottom: 0,
        height:10,
        backgroundColor:'white'

    },
    conditionsBtn:{
        width: 100,
        height: 50,
        backgroundColor: 'orange',
        textAlign:'center',
        justifyContent:'center',
        paddingLeft: 20,
        marginLeft:200,
        borderRadius: 25,
        color:'white',
    },
    conditionsBtnText:{
       fontSize:17,
       color:'white',
       fontWeight: 'bold',
    }
})