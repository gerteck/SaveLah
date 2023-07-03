import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image, Pressable, TouchableOpacity } from "react-native";
import { styles } from './styles';
import { colors } from "../../utils/colors";

import { getApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const app = getApp;
const db = getFirestore(app);

// 3 things that produces notifications:
/*
- New follower (done)
- New comment on a post
- New upvote on a post
*/ 


const NotificationList = ({notifications, navigation}) => {

    // Approach is to put all the profiles needed into a common hashmap
    // e.g. for followers, comments where profile picture url is needed.
    // Unfortunately bc of the variable capture it still does it duplicated times...

    const [profilesHashMap, setProfilesHashmap] = useState({}); 
    
    const addProfile = (uid, profileObject) => {
        setProfilesHashmap(profiles => ({...profiles, [uid]: profileObject}))
    } 

    useEffect(()=> {
        getProfiles(notifications);
    }, [notifications])

    // Get Data of Follow User Profiles
    const getProfiles = async (notifications) => {
        notifications.forEach( (notification) => {
            if (notification?.uid && !profilesHashMap.hasOwnProperty(notification?.uid)) {
                const userUid = notification.uid;
                const getProfile = async () => {
                    const userRef = doc(db, "users", userUid);
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        addProfile(userUid, docSnap.data());
                        console.log("Got profile success");
                    } else {
                        addProfile(userUid, {uid: userUid});
                        console.log("User Profile cannot be found for Notifications!");
                    } 
                }
                getProfile();
            }
        })
    } 


    const renderNotifications = ({item}) => {
        // fields: createdAt, details, id, uid, isRead, notificationType

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const notificationDate = item?.createdAt.toDate();
        const notificationTimestamp = notificationDate.getDate() + " " + monthNames[notificationDate.getMonth()] + " ";
        
        // Follow Notification
        if (item?.notificationType == "follow" || item?.notificationType == "comment") {
            const profile = profilesHashMap[item.uid];

            let onNotificationPress;
            if (item.notificationType == "comment") {
                const goPost = () => {
                    // get Post Data:
                    const getPost = async () => {
                        const postRef = doc(db, "posts", item?.postId);
                        const docSnap = await getDoc(postRef);
                        const postDetails = docSnap.data();
                        navigation.navigate('ForumPost', {post: postDetails});
                    }
                    getPost();
                };
                onNotificationPress = goPost;
            } else if (item.notificationType == "follow") {
                const onUserPress = () => {
                    navigation.navigate('ProfileOtherUser', { item: profile });
                };
                onNotificationPress = onUserPress;
            }

            return (
                <>
                <Pressable style={styles.followNotificationContainer} onPress={onNotificationPress}>
                    <View style={styles.row}>
                        <View style={styles.iconBubble}>
                            <Image style={styles.displayPicture} source={{ uri: profile?.url}} />
                        </View>
                        <Text style={styles.notificationText}>{item.details}</Text>
                    </View> 
                    <Text style={styles.timestamp}>{notificationTimestamp}</Text>
                </Pressable>
    
                <View style={styles.divider} />
                </>    

            )
        }

        // Default 
        return (
            <Pressable key={item.id} onPress={()=>{}}>
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

