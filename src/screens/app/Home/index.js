import React from "react";
import {Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles }  from './styles';
import { useLogout } from "../../../hooks/useLogout";

import AppHeader from "../../../components/AppHeader";
import Button from "../../../components/Button";

const Home = ( ) => {
    const { logout, error, isPending } = useLogout();

    const onLogout = async () => {
        logout();
    }

    return (
        <SafeAreaView>
            <AppHeader title="Home" />
            <Text> ScreenTemplate </Text>
            {!isPending && <Button onPress={onLogout} style={styles.button} title="Log out"  />}
            {isPending && <Button onPress={onLogout} style={styles.button} disabled={true} title="loading"  />}
            { error && <p>{ error }</p> }
        </SafeAreaView>
    )
}

export default React.memo(Home);