import React, {useState} from "react";
import { Pressable, Text, View, Image } from "react-native";
import { styles } from './styles';

import Input from "../Input";

const AppHeader = ({   
                    // Left Side Options
                    showBack, onBackPress, showCross, 
                    // Right Side Options:
                    showSearch, keyword, onSearch,
                    showSave, onSave,
                    showBell, onBell, 
                    showChat, onChat,
                    title,
                }) => {

    const [showSearchInput, setShowSearchInput] = useState(false);

    const onSearchClick = () => {
        setShowSearchInput(x => !x);
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                
                {/*Left Icons go Here*/}
                <View style={styles.leftIcons}> 
                {showBack ? (
                    <Pressable onPress={onBackPress} style={{height: 40, width: 40, elevation: 35}}> 
                        <Image style={[styles.icon, {height: 40, width: 40}]} source={require('../../assets/appHeader/back.png')} />
                    </Pressable>
                ) : showCross ? (
                    <Pressable onPress={onBackPress}> 
                        <Image style={styles.icon} source={require('../../assets/appHeader/crossIcon.png')} />
                    </Pressable>
                ) : <View style={styles.space}/> } 
                </View> 
                
                {/*Title:*/}
                <View> 
                <Text style={styles.title}>{title}</Text>   
                </View>
                
                {/*Right Icons go Here*/}
                <View style={styles.rightIcons}> 
                { showBell ? (
                    <Pressable onPress={onBell}> 
                        <Image source={require('../../assets/appHeader/bell.png')} style={[styles.icon, {height:24, width: 24}]}  />
                    </Pressable>
                ) : showSave ? (
                    <Pressable onPress={onSave}> 
                        {/* Add a container with save instead */}
                        <Image source={require('../../assets/appHeader/saveIcon.png')} style={[styles.icon, {height:28, width: 50}]}  />
                    </Pressable>
                ) : showChat ? (
                    <Pressable onPress={onChat}> 
                        <Image source={require('../../assets/appHeader/chat.png')} style={styles.icon}  />
                    </Pressable>
                ) : (
                    <View style={styles.space}/>
                ) }
                </View>
                

            </View>
            {showSearchInput ? ( 
                <Input onChangeText={onSearch} value={keyword} placeholder="Type your Keyword..." />  ) : null }
        </View>
    )

}

export default React.memo(AppHeader);