import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../../components/AppHeader";


const AddTransaction = ( ) => {


    return (
        <SafeAreaView>
            <AppHeader title="Add Transaction" />
        </SafeAreaView>
    )
}

export default React.memo(AddTransaction);