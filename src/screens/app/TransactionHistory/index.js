import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';

import AppHeader from "../../../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionHistory = ( { navigation } ) => {

    const onBell = () => {
        navigation.navigate('Notifications');
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Transaction History" showBell onBell={onBell} />
        </SafeAreaView>
    )
}

export default React.memo(TransactionHistory);