import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';

import AppHeader from "../../../components/AppHeader";

const Profile = ( ) => {
    
    return (
        <View>
            <AppHeader title="Profile" />
        </View>
    )
}

export default React.memo(Profile);