import React from "react";
import {Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";

import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { getApp } from "firebase/app";

// By Default, We use SafeAreaView to wrap. If displaying Image, might wnat to use normal view.
const app = getApp;
const db = getFirestore(app);

const ScreenTemplate = ( ) => {
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader style={styles.appHeader} title={"Screen Template"}/>
            <Text> ScreenTemplate </Text>
        </SafeAreaView>
    )
}

export default React.memo(ScreenTemplate);