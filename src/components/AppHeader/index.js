import React, {useState} from "react";
import { Pressable, Text, View, Image } from "react-native";
import { styles } from './styles';

import Input from "../Input";

const AppHeader = ({   showBack, onBackPress, showCross, // Left Side Options
                    // Right Side Options:
                    showSearch, keyword, onSearch,
                    showNotif, onNotif, 
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
                {showBack ? (
                    <Pressable onPress={onBackPress}> 
                        <Image style={styles.icon} />
                    </Pressable>
                ) : showSearch ? (
                    <Pressable onPress={onSearchClick}> 
                        <Image style={styles.icon} />
                    </Pressable>
                ) : <View style={styles.space}/> } 
                
                {/*Title:*/}
                <Text style={styles.title}>{title}</Text>   
                
                {/*Right Icons go Here*/}
                <View style={styles.space}/>

            </View>
            {showSearchInput ? ( 
                <Input onChangeText={onSearch} value={keyword} placeholder="Type your Keyword..." />  ) : null }
        </View>
    )

}

export default React.memo(AppHeader);