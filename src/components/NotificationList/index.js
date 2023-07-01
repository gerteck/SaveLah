import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image, Pressable, TouchableOpacity } from "react-native";
import { styles } from './styles';
import { colors } from "../../utils/colors";

import { getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = getApp;
const db = getFirestore(app);

const NotificationList = ({notifications, navigation}) => {

    // Approach is to put all the profiles needed into a common hashmap
    // e.g. for followers, comments where profile picture url is needed. 

    const [profilesHashMap, setProfilesHashmap] = useState({}); 

    useEffect(()=> {
        getProfiles(notifications);
    }, [])

    // Get Data of Follow User Profiles
    const getProfiles = async (notifications) => {
        // const followUserArray = [];
        notifications.forEach( (notification) => {

            
            if (notification?.uid && !profilesHashMap.hasOwnProperty(notification?.uid)) {
                // const getProfile = async () => {
                //     const userRef = doc(db, "users", uid);
                //     const docSnap = await getDoc(userRef);
                //     if (docSnap.exists()) {
                //         followUserArray.push(docSnap.data());
                //     } else {
                //         followUserArray.push({uid: uid});
                //         console.log("No such document! Error Finding User");
                //     } 
                // }
                // getProfile();
                console.log("Need to get uid.")     
            }
       
        });
    }



    const renderNotifications = ({item}) => {
        // fields: createdAt, details, id, isRead, notificationType
        
        const goPost = () => {
            navigation.navigate('ForumPost', {post: item});
        };
        
        // Follow Notification
        if (item?.notificationType == "follow") {
            
      


            return (
                <Pressable key={item.id} style={styles.mainContainer} onPress={()=>{}}>
                    <Text>Follow Notif</Text>
                </Pressable>

            )
        }

        return (

            <Pressable key={item.id} style={styles.mainContainer} onPress={()=>{}}>
                <Text>One Notification. Unknown Type. Error 404.</Text>
            </Pressable>

        )
    }


    return (
        <FlatList contentContainerStyle={styles.flatList} data={notifications} 
            showsVerticalScrollIndicator={false}
            keyExtractor={ item => item.id } 
            renderItem={renderNotifications} />
    )
}

export default React.memo(NotificationList);

