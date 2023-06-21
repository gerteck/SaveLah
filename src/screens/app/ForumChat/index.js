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
import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';
import { UserProfileContext } from "../../../context/UserProfileContext";

const app = getApp; 
const db = getFirestore(app);

const ForumChat = ( {navigation, route} ) => {

    const [userProfile, setUserProfile] = useContext(UserProfileContext);
    const [otherProfile, setOtherProfile] = useState(route.params?.profile); 

    // Your messages
    const [messages, setMessages] = useState([]);

    const chatUid1 = userProfile.uid + "_" + otherProfile.uid;
    const chatUid2 = otherProfile.uid + "_" + userProfile.uid;

    // Initialize profile
    useEffect( () => {
        console.log("Forum Chat refresh.")
        setOtherProfile(route.params?.profile);
    }, [route])

    // Look in database
    useEffect( () => {
        const getChats = async () => {
            const chatRef = doc(db, "messages", chatUid1);
            const chatSnap = await getDoc(chatRef);
            if (chatSnap.exists()) {
                // console.log(chatSnap.data());
                const array = chatSnap.data().messages;
                const updatedArray = array.map(message => {
                    const updatedDate = {...message, createdAt: message.createdAt.toDate()}
                    return updatedDate;
                })
                setMessages(updatedArray);
              } else {
                // if does not exist, we must create four documents: 2 message documents and 2 chat documents
                await setDoc(doc(db, "messages", chatUid1), {
                    messages: {}
                });
                await setDoc(doc(db, "messages", chatUid2), {
                    messages: {}
                });
                await setDoc(doc(db, "chats", chatUid1), {
                    chatUid: chatUid1,
                    lastMessage: "",
                    userIds: [userProfile.uid, otherProfile.uid]
                });
                await setDoc(doc(db, "chats", chatUid2), {
                    chatUid: chatUid2,
                    lastMessage: "",
                    userIds: [otherProfile.uid, userProfile.uid]
                });
              }
        }
        getChats();
        console.log("Loaded Messages");
    }, [route])

    // the messages are an array of objects.

    // useEffect(() => {
    //     setMessages([
    //     {    _id: 1,
    //         text: 'Hello developer',
    //         createdAt: new Date(),
    //         user: { _id: 2, name: 'React Native', avatar: 'https://placeimg.com/140/140/any'},
    //     },
    //     {    _id: 2,
    //         text: 'Hello World',
    //         createdAt: new Date(),
    //         user: {_id: 1, name: 'React Native', avatar: 'https://placeimg.com/140/140/any', },
    //     },
    //     ])
    // }, [])

    const onSend = useCallback((newMessage = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
        const saveMessages = async () => {
            await setDoc(doc(db, "messages", chatUid1), {
                messages: messages
            }, { merge: true });
            await setDoc(doc(db, "messages", chatUid2), {
                messages: messages
            }, { merge: true });
        }
        saveMessages();
    }, [])

    const log = () => {
        console.log(messages);
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
        
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} title={otherProfile?.username} showBack onBack={onBack} userPictureURL={otherProfile.url} onUserPicture={log}/>
            
            <View style={styles.chatContainer}>
                <GiftedChat messages={messages} onSend={newMessage => {onSend(newMessage)}} 
                user={{_id: userProfile?.uid}}
                renderBubble={renderBubble} 
                alwaysShowSend renderSend={renderSend}
                scrollToBottom scrollToBottomComponent={scrollToBottomComponent}
                />
            </View>
        </SafeAreaView>
    )
}

export default React.memo(ForumChat);