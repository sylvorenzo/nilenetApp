import React,{useEffect, useState, useRef, Component} from 'react';
import {View, 
    Text, 
    ScrollView,
    StyleSheet,
    TouchableOpacity as Touch,
    Alert,
    TextInput,
    StatusBar} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {PieChart} from 'react-native-chart-kit';
import RBSheet from "react-native-raw-bottom-sheet";
import {Picker} from '@react-native-picker/picker';



class MyBusinessScreen extends Component{

   constructor(props){
       super(props);
            this.refRBSheet = React.createRef();
       this.state = {
        numberofEmployees:0,
        numberofMilestones: 0,
        managementExperience: 0,
        TotalcapitalAmount: 0,
        financialBackground:0,
        relationships:0,
        numberOfCompetitors:0,
        open: false,
        datas:[],
        results:[],
        items:[],
        tag:[],
        charts:[],
        chartData:[],
        sectorOfBusiness:[],
        datapoints:[],

        labelR:0,
        labelM:0,
        labelS: 0
       }
   }
    



componentDidMount(){

 

        database().ref(`users/entrepreneur/${auth().currentUser.uid}`).on('value',snapshot=>{
            if(snapshot.exists()){
                let Items = snapshot.val();
                let newItems = [];
                for(let x = 0; x< 1; x++){
                 
                      newItems.push({
                          
                         
                          numberofEmployees: Items.numberofEmployees,
                          numberofMilestones: Items.numberofMilestones,
                          managementExperience: Items.managementExperience,
                          relationships: Items.relationships,
                          TotalcapitalAmount: Items.TotalcapitalAmount,
                          financialBackground: Items.financialBackground,
                          numberOfCompetitors: Items.numberOfCompetitors,
                      });
              
                }
                this.setState({datas:newItems});
               
                console.log(this.state.datas);
          
            }
            
        });
        database().ref(`charts/${auth().currentUser.uid}`).on('value', snapshot=>{
            if(snapshot.exists()){
                console.log(snapshot.val());
                let chartpoints = snapshot.val();
                let newpoints = [];
                for(let x = 0; x < 1; x++){
                    newpoints.push({
        
                        tag1: chartpoints.tag1,
                        tag2: chartpoints.tag2,
                        tag3: chartpoints.tag3,
                        point1: chartpoints.point1,
                        point2: chartpoints.point2,
                        point3: chartpoints.point3,
                        message: chartpoints.message
        
                    })
                }
                this.setState({charts:newpoints});
        
                console.log(this.state.charts);
            
            }
            
    
        });
        database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot =>{
            console.log(snapshot.val());
            let Items = snapshot.val();
           let newItems = [];
           for(let x = 0; x< 1; x++){
            
                 newItems.push({
                     companyName: Items.companyName,
                     companyDescription: Items.companyDescription
                    
                 });
         
           }
    
    
            this.setState({items : newItems});
            console.log(this.state.items);
        });


    };



    
    
    handleBrain(managementExperience, financialBackground, capitalAmount, milestones, competitors,employees){

        var ExperienceWeightS = 0; 
        var FinanceWeightS = 0; 
        var CapitalWeightS = 0;
        var MilestonesWeightS =0;
        var RivalsweightS = 0;
        var EmployeesWeightS = 0;
        
        var ExperienceWeightM = 0; 
        var FinanceWeightM = 0; 
        var CapitalWeightM = 0;
        var MilestonesWeightM =0;
        var RivalsweightM = 0;
        var EmployeesWeightM = 0;

        var ExperienceWeightR = 0; 
        var FinanceWeightR = 0; 
        var CapitalWeightR = 0;
        var MilestonesWeightR =0;
        var RivalsweightR = 0;
        var EmployeesWeightR = 0;
        //algorithm for managementExperience
        if(managementExperience !== null){
            if(managementExperience > 3){
            
                ExperienceWeightM = 24;
                ExperienceWeightS = 24;
                ExperienceWeightR = 0;
            }else if(managementExperience  <= 3){
            
                ExperienceWeightR = 24;
                ExperienceWeightM = 0;
                ExperienceWeightS = 0;
                
            }
    
            //algorithm for financial Background
            if(financialBackground === 'yes'){
                
                FinanceWeightS = 25;
                FinanceWeightM = 10;
                FinanceWeightR = 0;
                
            }else if(financialBackground  === 'no'){

                FinanceWeightS = 0;
                FinanceWeightM = 0;
                FinanceWeightR = 25;
                
               
            }
    
            //algorithm for capital Amount
            if(capitalAmount < 90000){
    
                CapitalWeightR = 25;
                CapitalWeightS = 0;
                CapitalWeightM = 10;
    
            } else if(capitalAmount <= 95000){
    
                CapitalWeightM = 10;
                CapitalWeightS = 0;
    
            }else if(capitalAmount <= 300000){
                CapitalWeightS = 15;
                CapitalWeightM = 5;
              
            }else if(capitalAmount >= 500000){
                CapitalWeightM = 0;
                CapitalWeightS=25;
               
            }
    
            //algorithm for number of milestones
            if(milestones <= 5){
                MilestonesWeightM = 2;
                MilestonesWeightS = 0;
                MilestonesWeightR = 1;
               
            }else if(milestones <=3 ){
                MilestonesWeightM = 1;
                MilestonesWeightR = 0;
                MilestonesWeightS = 0;
               
            }else if(milestones >= 6){
                MilestonesWeightM = 0;
                MilestonesWeightR = 0;
                MilestonesWeightS = 5;
            }else if(milestones = 0){
                MilestonesWeightM = 0;
                MilestonesWeightS = 0;
                MilestonesWeightR = 5;
            }
    
            //algorithm for number of Competitors
            if(competitors <= 5){
                RivalsweightS =10;
            }else if(competitors <= 10){
                RivalsweightM = 3;
            }else if(competitors > 10){
                RivalsweightR = 10
            }
    
            //algorithm for employees
            if(employees >= 100){
               EmployeesWeightS =1;
            }else if(employees >= 40){
                EmployeesWeightM = 0;
            }else if(employees < 40){
                EmployeesWeightR = 1
            }
            
            var ResultS = ExperienceWeightS + FinanceWeightS + CapitalWeightS + MilestonesWeightS + RivalsweightS + EmployeesWeightS;
            var ResultM = ExperienceWeightM + FinanceWeightM + CapitalWeightM + MilestonesWeightM + RivalsweightM + EmployeesWeightM;
            var ResultR = ExperienceWeightR + FinanceWeightR + CapitalWeightR + MilestonesWeightR + RivalsweightR + EmployeesWeightR;
            var message = '';

            if(ResultS >= 50){
                message = 'Great Job!, your organisation is doing great. Keep doing what you are doing.'
            }else if(ResultM >=50){
                message = 'Your organisation is doing mediocre, please try and work on obtaining more milestones, capital and perhaps increase your number of Employees. Please visit our resources page for information on how to improve these problems.'
                                
            }else if(ResultR >=50){
                message = 'Your organisation is at risk of failing, please try and work on improving on every question which was asked when measuring the success of Your organisation. Please visit our resources page for information on how to improve these problems.'
            }
                               //store results in the backend 
                               database().ref(`charts/${auth().currentUser.uid}`).set({
                                tag1: 'Start Up Success',
                                tag2: 'Start Up Moderate',
                                tag3: 'Start Up At Risk',
                                point1: ResultS,
                                point2: ResultM,
                                point3: ResultR,
                                message: message
                            }).then(Alert.alert('Saved!', 'Your results has been saved and is being displayed!'));
    
                            console.log("Start Up At Risk", ResultR);
                            console.log("Start Up At Moderate",ResultM);
                            console.log("Start Up At Success", ResultS);  

                            this.setState({labelR: ResultR});
                            this.setState({labelM: ResultM});
                            this.setState({labelS: ResultS});
        }else if(managementExperience && financialBackground &&  capitalAmount && milestones && competitors && employees){
             ExperienceWeightS = 0; 
             FinanceWeightS = 0; 
             CapitalWeightS = 0;
             MilestonesWeightS =0;
             RivalsweightS = 0;
             EmployeesWeightS = 0;
            
             ExperienceWeightM = 0; 
             FinanceWeightM = 0; 
             CapitalWeightM = 0;
             MilestonesWeightM =0;
             RivalsweightM = 0;
             EmployeesWeightM = 0;
    
             ExperienceWeightR = 0; 
             FinanceWeightR = 0; 
             CapitalWeightR = 0;
             MilestonesWeightR =0;
             RivalsweightR = 0;
             EmployeesWeightR = 0;
        }
         
         
        database().ref(`stats/${auth().currentUser.uid}`).set({
            
            Experience: managementExperience,
            Capital: capitalAmount,
            Milestones:milestones,
            Competitors: competitors,
            Employees: employees,
            uid: auth().currentUser.uid,

        })
            
    }
    
      render(){
        return(
            <View style={{backgroundColor:'#f0f8fa'}}>
                <StatusBar backgroundColor="#eb7434"/>
                <ScrollView>
                    <View style={styles.chart}>
             
                    
                    <View style={styles.chartContainer}>
                        <Touch onPress={() => this.refRBSheet.current.open()}>
                        <Text style={styles.generatTxt}>Generate Report</Text>
                        </Touch>
                        {this.state.charts.map(chart=>{
                                console.log(chart);
                            return(
                                <PieChart
                                data={
                                    
                                
                                        [
                                            {
                                                name: chart.tag1 ||"Start Up Success" ,
                                                result: chart.point1 || 10,
                                                color: '#3da6e3',
                                                legendFontColor: "white",
                                                legendFontSize: 10
                                            },
                                            {
                                                name: chart.tag2 || "Start Up Moderate",
                                                result: chart.point2 || 10,
                                                color: "white",
                                                legendFontColor: "white",
                                                legendFontSize: 10
                                            },
                                            {
                                                name: chart.tag3 ||"Start Up At Risk" ,
                                                result: chart.point3 || 10,
                                                color: "orange",
                                                legendFontColor: "white",
                                                legendFontSize: 10
                                            },
                                        ]

                                
                                
                                }
                                width={300}
                                height={200}
                                chartConfig={
                                    {
                                        backgroundGradientFrom: "purple",
                                        backgroundGradientFromOpacity: 0,
                                        backgroundGradientTo: "orange",
                                        backgroundGradientToOpacity: 0.5,
                                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                        strokeWidth: 2, // optional, default 3
                                        barPercentage: 0.5,
                                        useShadowColorFromDataset: false // optional
                                    }
                                }
                                accessor={"result"}
                                backgroundColor={"transparent"}
                                paddingLeft={'10'}
                                relative
                                />
                            )
                        })}
                        
                    </View>
                    <View style={styles.companyDescriptSection}>
                    {this.state.items.map(item=>{
                        
                        
                            return(
                                <View>
                                    <Text style={styles.headerText}>{item.companyName}</Text>
                                    <Text style={styles.companyDescription}>{item.companyDescription}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={styles.solutionContainer}>
                        <Text style={styles.headerText}>SOLUTION:</Text>
                        {this.state.charts.map(item=>{
                            return(
                                <Text>{item.message}</Text>
                            )
                        })}
                    </View>
                 
      
                    </View>
                    
                    <RBSheet
                        ref={this.refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        draggableIcon: {
                            backgroundColor: "orange"
                        }
                        }}
                        height={610}
                    >
                    <View style={styles.questionsContainer}>
                        <ScrollView>
                           
                            <View style={styles.questionsCard}>
                                <Text style={styles.questionsTxt}>How many people does your organisation employ?</Text>
                                <TextInput
                                    style={styles.questionsTextInput}
                                    placeholder="Your Answer Comes Here"
                                    value={this.state.numberofEmployees}
                                    onChangeText = {e => this.setState({numberofEmployees: e})}
                                />
                               
                            </View>
                            <View style={styles.questionsCard}>
                                <Text style={styles.questionsTxt}>Number of Milestones?</Text>
                                <TextInput
                                    style={styles.questionsTextInput}
                                    placeholder="Your Answer Comes Here"
                                    value={this.state.numberofMilestones}
                                    onChangeText = {e => this.setState({numberofMilestones: e})}
                                />
                             
                            </View>
                            <View style={styles.questionsCard}>
                                <Text style={styles.questionsTxt}>Amount of management Experience?</Text>
                                <TextInput
                                    style={styles.questionsTextInput}
                                    placeholder="Your Answer Comes Here"
                                    value={this.state.managementExperience}
                                    onChangeText = {e => this.setState({managementExperience: e})}
                                />
                               
                            </View>
                            <View style={styles.questionsCard}>
                                <Text style={styles.questionsTxt}>Total Capital amount?</Text>
                                <TextInput
                                    style={styles.questionsTextInput}
                                    placeholder="Your Answer Comes Here"
                                    value={this.state.TotalcapitalAmount}
                                    onChangeText = {e => this.setState({TotalcapitalAmount: e})}
                                />
                            
                            </View>
                            <View style={styles.questionsCard}>
                                <Text style={styles.questionsTxt}>Do You have A Financial Background?</Text>
                                <Picker
                                 style={styles.questionsTextInput}
                                 placeholder="Your Answer Comes Here"
                                 selectedValue={this.state.financialBackground}
                                 onValueChange = {e => this.setState({financialBackground: e})}
                                >
                                <Picker.Item label="Select Answer" value=""/>
                                <Picker.Item label="Yes" value="yes"/>
                                <Picker.Item label = "No"  value = "no"/>
                                </Picker>
                            </View>
                            <View style={styles.questionsCard}>
                                <Text style={styles.questionsTxt}>How Many Competitors Does Your Organisation Have?</Text>
                                <TextInput
                                    style={styles.questionsTextInput}
                                    placeholder="Your Answer Comes Here"
                                    value={this.state.numberOfCompetitors}
                                    onChangeText={e=> this.setState({numberOfCompetitors: e})}
                                />
                            
                            </View>
                            <View style={styles.questionsCard}>
                                <Text style={styles.questionsTxt}>How many relationships have you formed within your industry?</Text>
                                <TextInput
                                    style={styles.questionsTextInput}
                                    placeholder="Your Answer Comes Here"
                                    value={this.state.relationships}
                                    onChangeText = {e => this.setState({relationships: e})}
                                />

                            </View>
                            <View style={styles.generateContainer}>
            
                            <Touch onPress ={()=> this.handleBrain(this.state.managementExperience, this.state.financialBackground, this.state.TotalcapitalAmount, this.state.numberofMilestones, this.state.numberOfCompetitors,this.state.numberofEmployees)}>
                                <Text style={styles.generatorBtn}>Generate Report</Text>   
                            </Touch>
                            
                        </View>
                        </ScrollView>
    
                    </View>
                    
                    </RBSheet>
                    
                </ScrollView>
            </View>
        )
      }
    

}
export default MyBusinessScreen;

const styles = StyleSheet.create({
    companyDescription:{
        fontFamily:'Georgia,serif',
        paddingLeft: 20,
        fontSize:15,
    },
    companyName:{
        fontFamily:'Georgia,serif',
        fontWeight:'bold',
        textAlign: 'left',
        fontSize: 20,
        paddingLeft:5,
        paddingBottom:10,

    },
    generateContainer:{
    
        flexDirection:'row',
        marginTop:20,
        paddingTop: 20,
        backgroundColor: 'transparent'
    },

    questionSave:{
        color:'orange',
        fontFamily: 'Gerogia, serif',
        fontSize: 15,
        marginTop:30,
        paddingRight:80,
    


    },
    questionsTextInput:{
        margin: 5,
        color:'black',
        backgroundColor:'transparent',
        borderTopWidth: 0,
        borderRightWidth:0,
        borderLeftWidth:0,
        borderWidth: 0.5,
        padding: 10,
        
    },
    generatTxt:{
        color:'white',
        fontFamily:'Georgia,Serif',
        fontWeight:'bold',
        marginLeft: 200,
        marginBottom:10

    },
    headerText:{
        fontFamily:'Georgia,Serif',
        
        color: 'black',
        fontSize: 20,
        justifyContent:'center',
        textAlign:'center',
        margin: 5,
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 0.5,
    },
    chart:{
        flex: 1,
        borderColor: 'black',
        height: 800,
        textAlign:'left',
    
        
    },
    companyDescriptSection:{
    
        marginTop: 10,
        marginLeft:10,
        marginRight:10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        minHeight: 200,
        backgroundColor:'white',
        borderBottomColor: 'black',
    

        

    },
    chartContainer:{
        backgroundColor: 'black',
        paddingTop: 20,
        paddingLeft:20,
        color:'white',
        height: 250,
        margin: 10,
        borderRadius:10,
    },
    solutionContainer:{
        backgroundColor: 'white',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginLeft: 10,
        marginRight:10,
        minHeight: 200,
    },
    generatorBtn:{

        
        borderRadius:25,
        marginTop: 20,
        padding: 10,
        fontFamily:'Georgia, serif',
        fontSize: 15,
        paddingLeft:20,
        width: 150,
        height: 50,
        justifyContent:'center',
        color: 'orange',

    }, 
    questionsContainer:{
        margin:10,
        height: 500,
        borderRadius:10

    },
    questionsCard:{
        height:150,
        color: 'white',
        margin: 5,
        padding: 10,
        textAlign:'center',
        borderRadius:10,
        backgroundColor:'#ffbf00',
    },
    questionsTxt:{
        fontFamily:'Georgia, Serif',
        fontSize: 20,
        color:'white'

    }
})
