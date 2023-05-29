import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';

import AppHeader from "../../../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionHistory = ( ) => {

    return (
        <SafeAreaView>
            <AppHeader title="Transaction History" />
        </SafeAreaView>
    )
}

export default React.memo(TransactionHistory);