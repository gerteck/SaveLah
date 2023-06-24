import React from "react";
import {Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";

// By Default, We use SafeAreaView to wrap. If displaying Image, might wnat to use normal view.

const Notifications = ( { navigation } ) => {

    const onBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} navigation={navigation} title="Notifications" showCross onBack={onBack}/>
            <View style={styles.emptyPostBox}>
                <Text style={styles.emoticon}>(－_－) zzZ</Text>
                <Text style={styles.noPostText}>Nothing to see here...</Text>
                <Text style={styles.emoticon}>…ᘛ⁐̤ᕐᐷ</Text>
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Notifications);