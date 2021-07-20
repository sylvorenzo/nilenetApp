import React,{useEffect, useState, useRef} from 'react'
import {View, 
    Text, 
    ScrollView,
    StyleSheet,
    TouchableOpacity as Touch,
    TextInput} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {PieChart} from 'react-native-chart-kit';
import RBSheet from "react-native-raw-bottom-sheet"

const MyBusinessScreen =()=>{
    const refRBSheet = useRef();
    const [values, setValues] = useState({
        numberofEmployees:'',
        numberofMilestones: '',
        managementExperience: '',
        TotalcapitalAmount: '',
        financialBackground:'',
        relationships:'',
        numberOfCompetitors:'',
        open: false,
    });


    var [datas, setDatas] = useState([]);
    var [results, setResults] = useState([]);
    var [items, setItems] = useState([]);
    const [tag, setTag] = useState([]);
    const [datapoints, setDatapoints] = useState([]);
    var [charts, setCharts] = useState([]);
    const [chartData, setChartData] = useState([]);
    var [sectorOfBusiness,setSectorOfBusiness] = useState([]);

    useEffect(()=>{

        database().ref(`users/entrepreneur/${auth().currentUser.uid}`).on('value',snapshot=>{
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
          setDatas(datas = newItems);
         
          console.log(datas);
    
        });
        database().ref(`charts/${auth().currentUser.uid}`).on('value', snapshot=>{
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
                    point3: chartpoints.point3
    
                })
            }
            setCharts(charts = newpoints);
    
            console.log(charts);
            const labels = [];
            const pointers = [];
        
        
                labels.push(charts[0].tag1,charts[0].tag2, charts[0].tag3);
                pointers.push(charts[0].point1, charts[0].point2, charts[0].point3);
                
                setTag(labels);
                setDatapoints(pointers);
                
                console.log(tag);
                console.log(datapoints);
    
    
        });
        const data = [
            {
              name: "something",
              result: 20,
              color: 'orange',
              legendFontColor: "white",
              legendFontSize: 10
            },
            {
              name: "something",
              result: 24,
              color: "white",
              legendFontColor: "white",
              legendFontSize: 10
            },
            {
              name: "something",
              result: 30,
              color: "gray",
              legendFontColor: "white",
              legendFontSize: 10
            },
           
          ];
          setChartData(data)
    },[]);



    const chartConfig = {
        backgroundGradientFrom: "purple",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "orange",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
    return(
        <View style={{backgroundColor:'#f0f8fa'}}>
            <ScrollView>
                <View style={styles.chart}>
         
                
                <View style={styles.chartContainer}>
                    <Touch onPress={() => refRBSheet.current.open()}>
                    <Text style={styles.generatTxt}>Generate Report</Text>
                    </Touch>

                    <PieChart
                    data={chartData}
                    width={300}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"result"}
                    backgroundColor={"transparent"}
                    paddingLeft={'10'}
                    relative
                    />
                </View>
                <View style={styles.companyDescriptSection}>
                    <Text style={styles.headerText}>COMPANY DESCRIPTION:</Text>
                </View>
                <View style={styles.solutionContainer}>
                    <Text style={styles.headerText}>SOLUTION:</Text>
                </View>
             
  
                </View>
                
                <RBSheet
                    ref={refRBSheet}
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
                        <Text>Questions section</Text>
                        <View style={styles.questionsCard}>
                            <Text style={styles.questionsTxt}>This is where the question comes?</Text>
                            <TextInput
                                style={styles.questionsTextInput}
                                placeholder="Your Answer Comes Here"
                            />
                            <Touch>
                                <Text style={styles.questionSave}>Save Question</Text>
                            </Touch>
                        </View>
                        <View style={styles.questionsCard}>
                            <Text style={styles.questionsTxt}>This is where the question comes?</Text>
                            <TextInput
                                style={styles.questionsTextInput}
                                placeholder="Your Answer Comes Here"
                            />
                            <Touch>
                                <Text style={styles.questionSave}>Save Question</Text>
                            </Touch>
                        </View>
                        <View style={styles.questionsCard}>
                            <Text style={styles.questionsTxt}>This is where the question comes?</Text>
                            <TextInput
                                style={styles.questionsTextInput}
                                placeholder="Your Answer Comes Here"
                            />
                            <Touch>
                                <Text style={styles.questionSave}>Save Question</Text>
                            </Touch>
                        </View>
                        <View style={styles.questionsCard}>
                            <Text style={styles.questionsTxt}>This is where the question comes?</Text>
                            <TextInput
                                style={styles.questionsTextInput}
                                placeholder="Your Answer Comes Here"
                            />
                            <Touch>
                                <Text style={styles.questionSave}>Save Question</Text>
                            </Touch>
                        </View>
                        <View style={styles.generateContainer}>
                        <Touch>
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
export default MyBusinessScreen;

const styles = StyleSheet.create({
    generateContainer:{
    
        marginTop:20,
        paddingTop: 20,
        backgroundColor: 'transparent'
    },

    questionSave:{
        color:'white',
        fontFamily: 'Gerogia, serif',
        fontSize: 20,
        marginLeft: 170


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
        textAlign:'left',
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

        marginLeft:200,
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
        backgroundColor:'#edd09a',
    },
    questionsTxt:{
        fontFamily:'Georgia, Serif',
        fontSize: 20,
        color:'white'

    }
})
