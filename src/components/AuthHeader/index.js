import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import { styles } from './styles';

const AuthHeader = ({title, onBackPress, titleColorStyle}) => {

    return (
        <View style={styles.container}>
            <Pressable onPress={onBackPress}> 
                <Image style={styles.image} source={require('../../assets/authPages/arrow.png')} />
            </Pressable>
            <Text style={[styles.title, titleColorStyle]}>{title}</Text>
        </View>
    )

}

export default React.memo(AuthHeader);