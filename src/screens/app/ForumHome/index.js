import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../../components/AppHeader";


const ForumHome = ({ navigation }) => {

    const onChat = () => {
        navigation.navigate('ForumAllChats');
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Forum" showChat onChat={onChat}/>
        </SafeAreaView>
    )
}

export default React.memo(ForumHome);