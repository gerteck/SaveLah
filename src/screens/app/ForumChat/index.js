import React, {useState, useEffect, useCallback} from "react";
import {SafeAreaView, Text, View } from "react-native";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";

//Gifted Chat
import { GiftedChat } from 'react-native-gifted-chat'

// By Default, We use SafeAreaView to wrap. If displaying Image, might wnat to use normal view.

const ForumChat = ( {navigation, route} ) => {

    const onBack = () => {
        navigation.goBack();
    };

    const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello World',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
    
    return (
        <>
            <AppHeader style={styles.appHeader} title={route.params.name} showBack onBack={onBack}/>
            <GiftedChat messages={messages} onSend={messages => onSend(messages)} user={{_id: 1,}} />
        </>
    )
}

export default React.memo(ForumChat);