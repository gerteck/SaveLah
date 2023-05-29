import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../../components/AppHeader";


const Profile = ( ) => {
    
    return (
        <SafeAreaView>
            <AppHeader title="Profile" />
        </SafeAreaView>
    )
}

export default React.memo(Profile);