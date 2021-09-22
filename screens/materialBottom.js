import React, { useEffect,useState   } from 'react';
import FeedScreen from './feed';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostScreen from './post';
import MyBusinessScreen from './mybusiness';
import OpportunityScreen from './opportunity';
import ProjectScreen from './projects';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Tab = createMaterialBottomTabNavigator();
function BottomStackSection(){
  // const created to store database data
  const [items,setItems] = useState([])

  useEffect(()=>{

    // retrieves type from database
    database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot =>{
      if(snapshot.exists()){
           let Items = snapshot.val();
           let newItems = [];
           for(let x = 0; x< 1; x++){
           
               newItems.push({
                type:Items.type     
               });
       
           }
           setItems(newItems);
      }

  });

  },[])

    return(
        <Tab.Navigator initialRouteName="Home"
        activeColor="white"
        barStyle={{ backgroundColor: 'black' }}
        >
        <Tab.Screen name="project" component={ProjectScreen} options={{
          tabBarLabel: 'Projects',
          tabBarColor:'#eb7434',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name="Feed" component={FeedScreen} options={{
          tabBarLabel: 'Feed',
          tabBarColor:"#f85900",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="post-outline" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name ="post" component={PostScreen} options={{
          tabBarLabel: 'Create Post',
          tabBarColor:'#eb7434',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name ="opportunities" component={OpportunityScreen} options={{
          tabBarLabel: 'Opportunity',
          tabBarColor:"#f85900",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line-variant" color={color} size={26} />
          ),
        }}/>
      

        {items.map(item=>{
          if(item.type === 'Entrepreneur'){
            return(
              <Tab.Screen name ="mybusiness" component={MyBusinessScreen} options={{
                tabBarLabel: 'Statistics',
                tabBarColor:"#eb7434",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="chart-pie" color={color} size={26} />
                ),
              }}/>
            )
          }
        })}

      </Tab.Navigator>
    )
}
export default BottomStackSection;