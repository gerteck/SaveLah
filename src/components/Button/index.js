import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from './styles';

const Button = ({title, onPress, style, disabled, testID}) => {

    return (
        // hitSlop={20}
        <TouchableOpacity testID={testID} activeOpacity={0.6} onPress={onPress} 
            style={ [styles.container, style]} disabled={disabled}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    
    )

}

export default React.memo(Button);