import React from "react";
import {ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import { useLogout } from "../../../hooks/useLogout";
import Button from "../../../components/Button";

import { reloadAsync } from 'expo-updates';
import { StackActions } from "@react-navigation/native";

// By Default, We use SafeAreaView to wrap. If displaying Image, might wnat to use normal view.

const Settings = ( { navigation } ) => {

    const { logout, error, isPending } = useLogout();

    const onLogout = async () => {
        logout();     
    }

    const onBack = () => {
        navigation.goBack();
    }
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader title="Settings" showBack onBack={onBack}/>

            
            {!isPending && <Button onPress={onLogout} style={styles.button} title="Log out"  />}
            {isPending && <Button onPress={onLogout} style={styles.button} disabled={true} title="loading"  />}
            { error && <p>{ error }</p> }

        </SafeAreaView>
    )
}

export default React.memo(Settings);