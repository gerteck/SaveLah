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

const app = getApp;
const db = getFirestore(app);

const ProfileSearchUser = ( { navigation } ) => {
    
    const [ userProfile, setUserProfile ] = useContext(UserProfileContext);

    // Get List of Users
    const [userArray, setUserArray] = useState([]);
    const isFocused = useIsFocused(); 
    useEffect(() => {
        async function querySnapshot(){
            const query = await getDocs(collection(db, "users"));
            setUserArray([])
            query.forEach((doc) => {
                // Prevent showing own profile:
                if (doc.data().uid != userProfile?.uid) {
                    setUserArray(oldArray => [...oldArray, doc.data()])
                }
            })
            // console.log(userArray)
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

    const SearchBar = () => {
        return (
            <View style={styles.inputContainer}>
                <TextInput placeholder="Search users..." style={styles.input}
                    value={keyword} onChangeText={setKeyword} />
                <Image style={styles.searchIcon} source={require('../../../assets/icons/search.png')}/>
            </View>
        )
    }
    
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
                <View style={styles.iconBubble}>
                    <Image style={styles.icon} source={{ uri: item.url }} />
                </View>
                <Text style={styles.name}>{item.username}</Text>
                <View style={{flex: 1}} />
            </Pressable>

            <View style={styles.divider} />
            </>
        );
    };




    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader showBack onBack={onBack} style={styles.appHeader} title={"Search Users"}/>
            
            <View style={styles.whiteView}>
                {SearchBar()}

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