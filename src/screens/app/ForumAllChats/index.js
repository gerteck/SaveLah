import React, { useContext, useEffect, useState } from "react";
import {FlatList, Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import Box from "../../../components/Box";

import { collection, getFirestore, getDocs, query, where, onSnapshot, getDoc, doc } from "firebase/firestore";  
import { getApp } from "firebase/app";
import { UserProfileContext } from "../../../context/UserProfileContext";

const app = getApp; 
const db = getFirestore(app);


const ForumAllChats = ({ navigation }) => {

    const [userProfile, setUserProfile] = useContext(UserProfileContext); 
    const [chatsProfilesArray, setChatsProfilesArray] = useState(null); 
    
    
    useEffect(() => {
        const chatsCollection = collection(db, "chats");
        const chatsQuery = query(chatsCollection, where("userIds", "array-contains", userProfile.uid));

        const unsubscribe = onSnapshot(chatsQuery, async (querySnapshot) => {
            const array = querySnapshot.docs.map(x => x.data())
            const chatsArray = array.sort( (a, b) => { return b.timestamp.toDate() - a.timestamp.toDate() } );
            
            const profileIds = chatsArray.map(x => pullOtherUid(x))
            const profilesArray = await Promise.all(profileIds.map(x => getProfile(x)));            
            const combinedArray = chatsArray.map((item, i) => {
                return {chat: item, profile: profilesArray[i]}
            })
            setChatsProfilesArray(combinedArray);
        });
    }, [])

    // unsubscribe()

    // Get Data of Follow User Profiles
    const getProfile = async (userUid) => {
        const userRef = doc(db, "users", userUid);
        const docSnap = await getDoc(userRef); 
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document! Error Finding User");
            return ({uid: userUid});
        } 
    }

    const pullOtherUid = (chatDocument) => {
        const uid1 = chatDocument.userIds[0];
        const uid2 = chatDocument.userIds[1];
        return uid1 == userProfile.uid ? uid2 : uid1;
    }

    const onBack = () => {
        navigation.goBack();
    };

    const onMessageUser = (otherProfile) => {
        navigation.navigate('ForumChat', {profile: otherProfile});
    };

    const renderChats = ({item: chatProfile}) => {
        // console.log(chatProfile);
        date = chatProfile.chat.timestamp.toDate();
        day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        month = monthNames[date.getMonth()];
        dateString = day + " " + month;
        return (
            <>
            <Pressable style={styles.chatContainer} onPress={() => onMessageUser(chatProfile.profile)}>

                <View style={styles.iconBubble}>
                    <Image style={styles.icon} source={{uri: chatProfile.profile.url}} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{chatProfile.profile.username}</Text>
                    <Text style={styles.message}>{chatProfile.chat.lastMessage}</Text>
                </View>
                <View style={{flex: 1}} />
                <Text style={styles.time}>{dateString}</Text>

            </Pressable>

            <View style={styles.divider} />
            </>
        )
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} title="All Chats" showBack onBack={onBack}/>
            
            <View style={styles.whiteView}>

            {chatsProfilesArray && <FlatList data={chatsProfilesArray} keyExtractor={chatProfile => chatProfile.chat.chatUid} renderItem={renderChats} 
                    showsVerticalScrollIndicator={false}/> }
                    
            </View>

        </SafeAreaView>
    )
}

export default React.memo(ForumAllChats);