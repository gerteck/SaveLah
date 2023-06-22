import React, { useContext } from "react";
import {FlatList, Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import Box from "../../../components/Box";

import { collection, getFirestore, getDocs, query, where } from "firebase/firestore";  
import { getApp } from "firebase/app";
import { UserProfileContext } from "../../../context/UserProfileContext";

const app = getApp; 
const db = getFirestore(app);


const ForumChats = ({ navigation }) => {

    const [userProfile, setUserProfile] = useContext(UserProfileContext); 
    
    const chatsCollection = collection(db, "chats");
    const q = query(chatsCollection, where("userIds", "array-contains", userProfile.uid));
    const getData = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
    };
    getData();



  //hardcoded data:
    const Messages = [
    {
        id: '1',
        userName: 'Jenny Doe',
        userImg: require('../../../assets/DummyProfile.jpg'),
        messageTime: '4 mins ago',
        messageText: 'Hey.',
    },
    ];

    // key extractor is used to extract unique key for tracking item reordering

    const onMessageUser = () => {
    // navigation.navigate('ForumChat', {profile: otherProfile});
    };

    const onBack = () => {
        navigation.goBack();
    };

    const renderChats = ({item}) => {
        return (
            <>
            <Pressable style={styles.chatContainer} onPress={onMessageUser}>

                <View style={styles.iconBubble}>
                    <Image style={styles.icon} source={item.userImg} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.userName}</Text>
                    <Text style={styles.message}>{item.messageText}</Text>
                </View>
                <View style={{flex: 1}} />
                <Text style={styles.time}>{item.messageTime}</Text>
            </Pressable>

            <View style={styles.divider} />
            </>
        )
    };

    const Chats = (
        <FlatList data={Messages} keyExtractor={item => item.id} renderItem={renderChats} 
            showsVerticalScrollIndicator={false}/>
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} title="All Chats" showBack onBack={onBack}/>
            <Box style={styles.chatBox} content={Chats}/>

        </SafeAreaView>
    )
}

export default React.memo(ForumChats);