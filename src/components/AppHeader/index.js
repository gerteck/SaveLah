import React, {useState} from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from './styles';

import Input from "../Input";

const AppHeader = ({  style, 
                    // Left Side Options
                    showBack, onBack, showCross, 
                    // Right Side Options:
                    showSearch, keyword, onSearch,
                    showBell, onBell, 
                    showChat, onChat,
                    userPictureURL, onUserPicture,
                    showSave, onSave,
                    showDelete, onDelete,
                    title,
                }) => {

    return (
        <View style={[styles.mainContainer, style]}>
            {/*Left Icons go Here*/}
            <View style={styles.leftIcons}> 
            {showBack ? (
                <Pressable onPress={onBack} > 
                    <Image style={styles.icon} source={require('../../assets/appHeader/back.png')} />
                </Pressable>
            ) : showCross ? (
                <Pressable onPress={onBack} style={{elevation: 35}}> 
                    <Image style={styles.icon} source={require('../../assets/appHeader/crossIcon.png')} />
                </Pressable>
            ) : <View style={styles.space}/> } 
            </View> 
            
            {/*Title:*/}
            <Text style={styles.title}>{title}</Text>   
            
            {/*Right Icons go Here*/}
            <View style={styles.rightIcons}> 

            { showBell ? (
                <TouchableOpacity onPress={onBell}> 
                    <Image source={require('../../assets/appHeader/bell.png')} style={[styles.icon, {height:24, width: 24}]}  />
                </TouchableOpacity>
            ) : null }
            
            { showChat ? (
                <TouchableOpacity onPress={onChat}> 
                    <Image source={require('../../assets/appHeader/chat.png')} style={[styles.icon, {height: 30, width: 30, marginLeft: 16,}]}  />
                </TouchableOpacity>
            ) : null }

            { userPictureURL ? (
                <TouchableOpacity onPress={onUserPicture} style={styles.iconBubble}> 
                    <Image source={{uri: userPictureURL}} style={styles.userPictureIcon}  />
                </TouchableOpacity>
            ) : null }

            { showSave ? (
                <TouchableOpacity onPress={onSave}> 
                    <Text style={styles.save}>SAVE</Text> 
                </TouchableOpacity>
            ) : null }

            { showDelete ? (
                <TouchableOpacity onPress={onDelete}> 
                    <Image source={require('../../assets/appHeader/deleteIcon.png')} style={[styles.icon, {height: 25, width: 20, marginLeft: 16,}]}  />
                </TouchableOpacity>
            ) : null }

            </View>

        </View>
    )

}

export default React.memo(AppHeader);