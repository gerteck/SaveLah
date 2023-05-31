import React from "react";
import { Text, View } from "react-native";
import { styles } from './styles';

const ComponentTemplate = ({title, onPress}) => {
    return (
        <View>
            <Text>ComponentTemplate</Text>
        </View>
    )
}

export default React.memo(ComponentTemplate);
