import React from "react";
import { View, Text } from "react-native";
import { styles } from './styles';

const Separator = ({title, style, textStyle}) => {
    return (
        <View style={[style, styles.container]}>
            <View style={styles.line}/>
            <Text style={[styles.text, textStyle]}>{title}</Text>
            <View style={styles.line}/>
        </View>

    )

}

export default React.memo(Separator);