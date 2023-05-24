import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from './styles';

const Button = ({title, onPress, style}) => {

    console.log("Inside Button Rerender")

    return (
        // hitSlop={20}
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} 
            style={ [styles.container, style]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    
    )

}

export default React.memo(Button);