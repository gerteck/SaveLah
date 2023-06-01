import React from "react";
import {Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";



const Home = ( ) => {


    return (
        <SafeAreaView>
            <AppHeader title="SaveLah" showBell showBack/>
            <Text> ScreenTemplate </Text>
        </SafeAreaView>
    )
}

export default React.memo(Home);