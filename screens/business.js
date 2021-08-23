import React, {Component} from 'react'
import { ScrollView, Text, StyleSheet,StatusBar } from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Card,
  } from 'react-native-paper';

class BusinessRegistrationScreen extends Component{

    constructor(props){
        super(props);
        this.state ={
            bullet: '\u2022'
        }
    }
    render(){
        return(
            <ScrollView>
                <StatusBar backgroundColor="gray"/>
                <Card style={styles.card}>
                    <Text style={styles.title}> STEP 1: Create An Account</Text>
                    <Text style={styles.content}>
                    Navigate to the CIPC's eservices website. 
                    Go to the Customer Registration link on the homepage and click it.
                    On the following page, 
                    you will be asked to enter your ID number before being asked to 
                    fill out the essential personal and contact information. 
                    Fill in all the essential fields. 
                    Deposit monies into your CIPC account before you may transact on the internet. 
                    The cost of reserving a business name is R50, 
                    while the cost of incorporating a company with a basic 
                    Memorandum of Incorporation (MOI) is R125. 
                    Make sure you have enough money in your CIPC account to finish the transaction. 
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>STEP 2: Name Your Business</Text>
                    <Text style={styles.content}>
                    First and foremost, your company should have a name. 
                    Choosing a simple, memorable name will help with marketing and branding initiatives. 
                    It is also important to keep in mind a name that is relevant to what is 
                    being given or provided - just naming your I.T. 
                    Customers may be perplexed as to what services your firm delivers 
                    if you call it "Sparkle & Shine." 
                    </Text>
                    <Text style={styles.content}>
                    Once you have settled on a name for your company, 
                    go to the CIPC eservices website and select Transact, 
                    then Name Reservations from the dashboard menu that displays.
                    If your first option is not available, 
                    you will be prompted to choose three other names. 
                    </Text>
                    <Text style={styles.content}>
                    When you submit the form, you will be given a 
                    tracking number for the name reservation as well as an email 
                    confirmation of the name reservation; this document is known as a COR9.4. 
                    Save this email and attachment.
                    </Text>
                    <Text style={styles.content}>
                    NB – You can register your business using the name of the registration number. 
                    This may be changed later by reserving the name and then requesting a name change; 
                    however, the business's MOI will need to be updated when the name change is approved. 
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>STEP 3: Do Your Research – What Type of Entity Do You Want Registered?</Text>
                    <Text style={styles.content}>
                    Have you given much thought to the sort of business entity or 
                    corporation you want to create before rushing in blindly to register 
                    your firm? This is where expert advisers and legal practitioners can 
                    help you choose the best company for your needs. 
                    </Text>
                    <Text style={styles.content}>
                    Private (Pty) and Public (Ltd) businesses, as well as Personal Liability Companies (Inc.) 
                    and Non-Profit Organizations, can be incorporated in South Africa (NPO). 
                    In South Africa, close corporations are no longer legal entities. 
                    You will be offered the choice of using a Standard Memorandum of Incorporation (MOI) or 
                    a Bespoke MOI when creating a business via the CIPC internet portal. 
                    The MOI outlines the company's "rules," including how decisions are made and how 
                    the company is structured. For the sake of this essay, we will solely discuss
                     how to register a business using the normal MOI. 
                    </Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}> STEP 4: Registering Your Company Online</Text>
                    <Text style={styles.content}>
                    Make your way to Company Registration from the "Transact" page.
 
                    Here, we will register your business as a legitimate legal organization. 
                    Begin by entering your social security number and then clicking to proceed 
                    to the next page, where you will be required to enter your personal information 
                    (or that of the director if you are registering as a representative or proxy), 
                    as well as the contact information of the incorporators and directors. 
                    You will next be needed to fill out business information, 
                    such as the company's financial year-end, number of shares issued, and so on. 
                    Please do not hesitate to contact us if you have any questions regarding 
                    what these things involve.
                     
                    We will go on to the name reservation screen after this is all done.
                    </Text>
                    <Text style={styles.content}>
                    We will go to the tab "Use Name Already Reserved." 
                    Now look for the name reservation confirmation email (COR9.4) 
                    and take note of the tracking number. 
                    Continue after entering the tracking number as requested. 
                    You will receive a new tracking number after completing the 
                    registration process. After that, you will receive an email 
                    confirmation with the COR 15.1A document attached. 
                    The incorporator or director must sign and date this paper. 
                    </Text>

                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>STEP 5: The Final Step</Text>
                    <Text style={styles.content}>
                    Collect all your supporting papers now. 
                    The procedure is not complete until the CIPC receives the signed 
                    supporting documentation.

                    You will need the following papers to finish the registration:
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet}  Your name reservation confirmation letter.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet}  A completed COR 15.1A form.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} A certified copy of your South African 
                        identification card and/or.
                    </Text>
                    <Text style={styles.content}>
                        {this.state.bullet} A completed Power of Attorney form 
                        (if you are acting as a representative).
                    </Text>
                    <Text style={styles.content}>
                    Scanned your papers to your computer and email 
                    them to eServicesCoReg@cipc.co.za with the tracking number from 
                    the COR15.1A in the subject line.


                    After you have successfully established your business, 
                    you will receive your company registration papers, 
                    also known as the COR 14.3 document and the MOI.
                    The turnaround time ranges from one to three days.

                    Congratulations! Your company is now officially registered!
                    </Text>
                    <Text style={styles.content}>
                    Your company has been established as a legal entity. 
                    You may now open a business bank account and register with SARS for tax reasons, 
                    among other things. 
                    </Text>
                    <Text style={styles.content}>
                    Disclaimer: The information provided on this website is for educational 
                    purposes only and does not constitute legal advice. 
                    The user or browser does not form an attorney-client 
                    relationship with us by using or accessing this website or 
                    any of the e-mail links provided within it.
                    </Text>
                </Card>
            </ScrollView>
        )
    }
}
export default BusinessRegistrationScreen;

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