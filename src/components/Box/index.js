import React from "react";
import { Text, View } from "react-native";
import { styles } from './styles';

const Box = ({content, style}) => {
    return (
        <View style={[styles.mainContainer, style]}>
            {content}
        </View>
    )
}

export default React.memo(Box);