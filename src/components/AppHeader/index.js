import React, {useState, useContext} from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from './styles';

import Input from "../Input";
import { Badge, Icon, withBadge } from '@rneui/themed';
import { NotificationNumberContext } from "../../context/NotificationNumberContext";
import { ThemeContext } from "../../context/ThemeContext";
import themeColors from "../../utils/themeColors";


const AppHeader = ({  style, 
                    // Left Side Options
                    showBack, onBack, showCross, 
                    // Right Side Options:
                    showBell, onBell, 
                    showChat, onChat,
                    showDelete, onDelete,
                    userPictureURL, onUserPicture,
                    title,
                }) => {
    
                
    const [notificationNumber, setNotificationNumber] = useContext(NotificationNumberContext);

    const { theme }  = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];

    const NotificationComponent = () => {
        if (notificationNumber <= 0) {
            return <Icon name='notifications' type='ionicon' size={24} color={activeColors.iconColor} /> 
        } else {
            const BadgedNotification = withBadge(notificationNumber)(Icon);
            return <BadgedNotification type="ionicon" name="notifications" style={styles.notificationIcon} color={activeColors.iconColor}/>
        }
    }

    const maxLength = 23;
    const cutTitle = (title) => {
        if (title.length <= maxLength) {
            return title;
        } else {
            return title.slice(0,20) + "...";
        }
    }
    
    return (
        <View style={[styles.mainContainer, style]}>
            {/*Left Icons go Here*/}
            <View style={styles.leftIcons}> 
                {showBack ? (
                    <Pressable onPress={onBack} > 
                        <Icon name='angle-left' type='font-awesome' style={styles.icon} color={activeColors.iconColor}/> 
                    </Pressable>
                ) : showCross ? (
                    <Pressable onPress={onBack} style={styles.crossContainer}> 
                        <Icon name='times' type='font-awesome' color={activeColors.iconColor}/> 
                    </Pressable>
                ) : <View style={styles.space}/> } 
            </View> 
            
            {/*Title:*/}
            <Text style={[styles.title, {color: activeColors.text} ]}>{cutTitle(title)}</Text>   
            
            {/*Right Icons go Here*/}
            <View style={styles.rightIcons}> 

                { showChat ? (
                    <TouchableOpacity onPress={onChat}> 
                        <Icon name='comments' type='font-awesome' color={activeColors.iconColor}/>
                    </TouchableOpacity>
                ) : null }
                
                {/* Notification Icon!! */}
                { showBell ? (
                    <TouchableOpacity onPress={onBell} style={styles.notificationContainer}> 
                        {NotificationComponent()}
                    </TouchableOpacity>
                ) : null }

                { userPictureURL ? (
                    <TouchableOpacity onPress={onUserPicture} style={styles.iconBubble}> 
                        <Image source={{uri: userPictureURL}} style={styles.userPictureIcon}  />
                    </TouchableOpacity>
                ) : null }

                { showDelete ? (
                    <TouchableOpacity onPress={onDelete} style={styles.deleteContainer}> 
                        <Icon name='trash' type='ionicon' color={activeColors.red} size={26}/> 
                    </TouchableOpacity>
                ) : null }

            </View>

        </View>
    )

}

export default React.memo(AppHeader);