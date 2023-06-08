import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';

import AppHeader from "../../../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import TransactionList from "../../../components/TransactionList";

const TransactionHistory = ( { navigation } ) => {

    const { user } = useAuthContext();

    const { documents, error } = useCollection(
        'transactions',
        ["uid", "==", user.uid],
        ["createdAt", "desc"]   
    );

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