import React, { useContext } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { styles } from './styles';
import { ThemeContext } from "../../context/ThemeContext";
import themeColors from "../../utils/themeColors";
import { Icon } from '@rneui/themed';

const ListItem = ({title, subtitle, onPress, style}) => {
    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode]; 

    return (
        <Pressable onPress={onPress} style={[styles.container, {backgroundColor: activeColors.editableBoxBackground}, style]}>
            <View style={styles.content}>
                <Text style={[styles.title, {color: activeColors.blue}]}>{title}</Text>
                
                {/* put subtitle text component only if there is subtitles. */}
                { !!subtitle ? (
                    <Text style={styles.subtitle}>{subtitle}</Text>) : null }
                
            </View>
            <Icon name='angle-right' style={styles.arrow} type='font-awesome' color={activeColors.iconColor}/> 
        </Pressable>

    )

}

export default React.memo(ListItem);
