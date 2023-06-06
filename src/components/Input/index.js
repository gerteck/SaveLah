import React, { useState } from "react";
import { Text, View, TextInput, Pressable, Image} from "react-native";
import { styles } from './styles';

const Input = ({label, placeholder, isPassword, onChangeText, value}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onEyePress = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.inputContainer}>
                <TextInput secureTextEntry={isPassword && !isPasswordVisible} 
                    placeholder={placeholder} style={styles.input}
                    value={value} onChangeText={onChangeText}/>
                
                { isPassword ? (
                <Pressable onPress={onEyePress}> 
                    <Image style={styles.eye} 
                        source={isPasswordVisible ? require('../../assets/authPages/eye.png') 
                            : require('../../assets/authPages/eye_closed.png')}/>
                </Pressable>
                ) : null }

            </View>
        </View>
    )

}

export default React.memo(Input);