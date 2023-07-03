import React, {useState, useContext} from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from './styles';

import Input from "../Input";
import { Badge, Icon, withBadge } from '@rneui/themed';
import { NotificationNumberContext } from "../../context/NotificationNumberContext";


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

    const NotificationComponent = () => {
        if (notificationNumber <= 0) {
            return <Icon name='notifications' type='ionicon' size={24}/> 
        } else {
            const BadgedNotification = withBadge(notificationNumber)(Icon);
            return <BadgedNotification type="ionicon" name="notifications" style={styles.notificationIcon}/>
        }
    }

    return (
        <View style={[styles.mainContainer, style]}>
            {/*Left Icons go Here*/}
            <View style={styles.leftIcons}> 
                {showBack ? (
                    <Pressable onPress={onBack} > 
                        <Image style={styles.icon} source={require('../../assets/appHeader/back.png')} />
                    </Pressable>
                ) : showCross ? (
                    <Pressable onPress={onBack} style={styles.crossContainer}> 
                        <Icon name='times' type='font-awesome'/> 
                    </Pressable>
                ) : <View style={styles.space}/> } 
            </View> 
            
            {/*Title:*/}
            <Text style={styles.title}>{title}</Text>   
            
            {/*Right Icons go Here*/}
            <View style={styles.rightIcons}> 

                { showChat ? (
                    <TouchableOpacity onPress={onChat}> 
                        <Image source={require('../../assets/appHeader/chat.png')} style={[styles.icon, {height: 30, width: 30, marginLeft: 16,}]}  />
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
                        <Icon name='trash' type='ionicon' size={26}/> 
                    </TouchableOpacity>
                ) : null }

            </View>

        </View>
    )

}

export default React.memo(AppHeader);