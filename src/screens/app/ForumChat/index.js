import React from "react";
import {Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';

// By Default, We use SafeAreaView to wrap. If displaying Image, might wnat to use normal view.

const ForumChat = ( ) => {
    
    return (
        <SafeAreaView>
            <Text> ForumChat </Text>
        </SafeAreaView>
    )
}

export default React.memo(ForumChat);