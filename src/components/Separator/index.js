import React from "react";
import { View, Text } from "react-native";
import { styles } from './styles';

const Separator = ({title, style}) => {
    return (
        <View style={[style, styles.container]}>
            <View style={styles.line}/>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.line}/>
        </View>

    )

}

export default React.memo(Separator);