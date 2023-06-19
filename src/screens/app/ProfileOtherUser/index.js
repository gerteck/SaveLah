import React, {useContext, useEffect, useState} from "react";
import {ScrollView, Text, View, Image, Pressable } from "react-native";
import { styles }  from './styles';
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../../../components/Box";

import { getApp } from "firebase/app";
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useIsFocused } from '@react-navigation/native';
import { UserProfileContext } from "../../../context/UserProfileContext";
const app = getApp;
const db = getFirestore(app);

const ProfileOtherUser = ( {navigation, route} ) => {

    console.log("Route.params:", route.params.item );
    const otherUser = route.params.item;
    
    // Refresh page on navigation


    const { user } = useAuthContext();
    const [userProfile, setUserProfile] = useContext(UserProfileContext);
    const getUserProfile = async () => {
        const userProfileRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userProfileRef);
        return docSnap.data();
    }



    const goSettings = () => {
        navigation.navigate('Settings');
    }


    const onProfileSearchUser = () => {
        navigation.navigate('ProfileSearchUser');
    };

    const onBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader showBack onBack={onBack} title="Profile"/>

            <ScrollView showsVerticalScrollIndicator={false}> 

                {/* Profile, Bio, following and setting Buttons */}
                <View style={styles.whiteBox}>
                    <View style={styles.profile}>
                        <View style={styles.displayPictureWrapper}>
                            <Image style={styles.displayPicture} source={{uri: otherUser.url}}/>
                        </View>
                        <View style={styles.nameBioContainer}>
                            <Text style={styles.name}>{otherUser.username}</Text>
                            {/* For testing purpose */}
                            {/* <Text style={styles.name}>{userProfile.uid}</Text> */}
                            <View style={styles.bioContainer}>
                                <Text style={styles.bio}>{otherUser.bio}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.followContainer}>
                        <TouchableOpacity style={styles.followerContainer}>
                            <Text style={styles.followText}>5 Followers </Text>
                        </TouchableOpacity>
                        <View style={styles.line}/>
                        <TouchableOpacity style={styles.followerContainer}>
                            <Text style={styles.followText}>20 Following</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Follow/UnFollow and Message */}
                    <View style={styles.settingsContainer}>
                        <TouchableOpacity onPress={() => {}} style={styles.settingsBox}>
                            <View style={styles.opacityBox}>
                                <Text style={styles.followText}>Follow</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '5%'}}/>
                        <TouchableOpacity onPress={() => {}} style={styles.settingsBox}>
                            <View style={styles.opacityBox}>
                                <Text style={styles.followText}>Message</Text>
                                <Image style={styles.icon} source={require('../../../assets/icons/chat.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <Text style={styles.postTitle}> Top posts </Text>
                <Box style={{height: 500}} />
                {/* Add posts FlatList here! */}


            </ScrollView>

        </SafeAreaView>
    )
}

export default React.memo(ProfileOtherUser);