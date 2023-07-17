import React, {useState, useEffect, useContext} from "react";
import {Text, View, TextInput, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import Box from "../../../components/Box";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { getApp } from "firebase/app";
import { UserProfileContext } from "../../../context/UserProfileContext";

import { Icon } from '@rneui/themed';
import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";

const app = getApp;
const db = getFirestore(app);

const ProfileSearchUser = ( { navigation } ) => {
    
    const [ userProfile, setUserProfile ] = useContext(UserProfileContext);
    console.log("Refresh ProfileSearch");

    // Get List of Users
    const [userArray, setUserArray] = useState([]);
    const isFocused = useIsFocused(); 
    useEffect(() => {
        async function querySnapshot(){
            const query = await getDocs(collection(db, "users"));
            const tempArray = [];
            query.forEach((doc) => {
                // Prevent showing own profile:
                if (doc.data().uid != userProfile?.uid) {
                    tempArray.push(doc.data())
                }
            })
            setUserArray(tempArray);
            console.log("profile query call")
        }
        querySnapshot();
    },[isFocused]);

    const [keyword, setKeyword] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect( () => {
        if (!keyword) {
            setFilteredUsers([]);
        } else if (keyword) {
            const updatedUsers = userArray.filter((user) => 
                user?.username.toLowerCase().includes(keyword?.toLowerCase()));
            setFilteredUsers(updatedUsers);
        }
    }, [keyword]);

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];
    
    const onBack = () => {
        navigation.goBack();
    }
    
    const renderUser = ( { item }) => {

        // Pass the profile item into the route.params.item
        const onUserPress = () => {
            navigation.navigate('ProfileOtherUser', { item });
        };

        return (
            <>
            <Pressable style={styles.userContainer} onPress={onUserPress}>
                <View style={[styles.iconBubble]}>
                    <Image style={styles.icon} source={{ uri: item.url }} />
                </View>
                <Text style={[styles.name, {color: activeColors.blue}]}>{item.username}</Text>
                <View style={{flex: 1}} />
            </Pressable>

            <View style={[styles.divider, {backgroundColor: activeColors.divider}]} />
            </>
        );
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader showBack onBack={onBack} style={[styles.appHeader, {backgroundColor: activeColors.containerBackground}]} 
                title={"Search Users"}/>
            
            <View style={[styles.mainView,  {backgroundColor: activeColors.containerBackground}]}>

                {/* Search Bar: */}
                <View style={[styles.inputContainer, {backgroundColor: activeColors.containerBackground}]}>
                    <TextInput placeholder="Search users..." 
                        style={[styles.input, { backgroundColor: activeColors.containerBackground, color: activeColors.text}]}
                        placeholderTextColor={activeColors.text}
                        value={keyword} onChangeText={setKeyword} />
                    <Icon name='search' size={18} style={styles.searchIcon} type='font-awesome' color={activeColors.iconColor}/> 
                </View>

                <FlatList 
                showsVerticalScrollIndicator={false}
                style={styles.userList} 
                data={filteredUsers} 
                renderItem={renderUser}
                keyExtractor={(user) => String(user.uid)}
                ListFooterComponent={<View style={{height: 200}}/> }/>

            </View>


        </SafeAreaView>
    )
}

export default React.memo(ProfileSearchUser);