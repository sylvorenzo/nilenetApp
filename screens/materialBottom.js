import React, { useEffect,useState   } from 'react';
import FeedScreen from './feed';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './home';
import PostScreen from './post';
import MyBusinessScreen from './mybusiness';
import OpportunityScreen from './opportunity';
import ProjectScreen from './projects';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Tab = createMaterialBottomTabNavigator();
function BottomStackSection(){

  const [items,setItems] = useState([])

  useEffect(()=>{

    database().ref(`users/${auth().currentUser.uid}`).on('value', snapshot =>{
      if(snapshot.exists()){
           let Items = snapshot.val();
           let newItems = [];
           for(let x = 0; x< 1; x++){
           
               newItems.push({
                   username: Items.username,
                   surname:Items.surname,
                   companyName: Items.companyName,
                   profileImage: Items.profileImage,
                   sector: Items.sector,
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
          tabBarColor:'gray',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name="Feed" component={FeedScreen} options={{
          tabBarLabel: 'Feed',
          tabBarColor:'black',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="post-outline" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name ="post" component={PostScreen} options={{
          tabBarLabel: 'Create Post',
          tabBarColor:'gray',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name ="opportunities" component={OpportunityScreen} options={{
          tabBarLabel: 'Opportunity',
          tabBarColor:'black',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line-variant" color={color} size={26} />
          ),
        }}/>
      

        {items.map(item=>{
          if(item.type === 'Entrepreneur'){
            return(
              <Tab.Screen name ="mybusiness" component={MyBusinessScreen} options={{
                tabBarLabel: 'My Business',
                tabBarColor:'gray',
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