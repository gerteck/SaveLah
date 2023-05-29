import React from "react";
import {Text, View } from "react-native";
import { styles }  from './styles';

import AppHeader from "../../../components/AppHeader";

const ForumHome = ( ) => {


    return (
        <View>
            <AppHeader title="Forum" />
        </View>
    )
}

export default React.memo(ForumHome);