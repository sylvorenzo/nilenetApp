import React from 'react';
import FeedScreen from './feed';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './home';
import PostScreen from './post';
import MyBusinessScreen from './mybusiness';
import OpportunityScreen from './opportunity';

const Tab = createMaterialBottomTabNavigator();
function BottomStackSection(){

    return(
        <Tab.Navigator initialRouteName="Home"
        activeColor="white"
        barStyle={{ backgroundColor: 'black' }}
        >
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarColor:'gray',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
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
        <Tab.Screen name ="mybusiness" component={MyBusinessScreen} options={{
          tabBarLabel: 'My Business',
          tabBarColor:'gray',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-pie" color={color} size={26} />
          ),
        }}/>
      </Tab.Navigator>
    )
}
export default BottomStackSection;