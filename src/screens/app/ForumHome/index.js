import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../../components/AppHeader";


const ForumHome = ( ) => {

    return (
        <SafeAreaView>
            <AppHeader title="Forum" />
        </SafeAreaView>
    )
}

export default React.memo(ForumHome);