import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';
import { useLogout } from "../../../hooks/useLogout";
import Button from "../../../components/Button";

const Home = ( ) => {
    const { logout, error, isPending } = useLogout();

    const onLogout = async () => {
        logout();
    }

    return (
        <View>
            <Text> ScreenTemplate </Text>
            {!isPending && <Button onPress={onLogout} style={styles.button} title="Log out"  />}
            {isPending && <Button onPress={onLogout} style={styles.button} disabled={true} title="loading"  />}
            { error && <p>{ error }</p> }
        </View>
    )
}

export default React.memo(Home);