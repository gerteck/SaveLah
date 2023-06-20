import React from "react";
import { Text, View, TextInput } from "react-native";
import { styles } from './styles';

const EditableBox = ({label, value, onChangeText, editable, multiline}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput editable={editable} value={value} onChangeText={onChangeText} style={styles.input} multiline={multiline}/>
        </View>
    )
}

export default React.memo(EditableBox);