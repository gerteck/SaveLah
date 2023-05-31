import React from "react";
import {Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles }  from './styles';
import { useLogout } from "../../../hooks/useLogout";

import AppHeader from "../../../components/AppHeader";
import Button from "../../../components/Button";

const Home = ( ) => {


    return (
        <SafeAreaView>
            <AppHeader title="Home" />
            <Text> ScreenTemplate </Text>
        </SafeAreaView>
    )
}

export default React.memo(Home);