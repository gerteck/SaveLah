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
    const emptyArray = [];
    // Your messages
    const [messages, setMessages] = useState(emptyArray);

    const chatUid1 = userProfile.uid + "_" + otherProfile.uid;
    const chatUid2 = otherProfile.uid + "_" + userProfile.uid;
    
    const [chatUidUsed, setChatUidUsed] = useState("");

    // Initialize profile
    useEffect( () => {
        console.log("Forum Chat refresh.")
        setOtherProfile(route.params?.profile);
    }, [route])

    // Look in database
    useEffect( () => {
        const getChats = async () => {
            const chatRef1 = doc(db, "messages", chatUid1);
            const chatRef2 = doc(db, "messages", chatUid2);
       
            let chatSnap = await getDoc(chatRef1);
            setChatUidUsed(chatUid1);

            if (!chatSnap.exists()) {
                console.log("Get next ref");
                chatSnap = await getDoc(chatRef2);
                setChatUidUsed(chatUid2);
            }

            if (chatSnap.exists()) {
                const array = chatSnap.data().messages;
                const updatedTimeArray = array.map(message => {
                    const updatedDate = {...message, createdAt: message.createdAt.toDate()}
                    return updatedDate;
                });
                setMessages(updatedTimeArray);
            } 
            
            if (!chatSnap.exists()) {
                await setDoc(doc(db, "messages", chatUid1), {
                    messages: []
                });
                await setDoc(doc(db, "chats", chatUid1), {
                    chatUid: chatUid1,
                    lastMessage: "",
                    userIds: [userProfile.uid, otherProfile.uid]
                });
                chatUidUsed = chatUid1;
                console.log("using: " + chatUid1);
            }
        }

        getChats();
        console.log("Chat id used:" + chatUidUsed);
        //console.log("Loaded Messages");
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

    const updateMessages = useCallback((newMessage = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
    }, [])

    useEffect(()=>{
        const uploadMessage = () => {
            const saveMessages = async () => {
                await setDoc(doc(db, "messages", chatUidUsed), {
                    messages: messages
                }, { merge: true });
            }
            saveMessages(); 
        }
        if (messages != emptyArray) {
            uploadMessage();
            //console.log("Uploaded Messages");
        } 


    }, [messages])

    // const uploadMessage = () => {
    //     const saveMessages = async () => {
    //         await setDoc(doc(db, "messages", chatUidUsed), {
    //             messages: messages
    //         }, { merge: true });
    //     }
    //     saveMessages();
    //     //console.log("Uploaded Messages");
    // }

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

    // console.log(userProfile.uid);
        
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} title={otherProfile?.username} showBack onBack={onBack} userPictureURL={otherProfile.url} onUserPicture={log}/>
            
            <View style={styles.chatContainer}>
                <GiftedChat messages={messages} onSend={newMessage => {updateMessages(newMessage)}} 
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