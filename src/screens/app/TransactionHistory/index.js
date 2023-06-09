import React, { useEffect } from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';

import AppHeader from "../../../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import TransactionList from "../../../components/TransactionList";
import { useReducer } from "react";

const TransactionHistory = ( { navigation } ) => {

    const { user } = useAuthContext();

    let userId = null;

    if(user) {
        userId = user.uid;
    }

    useEffect(() => {
        if(user) {
            userId = user.uid;
        } else {
            userId = null;
        }
    },[user])

    const { documents, error } = useCollection(
        'transactions',
        ["uid", "==", userId],
        ["createdAt", "desc"]   
    );    

    //onsole.log(documents);

    const onBell = () => {
        navigation.navigate('Notifications');
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Transaction History" showBell onBell={onBell} />
            <View>
                {error && <Text>{error}</Text>}
                {documents && <TransactionList transactions={documents} />}
            </View>
        </SafeAreaView>
    )
}

export default React.memo(TransactionHistory);