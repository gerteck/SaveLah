import React from "react";
import {Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";

// Needs to be dynamic

const ProfileFollow = ( { navigation } ) => {

    const onBack = () => {
        navigation.goBack();
    }
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader onBack={onBack} showCross style={styles.appHeader} title={"Follow: show user name"}/>
            <Text> ScreenTemplate </Text>
        </SafeAreaView>
    )
}

export default React.memo(ProfileFollow);