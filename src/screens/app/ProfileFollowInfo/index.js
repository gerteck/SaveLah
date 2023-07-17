import React, { useState, useEffect, useContext } from "react";
import {Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles }  from './styles';
import AppHeader from "../../../components/AppHeader";
import { FlatList } from "react-native-gesture-handler";

import { getApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ThemeContext } from "../../../context/ThemeContext";
import themeColors from "../../../utils/themeColors";
const app = getApp;
const db = getFirestore(app);

const ProfileFollowInfo = ( { navigation, route } ) => {

    const param = route.params;
    const user = param.item;

    const onBack = () => {
        navigation.goBack();
    }

    // Follower = true, following = false
    const [followerSelected, setFollowerSelected] = useState(param.followerSelected);
    const [followerProfiles, setFollowerProfiles] = useState([]);
    const [followingProfiles, setFollowingProfiles] = useState([]);
    
    // Call for follower / following profiles
    useEffect( () => {
        setFollowerSelected(param.followerSelected);
        const loadProfiles = async () => {
            let data = user.following;
            setFollowingProfiles(await getFollowUserProfiles(data));
            data = user.followers;
            setFollowerProfiles(await getFollowUserProfiles(data));
        }
        loadProfiles();
    }, [route]);

    // Get Data of Follow User Profiles
    const getFollowUserProfiles = async (data) => {
        const followUserArray = [];
        data.forEach( (uid) => {
            const getProfile = async () => {
                const userRef = doc(db, "users", uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    followUserArray.push(docSnap.data());
                } else {
                    followUserArray.push({uid: uid});
                    console.log("No such document! Error Finding User");
                } 
            }
            getProfile();            
        });
        return followUserArray;
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
                <Text style={[styles.name, {color: activeColors.title}]}>{item.username}</Text>
                <View style={{flex: 1}} />
            </Pressable>

            <View style={[styles.divider, {backgroundColor: activeColors.divider}]} />
            </>
        );
    };

    const { theme } = useContext(ThemeContext); 
    let activeColors = themeColors[theme.mode];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader onBack={onBack} showCross style={[styles.appHeader, {backgroundColor: activeColors.containerBackground}]} 
                title={user?.username}/>

            <View style={[styles.secondaryContainer, {backgroundColor: activeColors.containerBackground}]}>
                
                {/* Toggle Bar */}
                <View style={[styles.toggleBar, {backgroundColor: activeColors.secondaryContainerBackground}]}>
                    <TouchableOpacity disabled={followerSelected} onPress={() => setFollowerSelected(true)} 
                        style={[styles.selectContainer, followerSelected ? {backgroundColor: activeColors.containerBackground} : {}]}>
                            <Text style={{color: activeColors.text}}>Followers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={!followerSelected} onPress={() => setFollowerSelected(false)} 
                        style={[styles.selectContainer, !followerSelected ?  {backgroundColor: activeColors.containerBackground} : {}]}>
                            <Text style={{color: activeColors.text}}>Following</Text>
                    </TouchableOpacity>
                </View>

                {/* Follow List */} 
                { followerSelected && <FlatList showsVerticalScrollIndicator={false} data={followerProfiles} renderItem={renderUser} keyExtractor={(user) => String(user.uid)} 
                    ListFooterComponent={<View style={{height: 200}}/> }/> }

                { !followerSelected && <FlatList showsVerticalScrollIndicator={false} data={followingProfiles} renderItem={renderUser} keyExtractor={(user) => String(user.uid)} 
                    ListFooterComponent={<View style={{height: 200}}/> }/> }    


            </View>


        </SafeAreaView>
    )
}

export default React.memo(ProfileFollowInfo);