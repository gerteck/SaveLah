import React, { useContext, useState, useEffect } from "react";
import {Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import { UserProfileContext } from "../../../context/UserProfileContext";

import { getApp } from "firebase/app";
import { collection, doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import NotificationList from "../../../components/NotificationList";

// 3 things that produces notifications:
/*
- New follower
- New comment on a post
- New upvote on a post
*/ 

const app = getApp;
const db = getFirestore(app);

const Notifications = ( { navigation } ) => {

    const [userProfile, setUserProfile] = useContext(UserProfileContext);

    const [allNotifications, setAllNotifications] = useState([]);

    // Set up listener for Notifications
    const getAllNotifications = () => { 
        const collectionRef = collection(db, 'notifications',  userProfile?.uid, 'notifications');
        const updateRead = async (notificationId) => {
            await setDoc(doc(db, 'notifications',  userProfile?.uid, 'notifications', notificationId), {
                isRead: true,
            }, { merge: true }); 
        }

        const unSubNotifications = onSnapshot(collectionRef, (querySnapshot) => {
            const notifications = [];
            querySnapshot.forEach((doc) => {
                notifications.push(doc.data());
                if (doc.data()?.isRead == false) {
                    updateRead(doc.data().id);
                }
            })
            const sortByDate = (a, b) => {
                return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
            }
            notifications.sort(sortByDate);
            setAllNotifications(notifications);
            console.log("Get Notification Details");
        })
        return unSubNotifications;
    } 

    useEffect(() => {
        const unsub = getAllNotifications();
        return () => {
            unsub();
        }
    }, []);

    const onBack = () => {
        navigation.goBack();
    };

    // console.log(allNotifications);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} navigation={navigation} title="Notifications" showCross onBack={onBack}/>
            
            { Notifications.length == 0 ?
            
                <View style={styles.emptyPostBox}>
                    <Text style={styles.emoticon}>(－_－) zzZ </Text>
                    <Text style={styles.noPostText}>Nothing to see here...</Text>
                    <Text style={styles.emoticon}>…ᘛ⁐̤ᕐᐷ</Text>
                </View>
            : 
                <View style={styles.emptyPostBox}>
                    <NotificationList notifications={allNotifications} navigation={navigation}/>                    
                </View>

            }   


        </SafeAreaView>
    )
}

export default React.memo(Notifications);