import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../../components/AppHeader";


const ForumHome = ( ) => {

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Forum" showChat/>
        </SafeAreaView>
    )
}

export default React.memo(ForumHome);