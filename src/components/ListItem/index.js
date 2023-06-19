import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { styles } from './styles';

const ListItem = ({title, subtitle, onPress, style}) => {

    return (
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                
                {/* put subtitle text component only if there is subtitles. */}
                { !!subtitle ? (
                    <Text style={styles.subtitle}>{subtitle}</Text>) : null }
                
            </View>
            <Image style={styles.arrow} source={require("../../assets/icons/rightArrow.png")} />
        </Pressable>

    )

}

export default React.memo(ListItem);
