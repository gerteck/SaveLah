import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../../components/AppHeader";

import { useLogout } from "../../../hooks/useLogout";
import Button from "../../../components/Button";


const Profile = ( ) => {
    const { logout, error, isPending } = useLogout();

    const onLogout = async () => {
        logout();
    }

    return (
        <SafeAreaView>
            <AppHeader title="Profile" />
            {!isPending && <Button onPress={onLogout} style={styles.button} title="Log out"  />}
            {isPending && <Button onPress={onLogout} style={styles.button} disabled={true} title="loading"  />}
            { error && <p>{ error }</p> }
        </SafeAreaView>
    )
}

export default React.memo(Profile);