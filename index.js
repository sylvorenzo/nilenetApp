/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import React, {useState,useEffect} from 'react';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import PushNotification from 'react-native-push-notification';


    
 

AppRegistry.registerComponent(appName, () => App);
