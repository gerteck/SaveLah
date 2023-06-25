import React, {useContext, useEffect, useState} from "react";
import {ScrollView, Text, View, Image, Pressable } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../../../components/Box";

import { getApp } from "firebase/app";
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useIsFocused } from '@react-navigation/native';
import { UserProfileContext } from "../../../context/UserProfileContext";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Report from "../../../components/Report";
import { useCollection } from "../../../hooks/useCollection";
import SpendingReportTabs from "../../../components/SpendingReportTabs";

const Tab = createMaterialTopTabNavigator();

const SpendingReport = ({ navigation }) => {
    const { user } = useAuthContext();

    const { documents, error } = useCollection(
        'transactions/' + user?.uid + '/userTransactions',
        ["uid", "==", user?.uid],
        ["date", "desc"]   
    );
    
    const onBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader showBack onBack={onBack} title="Spending Report" /> 
            {documents && <SpendingReportTabs documents={documents} />}
        </SafeAreaView>
    )
}

export default React.memo(SpendingReport);