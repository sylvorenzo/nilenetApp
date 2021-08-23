import PushNotification from "react-native-push-notification";



export const LocalNotification =()=>{
    PushNotification.localNotification({
        channelId: 'alert',
        autoCancel: true,
        bigText:'This is a local notification ',
        subText:'Local Notification Demo',
        title:'Local Notification Title',
        message: 'expand me to see more',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: '["Yes","No"]'

    })
}