import React, {useState, useEffect, useCallback, useContext} from "react";
import {Text, View, Image } from "react-native";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import { colors } from '../../../utils/colors';

//Gifted Chat
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { SafeAreaView } from "react-native-safe-area-context";

//Firestore
import { getApp } from "firebase/app";
import { getFirestore, getDoc, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { UserProfileContext } from "../../../context/UserProfileContext";

import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";

const app = getApp; 
const db = getFirestore(app);

const ForumChat = ( {navigation, route} ) => {

    const [userProfile, setUserProfile] = useContext(UserProfileContext);
    const [otherProfile, setOtherProfile] = useState(route.params?.profile); 

    // Your messages
    const [messages, setMessages] = useState([]);

    const chatUid1 = userProfile.uid + "_" + otherProfile.uid;
    const chatUid2 = otherProfile.uid + "_" + userProfile.uid;    
    const [chatUidUsed, setChatUidUsed] = useState("");

    // Initialize profile
    useEffect( () => {
        setOtherProfile(route.params?.profile);
    }, [route])

    // function to change date object into readable date object
    const updatedTimeArray = (array) => array.map(message => {
        return {...message, createdAt: message.createdAt.toDate()}
    });

    // Look in database
    useEffect( () => {
        const getChats = async () => {
            const chatRef1 = doc(db, "messages", chatUid1);
            const chatRef2 = doc(db, "messages", chatUid2);
       
            let chatSnap = await getDoc(chatRef1);
            setChatUidUsed(chatUid1);

            // message document is named chatUid1.
            if (chatSnap.exists()) {
                
                // Sets a listener to listen to changes on firestore.
                const unsub = onSnapshot(doc(db, "messages", chatUid1), (doc) => {
                    setMessages(updatedTimeArray(doc.data().messages))
                });
            }
            
            // message document is named chatUid2.
            if (!chatSnap.exists()) {
                // console.log("Get next ref");
                chatSnap = await getDoc(chatRef2);
                setChatUidUsed(chatUid2);
                if (chatSnap.exists()) {
                    const unsub = onSnapshot(doc(db, "messages", chatUid2), (doc) => {
                        setMessages(updatedTimeArray(doc.data().messages));
                    });
                }
            }
            
            // no message document exists. //setDoc for chat only if we start a chat.
            if (!chatSnap.exists()) {
                setChatUidUsed(chatUid1);
                await setDoc(doc(db, "messages", chatUid1), {
                    messages: []
                });
                const unsub = onSnapshot(doc(db, "messages", chatUid1), (doc) => {
                    setMessages(updatedTimeArray(doc.data().messages));
                });
            }
        }
        getChats();
    }, [route])

    const updateMessages = (newMessage = []) => {
        lastMessage = newMessage[0].text;
        newMessageArray = GiftedChat.append(messages, newMessage);
        uploadMessage(newMessageArray, lastMessage);
    }

    const uploadMessage = (data, lastMessage) => {
        const saveMessages = async (data) => {
            await setDoc(doc(db, "messages", chatUidUsed), {
                messages: data
            }, { merge: true });
            await setDoc(doc(db, "chats", chatUidUsed), {
                chatUid: chatUidUsed,
                lastMessage: lastMessage,
                lastSenderId: userProfile.uid,
                timestamp: new Date(),
                userIds: [userProfile.uid, otherProfile.uid]
            }, { merge: true });
        }
        saveMessages(data); 
    }

    const renderBubble = (props) => {
        return (
        <Bubble {...props} 
        wrapperStyle={{left: {backgroundColor: colors.backgroundGrey}}}
        textStyle={{left: {color: colors.black}}} />
    )}

    const renderSend = (props) => {
        return (
        <Send {...props}>
            <Image source={require('../../../assets/icons/send.png')} style={styles.sendIcon}/>
        </Send>
        );
    }

    const scrollToBottomComponent = () => {
        return (
        <Image source={require('../../../assets/icons/doubleDown.png')} style={styles.downIcon}/>
        );
    }

    const onBack = () => {
        navigation.goBack();
    };

    // Pass the profile item into the route.params.item
    const onUserPress = () => {
        const item = otherProfile;
        navigation.navigate('ProfileOtherUser', { item });
    };
    
    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];
  
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={[styles.appHeader, {backgroundColor: activeColors.containerBackground}]} 
                title={otherProfile?.username} showBack onBack={onBack} userPictureURL={otherProfile.url} onUserPicture={onUserPress}/>
            
            <View style={[styles.chatContainer, {backgroundColor: activeColors.inputBackground}]}>
                <GiftedChat messages={messages} onSend={newMessage => updateMessages(newMessage)} 
                user={{_id: userProfile?.uid, avatar: userProfile.url}}
                renderBubble={renderBubble} 
                alwaysShowSend renderSend={renderSend}
                scrollToBottom scrollToBottomComponent={scrollToBottomComponent}
                />
            </View>
        </SafeAreaView>
    )
}

export default React.memo(ForumChat);