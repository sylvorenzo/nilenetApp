import React,{Component,} from 'react';
import {View,ScrollView, Linking,Text,StyleSheet,TouchableOpacity as Touch} from 'react-native';
import {Card} from 'react-native-paper';

export default class CopyRightScreen extends Component{

    //this is the page where copyrights and intellectual property are created.
    constructor(props){
        super(props);
        this.state ={
            bullet: '\u2022'
        }
    }
    render(){
        return(
            <ScrollView>
                <Card style={styles.card}>
                    <Text style={styles.title}>What Is A Copyright?</Text>
                    <Text style={styles.content}>
                    Copyright is a type of intellectual property that gives its owner the exclusive 
                    right to make copies of a creative work, usually for a limited time. The creative 
                    work may be in a literary, artistic, educational, or musical form. 
                    Copyright is intended to protect 
                    the original expression of an idea in the form of a creative work, 
                    but not the idea itself.
                    </Text>
                    <Touch onPress={()=>Linking.openURL('https://en.wikipedia.org/wiki/Copyright').catch(ee=> console.error('An Error Occurred', ee))}>
                    <Text style={styles.link}>Learn More.</Text>
                    </Touch>

                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>Intellectual Property?</Text>
                    <Text style={styles.content}>
                    intellectual property (IP) is a category of property that includes intangible 
                    creations of the human intellect. There are many types of intellectual property, 
                    and some countries recognize more than others. 
                    The most well-known types are copyrights, patents, trademarks, and trade secrets.
                    </Text>
                    <Touch onPress={()=>Linking.openURL('https://en.wikipedia.org/wiki/Intellectual_property').catch(ee=> console.error('An Error Occurred', ee))}>
                    <Text style={styles.link}>Learn More.</Text>
                    </Touch>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.content}>What is a trademark?</Text>
                    <Text style={styles.content}>
                    A trademark (also written trademark or trademark) is a type of 
                    intellectual property consisting of a recognizable sign, design, or expression 
                    which identifies products or services of a particular source from those of others, 
                    although trademarks used to identify services are usually called service marks.
                    </Text>
                    <Touch onPress={()=>Linking.openURL('https://en.wikipedia.org/wiki/Trademark').catch(ee=> console.error('An Error Occurred', ee))}>
                    <Text style={styles.link}>Learn More.</Text>
                    </Touch>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>How to register a trademark?</Text>
                    <Text style={styles.content}>
                    Register your trademark with the Companies and Intellectual Property Commission (CIPC), 
                    to prevent your competitors from using it. CIPC administers the Register of Trademarks, 
                    which is the official record of all the trademarks that have formally been applied 
                    for and/or registered in the Republic of South Africa, since 1916. See website for more:
                    </Text>
                    <Touch onPress={()=>Linking.openURL('https://www.gov.za/services/intellectual-property/register-trademark').catch(ee=> console.error('An Error Occurred', ee))}>
                    <Text style={styles.link}>Register a Trademark.</Text>
                    </Touch>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}> Why is it important as an entrepreneur to protect your work?</Text>
                    <Text style={styles.content}>
                    It is important because it protects you from taken advantage 
                    of by other individuals by making sure that the holder of the 
                    copyright is the only person benefiting from it. 
                    No one can steal your work and use it as others. Copyright protects things 
                    like your ideas, your original content, your business name, the products, etc.
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>How to register copyright?</Text>
                    <Text style={styles.content}>
                    Copyright is secured automatically when you create an original 
                    work that people can see or hear such as a book, painting or music. 
                    Most works eligible for copyright 
                    protection do not require registration or other formalities, except 
                    for cinematograph films.
                    </Text>
                    <Text style={styles.content}>
                    You can create your own copyright by putting the words “copyright” or “copyright reserved” or the internationally recognised copyright symbol 
                    followed by your name and the year e.g., 
                    © Baloyi 2011 on your original work.
                    </Text>
                    <Touch onPress={()=>Linking.openURL('https://www.gov.za/services/intellectual-property/register-copyright ').catch(ee=> console.error('An Error Occurred', ee))}>
                    <Text style={styles.link}>Register Copyright.</Text>
                    </Touch>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>South Africa copyright law</Text>
                    <Text style={styles.content}>
                    The copyright law of South Africa governs copyright, 
                    the right to control the use and distribution of artistic and creative works, 
                    in the Republic of South Africa. It is embodied in the Copyright Act, 
                    1978 and its various amendment acts, and administered by the Companies and 
                    Intellectual Property Commission in the Department of Trade and Industry. 
                    As of March 2019, a major amendment to the law in the Copyright Amendment Bill 
                    has been approved by the South African Parliament and is 
                    awaiting signature by the President.
                    </Text>
                </Card>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    link:{
        fontFamily:'georgia,serif',
        fontSize:15,
        fontWeight:'bold',
        color:'orange',
        paddingTop:10,
        paddingLeft:5,
       
    },
    contentB:{
        padding:5,
        marginLeft:25,
        fontFamily:'Georgia,serif',
        fontSize: 15
    },
    content:{
        padding:5,
        fontFamily:'Georgia,serif',
        fontSize: 15
    },
    title:{
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