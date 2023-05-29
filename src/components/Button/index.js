import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from './styles';

const Button = ({title, onPress, style, disabled}) => {

    return (
        // hitSlop={20}
        <TouchableOpacity disabled={disabled} activeOpacity={0.6} onPress={onPress} 
            style={ [styles.container, style]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    
    )

}

export default React.memo(Button);