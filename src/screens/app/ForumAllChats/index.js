import React from "react";
import {FlatList, Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import Box from "../../../components/Box";

// By Default, We use SafeAreaView to wrap. If displaying Image, might wnat to use normal view.

//hardcoded data:
const Messages = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../../../assets/DummyProfile.jpg'),
      messageTime: '4 mins ago',
      messageText:
        'Hey.',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../../../assets/DummyProfile.jpg'),
      messageTime: '2 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../../../assets/DummyProfile.jpg'),
      messageTime: '1 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../../../assets/DummyProfile.png'),
      messageTime: '1 day ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../../../assets/DummyProfile.png'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, Im Christy this is my test for a post of my social app in React Native.',
    },

    {
        id: '6',
        userName: 'Christy Alex',
        userImg: require('../../../assets/DummyProfile.png'),
        messageTime: '2 days ago',
        messageText:
          'Hey there, Im Christy this is my test for a post of my social app in React Native.',
      },

      {
        id: '8',
        userName: 'Christy Alex',
        userImg: require('../../../assets/DummyProfile.png'),
        messageTime: '2 days ago',
        messageText:
          'Hey there, Im Christy this is my test for a post of my social app in React Native.',
      },
      {
        id: '9',
        userName: 'Alex Man',
        userImg: require('../../../assets/DummyProfile.png'),
        messageTime: '2 days ago',
        messageText:
          'Hey there, Im Christy this is my test for a post of my social app in React Native.',
      },
  ];

// key extractor is used to extract unique key for tracking item reordering


const ForumChats = ({ navigation }) => {

    const onBack = () => {
        navigation.goBack();
    };

    const renderChats = ({item}) => {
        return (
            <>
            <Pressable style={styles.chatContainer} onPress={() => navigation.navigate('ForumChat', 
                {name: item.userName})}>

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
            <AppHeader style={styles.appHeader} title="Chats" showBack onBack={onBack}/>
            <Box style={styles.chatBox} content={Chats}/>

        </SafeAreaView>
    )
}

export default React.memo(ForumChats);