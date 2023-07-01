import React, { useEffect } from "react";
import {Text, View, ScrollView } from "react-native";
import { styles }  from './styles';

import AppHeader from "../../../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import TransactionList from "../../../components/TransactionList";
import { useReducer } from "react";
import TransactionTabs from "../../../components/TransactionTabs";

const TransactionHistory = ( { navigation } ) => {

    const { user } = useAuthContext();

    const { documents, error } = useCollection(
        'transactions/' + user?.uid + '/userTransactions',
        ["uid", "==", user?.uid],
        ["date", "desc"]   
    );    

    const onBell = () => {
        navigation.navigate('Notifications');
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Transaction History" showBell onBell={onBell} style={styles.appHeader}/>
            
            {/* Tabs Overview Bar */}

            {error && <Text>{error}</Text>}
            {documents && <TransactionTabs docs={documents} navigation={navigation} />}
    </SafeAreaView>
      );
}

export default React.memo(TransactionHistory);