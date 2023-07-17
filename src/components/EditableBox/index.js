import React, { useContext } from "react";
import { Text, View, TextInput } from "react-native";
import { styles } from './styles';
import { ThemeContext } from "../../context/ThemeContext";
import themeColors from "../../utils/themeColors";

const EditableBox = ({label, value, onChangeText, editable, multiline}) => {
    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];

    return (
        <View style={[styles.container, {backgroundColor: activeColors.editableBoxBackground}]}>
            <Text style={[styles.label, {color: activeColors.text}]}>{label}</Text>
            <TextInput editable={editable} value={value} onChangeText={onChangeText} 
                style={[styles.input, {color: activeColors.blue}]} multiline={multiline}/>
        </View>
    )
}

export default React.memo(EditableBox);