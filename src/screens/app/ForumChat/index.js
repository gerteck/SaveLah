import React, {useState, useEffect, useCallback} from "react";
import {Text, View, Image } from "react-native";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import { colors } from '../../../utils/colors';

//Gifted Chat
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { SafeAreaView } from "react-native-safe-area-context";

// By Default, We use SafeAreaView to wrap. If displaying Image, might wnat to use normal view.

const ForumChat = ( {navigation, route} ) => {

  //console.log("Forum Chat");

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
    
  return (
      <SafeAreaView style={styles.mainContainer}>
          <AppHeader style={styles.appHeader} title={route.params.name} showBack onBack={onBack}/>
          <View style={styles.chatContainer}>
            <GiftedChat messages={messages} onSend={messages => onSend(messages)} 
              user={{_id: 1,}}
              renderBubble={renderBubble} 
              alwaysShowSend renderSend={renderSend}
              scrollToBottom scrollToBottomComponent={scrollToBottomComponent}
            />
          </View>
      </SafeAreaView>
  )
}

export default React.memo(ForumChat);