import React, {useState} from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from './styles';

import Input from "../Input";

const AppHeader = ({  style, 
                    // Left Side Options
                    showBack, onBack, showCross, 
                    // Right Side Options:
                    showSearch, keyword, onSearch,
                    showSave, onSave,
                    showBell, onBell, 
                    showChat, onChat,
                    title,
                }) => {

    return (
        <View style={[styles.mainContainer, style]}>
            {/*Left Icons go Here*/}
            <View style={styles.leftIcons}> 
            {showBack ? (
                <Pressable onPress={onBack} style={{height: 40, width: 40, elevation: 35}}> 
                    <Image style={[styles.icon, {height: 40, width: 40}]} source={require('../../assets/appHeader/back.png')} />
                </Pressable>
            ) : showCross ? (
                <Pressable onPress={onBack}> 
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
            
            { showSave ? (
                <Pressable onPress={onSave}> 
                    {/* Add a container with save instead */}
                    <Image source={require('../../assets/appHeader/saveIcon.png')} style={[styles.icon, {height:28, width: 50}]}  />
                </Pressable>
            ) : showChat ? (
                <TouchableOpacity onPress={onChat}> 
                    <Image source={require('../../assets/appHeader/chat.png')} style={[styles.icon, {marginLeft: 16,}]}  />
                </TouchableOpacity>
            ) : null }
            </View>

        </View>
    )

}

export default React.memo(AppHeader);