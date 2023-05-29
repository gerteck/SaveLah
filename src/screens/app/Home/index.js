import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ( ) => {


    return (
        <SafeAreaView>
            <AppHeader title="Home" />
        </SafeAreaView>
    )
}

export default React.memo(Home);